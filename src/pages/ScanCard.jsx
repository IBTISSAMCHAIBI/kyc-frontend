import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/Dataverification/Card.css';
import head_rightImg from '../assets/head_rightImg.png';
import { Container } from 'react-bootstrap';

const ScanCard = () => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isImageDisplayed, setIsImageDisplayed] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [inputStyle, setInputStyle] = useState({});
  const [inputText, setInputText] = useState('');
  const [inputIcon, setInputIcon] = useState('/progre.png');
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
    }
  };

  const sendImage = async (blob) => {
    const formData = new FormData();
    formData.append('capture', blob, 'capture.jpg');

    try {
      const response = await fetch('http://localhost:5000/upload-card', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Image uploaded successfully');
        stopWebcam();
        fetchCapturedImage();
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchCapturedImage = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-card');
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageURL = URL.createObjectURL(imageBlob);
        console.log('Fetched Image URL:', imageURL);
        setCapturedImage(imageURL);
        setIsImageDisplayed(false);
      } else {
        console.error('Failed to fetch captured image');
      }
    } catch (error) {
      console.error('Error fetching captured image:', error);
    }
  };

  const handleDisplayImage = () => {
    setIsImageDisplayed(true);
  };

  const verifyImageQuality = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-card');
      if (response.ok) {
        const imageBlob = await response.blob();
        const formData = new FormData();
        formData.append('capture', imageBlob, 'capture.jpg');

        const verificationResponse = await fetch('http://localhost:5000/faces_exist', {
          method: 'POST',
          body: formData,
        });

        const result = await verificationResponse.json();
        setVerificationMessage(result.message);

        if (result.message === 'Good face detected') {
          setInputStyle({ color: 'green' });
          setInputText('face well detected');
          setInputIcon('/checked.png');
        } else if (result.message === 'Try again, no face detected') {
          setInputStyle({ color: 'red' });
          setInputText('No face detected');
          setInputIcon('/spoofing-detected.png');
        }
      } else {
        console.error('Failed to fetch captured image');
        setVerificationMessage('Failed to fetch captured image');
      }
    } catch (error) {
      console.error('Error verifying image quality:', error);
      setVerificationMessage('Error verifying image quality');
    }
  };

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
      <div className="row">
        <div className="col-md-8">
          <div className="left-section">
            <h1>Verification Steps</h1>
            <ul>
              <li>Ensure that the image is good in front side</li>
              <li>Ensure that the image in card is well appear</li>
            </ul>
            <h2 className="heading">Scanning your face</h2>
            <p className="description">Please wait for the scan to complete before proceeding to the next step</p>
            <div className="input-group">
              <input type="text" value="well image quality" readOnly style={{ color: 'green' }} />
              <img src={inputIcon} alt="status icon" className="status-icon ms-2" />
            </div>
            <div className="input-group">
              <input type="text"  value ={inputText} id="smile" name="smile" disabled readOnly style={inputStyle}  />
              <img src={inputIcon} alt="progress icon" className="status-icon ms-2" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="right-section text-center">
            <div id="webcam-container" className="webcam-container">
              {capturedImage && isImageDisplayed ? (
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="scan-image img-fluid" 
                  style={{ display: isImageDisplayed || capturedImage ? 'block' : 'none' }} 
                />
              ) : (
                <video ref={webcamRef} className="scan-image img-fluid" autoPlay></video>
              )}
              <img 
                src='/card.png' 
                alt="Scanning Face" 
                className="scan-image img-fluid" 
                style={{ display: isWebcamActive || capturedImage ? 'none' : 'block' }} 
              />
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
            <button
              onClick={() => setIsWebcamActive(prev => !prev)}
              className="continue-button btn btn-primary mt-3"
            >
              {isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}
            </button>
            <button
              onClick={captureImage}
              className="continue-button btn btn-secondary mt-3"
              disabled={!isWebcamActive}
            >
              Take Picture
            </button>
            {capturedImage && !isImageDisplayed && (
              <button
                onClick={handleDisplayImage}
                className="continue-button btn btn-secondary mt-3"
              >
                Display Image
              </button>
            )}
            {isImageDisplayed && (
              <button
                onClick={verifyImageQuality}
                className="continue-button btn btn-secondary mt-3"
              >
                Verify Image Quality
              </button>
            )}
            <div className="button-container mt-2">
              <Link to="/dataverficationcompleted">
                <button className="continue-button btn btn-secondary">verification</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ScanCard;
