import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Container } from 'react-bootstrap';
import '../components/Dataverification/ScanFacePage.css'; 
import head_rightImg from '../assets/head_rightImg.png';
import logo from '../assets/logo.png'; // Import the CSS file
import { Link } from 'react-router-dom';

function TakeSelfie() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showIdWebcam, setShowIdWebcam] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const captureIdImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            const byteString = atob(imageSrc.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: 'image/jpeg' });
            const file = new File([blob], "id_image.jpg", { type: "image/jpeg" });
            uploadSelfieImage(file);
            setShowIdWebcam(false); // Close webcam after capture
        }
    };

    const uploadSelfieImage = async (file) => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
      if (!username) {
          console.error('Username not found in localStorage');
          return;
      }
  
      if (!token) {
          console.error('Token not found in localStorage');
          return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
          const response = await fetch(`http://127.0.0.1:5000/upload-selfie/${username}`, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`, // Include token in the headers
              },
              body: formData,
          });
  
          if (!response.ok) {
              throw new Error('Failed to upload selfie');
          }
  
          const data = await response.json();
          console.log(data.message);
      } catch (error) {
          console.error('Error uploading selfie:', error);
      }
  };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Retrieve the username from local storage
        const username = localStorage.getItem('username'); // Ensure you have stored username in local storage
        const token = localStorage.getItem('token'); // JWT token for authentication
    
        if (!username) {
            console.error('Username is not found in local storage');
            return;
        }
    
        if (!token) {
            console.error('User is not authenticated');
            return;
        }
    
        // Only include the username and token in the request
        try {
            const response = await fetch(`http://127.0.0.1:5000/match_faces/${username}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in the headers
                    'Content-Type': 'application/json', // Assuming no file upload is needed
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setResult(data); // Handle result data
            setError(null);
        } catch (error) {
            setError(error.message); // Handle error
            navigate('/error'); // Redirect to error page
        }
    };

    return (
        <Container fluid>
            <div className="verification-container">
                <div className="header">
                    <div className="header-content">
                        {/* <img src={logo} alt="Devospace Logo" className="logo" /> */}
                        <div className="text-content">
                            <h1>DEVOSPACE</h1>
                            {/* <img src={logo} alt="Devospace Logo" className="logo" /> */}
                            <p>Seamless Real-time <span className="highlight">Identity</span> Verification</p>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={head_rightImg} alt="Verification Process" className="verification-image" />
                    </div>
                </div>
                <h1>Verification</h1>
                <div className="capture-container">
                    <button type="button" onClick={() => setShowIdWebcam(true)} className="capture-button">Open cam for ID</button>
                    {showIdWebcam && (
                        <div>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={320}
                                height={240}
                                className="webcam"
                            />
                            <button type="button" onClick={captureIdImage} className="capture-button">Capture ID Image</button>
                        </div>
                    )}
                </div>
                <div className="capture-container">
                    <form onSubmit={handleSubmit} className="verification-form">
                        <button type="submit" className="submit-button">Start verification</button>
                    </form>
                </div>
                {error && <div className="error-message">{error}</div>}
                {result && (
                    <div className="result-container">
                        {result.similarity_score > 0.20 ? (
                            <div>
                                <Link to="/scancard">
                                    <p className="success-message">You are verified and can proceed to card and information verification.</p>
                                    <button className="continue-button">Continue</button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to="/scan">
                                    <p className="error-message">We can't ensure that you are the live person.</p>
                                    <button className="holdback-button">Hold Back</button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
}

export default TakeSelfie;
