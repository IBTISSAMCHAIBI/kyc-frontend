import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Container } from 'react-bootstrap';
import '../components/Dataverification/ScanFacePage.css'; 
import head_rightImg from '../assets/head_rightImg.png';
import { Link } from 'react-router-dom';

function TakeSelfie() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showIdWebcam, setShowIdWebcam] = useState(false);
    const [selfieImageUrl, setSelfieImageUrl] = useState(null);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const uploadSelfieImage = async (file) => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
    
        if (!username || !token) {
            console.error('Username or token not found in localStorage');
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

    let isUploading = false;

    const captureIdImage = () => {
        if (isUploading) return;
        isUploading = true;

        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            const byteString = atob(imageSrc.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: 'image/jpg' });
            const file = new File([blob], "selfie.jpg", { type: "image/jpg" });
            uploadSelfieImage(file).finally(() => isUploading = false);
            setShowIdWebcam(false); // Close webcam after capture
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!username) {
            console.error('Username is not found in local storage');
            return;
        }

        if (!token) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/match_faces/${username}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Response data:', data); // Log the response to check what is received
            setResult(data); // Handle result data
            setError(null);
        } catch (error) {
            console.error('Fetch error:', error.message); // Log any errors
            setError(error.message); // Handle error
            navigate('/error'); // Redirect to error page
        }
    };

    const fetchSelfieImage = async () => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
    
        if (!username || !token) {
            console.error('Username or token not found in localStorage');
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/get-selfie/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in the headers
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch selfie image');
            }
    
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setSelfieImageUrl(imageUrl);
        } catch (error) {
            console.error('Error fetching selfie image:', error);
        }
    };

    return (
        <Container fluid>
            <div className="verification-container">
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
                <div className="capture-container">
                    <button type="button" onClick={fetchSelfieImage} className="capture-button">Display Captured Selfie</button>
                    {selfieImageUrl && <img src={selfieImageUrl} alt="Captured Selfie" className="captured-selfie" />}
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
