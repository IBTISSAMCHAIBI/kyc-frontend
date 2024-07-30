import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Container } from 'react-bootstrap';
import '../components/Dataverification/ScanFacePage.css'; 
import head_rightImg from '../assets/head_rightImg.png';
import logo from '../assets/logo.png';// Import the CSS file
import { Link } from 'react-router-dom';

function TakeSelfie() {
    const [idImageCaptured, setIdImageCaptured] = useState(false);
    const [idImage, setIdImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showIdWebcam, setShowIdWebcam] = useState(false);
    const [showSelfieWebcam, setShowSelfieWebcam] = useState(false);
    const [idImageUrl, setIdImageUrl] = useState(null);
    const [selfieImageUrl, setSelfieImageUrl] = useState(null);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const captureIdImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setIdImageUrl(imageSrc);
        const byteString = atob(imageSrc.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: 'image/jpeg' });
        const file = new File([blob], "id_image.jpg", { type: "image/jpeg" });
        setIdImage(file);
        setIdImageCaptured(true);
        setShowIdWebcam(false);
    };

    const uploadSelfieImage = async (file) => {
        const formData = new FormData();
        formData.append('selfie', file);
        try {
            const response = await fetch('http://127.0.0.1:5000/upload-selfie', {
                method: 'POST',
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

    const fetchSavedSelfie = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get-screenshot', {
                method: 'GET',
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setSelfieImageUrl(url);
            const file = new File([blob], "saved_selfie.jpg", { type: "image/jpeg" });
            setSelfieImage(file);
        } catch (error) {
            console.error('Error fetching saved selfie:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (idImageCaptured) {
            await uploadSelfieImage(idImage);
        }
        const formData = new FormData();
        formData.append('id_image', idImage);
        formData.append('selfie_image', selfieImage);

        try {
            const response = await fetch('http://127.0.0.1:5000/match_faces', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            navigate('/error');
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
        {idImageCaptured && (
          <div className="capture-container">
            <button type="button" onClick={fetchSavedSelfie} className="capture-button">Start verification </button>
          </div>
        )}
        { selfieImage && (
        <div className="capture-container">
          <form onSubmit={handleSubmit} className="verification-form">
            <button type="submit" className="submit-button">Start verification</button>
          </form>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        {result && (
                    <div className="result-container">
                        {/* <h2>Result</h2>
                        <p className={result.similarity_score > 0.50 ? 'success-message' : 'error-message'}>
                            Similarity Score: {result.similarity_score}
                        </p>
                        <p className={result.similarity_score > 0.50 ? 'success-message' : 'error-message'}>
                            Match Status: {result.match_status}
                        </p> */}
                        {result.similarity_score > 0.20 ? (
                            <div>
                                <Link to ="/scancard">
                                <p className="success-message">You are verified and can proceed to card and information verification.</p>
                                <button   className="continue-button">Continue</button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to="/scan">
                                <p className="error-message">We can't ensure that you are the live person.</p>
                                <button  className="holdback-button">Hold Back</button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
      </div>
    </Container>

    );
}

export default  TakeSelfie;