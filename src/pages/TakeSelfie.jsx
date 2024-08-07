import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Container, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import head_rightImg from '../assets/head_rightImg.png';
import { Link } from 'react-router-dom';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;
function TakeSelfie() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showIdWebcam, setShowIdWebcam] = useState(false);
    const [selfieImageUrl, setSelfieImageUrl] = useState(null);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    // Show a toast notification when the component mounts
    useEffect(() => {
        toast.info('Please reload the page for better accuracy.', {
            position: "top-center",
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, []);

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
            const response = await fetch(`${baseURL}/upload-selfie/${username}`, {
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
            const response = await fetch(`${baseURL}/match_faces/${username}`, {
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
            const response = await fetch(`${baseURL}/get-selfie/${username}`, {
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
        <Container fluid style={{ padding: '20px' }}>
            <div className="verification-container">
                <div className="header">
                    <div className="header-content">
                        <div className="text-content">
                            <h1 >DEVOSPACE</h1>
                            <p >Seamless Real-time <span style={{ color: '#FFD96D' }}>Identity</span> Verification</p>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={head_rightImg} alt="Verification Process" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }} />
                    </div>
                </div>
                <h1 style={{ marginBottom: '20px' }}>Verification</h1>
                <h2>please wait untile you got the notif of selfie upload </h2>
                <div className="capture-container" style={{ marginBottom: '20px' }}>
                    <Button
                        type="button"
                        onClick={() => setShowIdWebcam(true)}
                        style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
                    >
                        Open cam for ID
                    </Button>
                    {showIdWebcam && (
                        <div>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={320}
                                height={240}
                                style={{ border: '2px solid #007bff', borderRadius: '5px' }}
                            />
                            <Button
                                type="button"
                                onClick={captureIdImage}
                                style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', marginTop: '10px' }}
                            >
                                Capture ID Image
                            </Button>
                        </div>
                    )}
                </div>
                <div className="capture-container" style={{ marginBottom: '20px' }}>
                    <form onSubmit={handleSubmit}>
                        <Button
                            type="submit"
                            style={{ backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '5px' }}
                        >
                            Start verification
                        </Button>
                    </form>
                </div>
                <div className="capture-container" style={{ marginBottom: '20px' }}>
                    <Button
                        type="button"
                        onClick={fetchSelfieImage}
                        style={{ backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px' }}
                    >
                        Display Captured Selfie
                    </Button>
                    {selfieImageUrl && <img src={selfieImageUrl} alt="Captured Selfie" style={{ width: '100%', maxWidth: '320px', borderRadius: '10px', marginTop: '10px' }} />}
                </div>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                {result && (
                    <div style={{ marginTop: '20px' }}>
                        {result.similarity_score > 0.20 ? (
                            <div>
                                <Link to="/scancard">
                                    <p style={{ color: 'green', fontSize: '1.25rem' }}>You are verified and can proceed to card and information verification.</p>
                                    <Button style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>Continue</Button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to="/scan">
                                    <p style={{ color: 'red', fontSize: '1.25rem' }}>We cant ensure that you are the live person.</p>
                                    <Button style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}>Retry</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <ToastContainer />
        </Container>
    );
}

export default TakeSelfie;
