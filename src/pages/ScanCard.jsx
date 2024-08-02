import { useState, useRef, useEffect } from 'react';
import '../components/Dataverification/Card.css';
import head_rightImg from '../assets/head_rightImg.png';
import { Container ,Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify'; // Ensure these imports are present
import 'react-toastify/dist/ReactToastify.css'; // Ensure these imports are present
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



const ScanCard = () => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isImageDisplayed, setIsImageDisplayed] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [inputStyle, setInputStyle] = useState({});
  const [inputText, setInputText] = useState('');
  const [inputIcon, setInputIcon] = useState('/progre.png');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
const navigate = useNavigate();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isWebcamActive) {
      startWebcam();
    } else {
      stopWebcam();
    }
  }, [isWebcamActive]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        webcamRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    const stream = webcamRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      webcamRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = webcamRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        sendImage(blob);
      }, 'image/jpeg');

      // Turn off the webcam after capturing the image
      stopWebcam();
      setIsWebcamActive(false); // Ensure the webcam is turned off
    }
  };
  const sendImage = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'card.jpg'); // The form field name should match the one in Flask
  
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    
    if (!username) {
      toast.error('Username not found in localStorage');
      return;
    }
  
    if (!token) {
      toast.error('Token not found in localStorage');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/upload-card/${username}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the headers
        },
      });
  
      if (response.ok) {
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      toast.error('Error uploading image');
    }
  };
  
  const verifyImageQuality = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
  
    if (!username || !token) {
      toast.error('Username or token not found in localStorage');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/check_faces_in_image/${username}/card.jpg`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
      setVerificationMessage(result.message);
  
      if (result.message === 'Good face detected') {
        setInputStyle({ color: 'green' });
        setInputText('Face well detected');
        setInputIcon('/checked.png');
        toast.success('Good face detected');
      } else if (result.message === 'Try again, no face detected') {
        setInputStyle({ color: 'red' });
        setInputText('No face detected');
        setInputIcon('/spoofing-detected.png');
        toast.error('No face detected');
      }
    } catch (error) {
      toast.error('Error verifying image quality');
    }
  };
  
  const verifyCardFaces = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
  
    if (!username || !token) {
      toast.error('Username or token not found in localStorage');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/card_faces/${username}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
      setVerificationMessage(result.match_status);
      setResult(result); // Store the result in state
      if (result.match_status) {
        toast.success('Card faces verification completed');
      } else {
        toast.error('Card faces verification failed');
      }
    } catch (error) {
      toast.error('Error verifying card faces');
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await verifyCardFaces();
  };
  
  const fetchCardImage = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
  
    if (!username || !token) {
      toast.error('Username or token not found in localStorage');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/get-card/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCapturedImage(url);
        setIsImageDisplayed(true);
        toast.success('Card image fetched successfully');
      } else {
        toast.error('Failed to fetch card image');
      }
    } catch (error) {
      toast.error('Error fetching card image');
    }
  };
  
  // Remember to include <ToastContainer /> in your component's render or return method
  
  useEffect(() => {
    if (result) {
      if (result.similarity_score > 0.80) {
        navigate('/dataverficationcompleted'); // Replace with your actual route
      } else {
        toast.error('You are not correspondent to the alive person');
      }
    }
  }, [result, navigate]);
  return (
    <Container fluid>
      <div className="header">
        <div className="header-content">
          <div className="text-content">
            <h1>DEVOSPACE</h1>
            <p>Seamless Real-time <span className="highlight">Identity</span> Verification</p>
          </div>
        </div>
        <div className="image-container">
          <img src={head_rightImg} alt="Verification Process" className="verification-image" />
        </div>
      </div>
      < ToastContainer />
      <div className="row">
    <div className="col-md-6" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
  <div className="left-section">
    <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#343a40' }}>Verification Steps</h1>
    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
      <li>Ensure that the image is good in front side</li>
      <li>Ensure that the image in card is well appear</li>
    </ul>
    <h2 style={{ fontSize: '1.5rem', color: '#6c757d', marginBottom: '10px' }}>Scanning your face</h2>
    <p style={{ fontSize: '1rem', color: '#495057', marginBottom: '20px' }}>Please wait for the scan to complete before proceeding to the next step</p>
    <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
      <input
        type="text"
        value="Well image quality"
        readOnly
        style={{ flex: 1, padding: '10px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#ffffff', fontSize: '1rem', color: 'green' }}
      />
      <img
        src={inputIcon}
        alt="status icon"
        style={{ width: '24px', height: '24px', marginLeft: '8px' }}
      />
    </div>
    <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
      <input
        type="text"
        value={inputText}
        id="smile"
        name="smile"
        disabled
        readOnly
        style={{ flex: 1, padding: '10px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#ffffff', fontSize: '1rem', ...inputStyle }}
      />
      <img
        src={inputIcon}
        alt="progress icon"
        style={{ width: '24px', height: '24px', marginLeft: '8px' }}
      />
    </div>
  </div>
</div>
<div className="col-md-6" style={{ padding: '20px' }}>
  <div className="right-section text-center">
    <div id="webcam-container" className="webcam-container" style={{ position: 'relative', marginBottom: '20px' }}>
      {capturedImage && isImageDisplayed ? (
        <img 
          src={capturedImage} 
          alt="Captured" 
          className="scan-image img-fluid" 
          style={{ 
            display: isImageDisplayed || capturedImage ? 'block' : 'none',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px'
          }} 
        />
      ) : (
        <video ref={webcamRef} className="scan-image img-fluid" autoPlay 
          style={{ 
            display: isWebcamActive || capturedImage ? 'block' : 'none',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px'
          }}
        ></video>
      )}
      <img 
        src='/card.png' 
        alt="Scanning Face" 
        className="scan-image img-fluid" 
        style={{ 
          display: isWebcamActive || capturedImage ? 'none' : 'block',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          marginTop: '0'
        }} 
      />
    </div>
    <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    <button
      onClick={() => setIsWebcamActive(prev => !prev)}
      className="continue-button btn btn-primary"
      style={{ marginTop: '10px' }}
    >
      {isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}
    </button>
    <button
      onClick={captureImage}
      className="continue-button btn btn-secondary"
      style={{ marginTop: '10px' }}
      disabled={!isWebcamActive}
    >
      Take Picture
    </button>
    <button
      onClick={verifyImageQuality}
      className="continue-button btn btn-secondary"
      style={{ marginTop: '10px' }}
    >
      Verify Image Quality
    </button>
    <div className="button-container" style={{ marginTop: '10px' }}>
      <button
        type="submit"
        className="continue-button btn btn-success"
        onClick={handleSubmit}
      >
        Verify Card Faces
      </button>
    </div>
    <button
      onClick={fetchCardImage}
      className="continue-button btn btn-info"
      style={{ marginTop: '10px' }}
    >
      Display Card Image
    </button>
    {error && <div className="alert alert-danger" style={{ marginTop: '10px' }}>{error}</div>}
    {result && (
      <div className="result-message" style={{ marginTop: '10px', color: result.similarity_score > 0.70 ? 'green' : 'red' }}>
        {result.similarity_score > 0.20 ? (
          <div>
            You are real
          </div>
        ) : (
          <div>
            You are not the right person
          </div>
        )}
      </div>
    )}
  </div>
</div>

      </div>
    </Container>
  );
};

export default ScanCard;