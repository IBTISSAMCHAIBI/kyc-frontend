import { useState, useRef, useEffect } from 'react';
import '../components/Dataverification/Card.css';
import head_rightImg from '../assets/head_rightImg.png';
import { Container, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from './config';
import { FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
const baseURL = CONFIG.BASE_URL;
const ScanCard = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [inputStyle, setInputStyle] = useState({});
  const [inputText, setInputText] = useState('');
  const [inputIcon, setInputIcon] = useState('/progre.png');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file ,'card.jpg');

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
        const response = await fetch(`${baseURL}/upload-card/${username}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          toast.success('Image uploaded successfully');
          // Optionally handle further logic after upload
        } else {
          toast.error('Image upload failed');
        }
      } catch (error) {
        toast.error('Error uploading image');
      }
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
        // Adjust URL format if necessary (e.g., if `/card.jpg` should just be `/card`)
        const response = await fetch(`${baseURL}/check_faces_in_image/${username}/card.jpg`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Check for response message and update UI accordingly
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
        } else {
            // Handle unexpected messages or response formats
            setInputStyle({ color: 'orange' });
            setInputText('Unexpected result');
            setInputIcon('/warning.png');
            toast.error('Unexpected result');
        }
    } catch (error) {
        console.error('Error verifying image quality:', error);
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
      const response = await fetch(`${baseURL}/card_faces/${username}`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Response card data:', result);
      console.log(verificationMessage)
      setVerificationMessage(result.match_status);
      setResult(result);

      if (result.match_status === "Match") {
          toast.success('Card faces verification completed');
      } else {
          toast.error('Card faces verification failed');
      }
  } catch (error) {
      console.error('Error verifying card faces:', error);
      toast.error(`Error verifying card faces: ${error.message}`);
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
      const response = await fetch(`${baseURL}/get-card/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob); // Use .json() if your backend returns JSON
        setCapturedImage(url);
        toast.success('Card image fetched successfully');
      } else {
        toast.error('Failed to fetch card image');
      }
    } catch (error) {
      console.error('Error fetching card image:', error);
      toast.error('Error fetching card image');
    }
  };
  

  useEffect(() => {
    if (result) {
      if (result.similarity_score > 0.30) {
        navigate('/dataverficationcompleted'); // Replace with your actual route
      } else {
        navigate('/error'); 
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
      <ToastContainer />
      <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
}}>
  <h1 style={{ marginBottom: '20px' }}>Verified that you are the correct person with your card image</h1>
</div>

      <div className="row">
        <div className="col-md-6" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="left-section">
          <ul style={{
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
    marginBottom: '20px',
    listStyle: 'none',
    lineHeight: '1.6',
}}>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <FaExclamationCircle style={{ color: '#ffc107', marginRight: '10px' }}  />
        Ensure the image is clear and well-lit.
    </li>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <FaExclamationCircle style={{ color: '#ffc107', marginRight: '10px' }} />
        Ensure the card image is properly aligned and fully visible.
    </li>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <FaInfoCircle style={{ color: '#ffc107', marginRight: '10px' }} />
        Upload an image that clearly shows both the card and your face.
    </li>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <FaInfoCircle style={{ color: '#ffc107', marginRight: '10px' }} />
        Wait until you receive a confirmation message indicating successful image upload before proceeding.
    </li>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <FaInfoCircle style={{ color: '#ffc107', marginRight: '10px' }} />
        To verify that your image includes your face, use the verification button.
     </li>
  </ul>
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
          <div className="right-section">
            <h2 style={{marginBottom: '20px', color: '#343a40' }}>Upload Your card Image here</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ marginBottom: '20px' }}
            />
            <Button onClick={fetchCardImage} variant="primary" style={{ marginRight: '10px' }}>Fetch Card</Button>
            <Button onClick={verifyImageQuality} variant="secondary" style={{ marginRight: '10px' }}>Verify Image</Button>
            <Button onClick={handleSubmit} variant="success"  style={{ marginRight: '10px' }}>verify yourself</Button>
            {capturedImage && (
              <div style={{ marginTop: '20px' }}>
                <h2>Captured Image:</h2>
                <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ScanCard;
