import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../components/Dataverification/Card.css';

const ScanCard = () => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // State to hold the captured image URL
  const [isImageDisplayed, setIsImageDisplayed] = useState(false); // State to control displaying the captured image
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
    formData.append('capture', blob, 'capture.jpg'); // Use 'capture' as the field name

    try {
      const response = await fetch('http://localhost:5000/upload-card', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Image uploaded successfully');
        stopWebcam(); // Stop the webcam after uploading
        fetchCapturedImage(); // Fetch the uploaded image from the backend
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
        console.log('Fetched Image URL:', imageURL); // Log the URL
        setCapturedImage(imageURL);
        setIsImageDisplayed(false); // Reset the image display state
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="left-section">
            <h1>Verification Steps</h1>
            <ul>
              <li>
                <input type="checkbox" /> Turn your eyes to the right, then to the left
              </li>
              <li>
                <input type="checkbox" /> Turn your face to the right
              </li>
              <li>
                <input type="checkbox" /> Turn your face to the left
              </li>
              <li>
                <input type="checkbox" /> The front of the Document.
              </li>
            </ul>
            <h2 className="heading">Scanning your face</h2>
            <p className="description">Please Wait for the Scan to Complete Before Proceeding to the Next Step</p>
            <div className="input-group">
              <label htmlFor="eyeLookOutLeft">EyeLookOutLeft</label>
              <input type="text" id="eyeLookOutLeft" name="eyeLookOutLeft" disabled />
            </div>
            <div className="input-group">
              <label htmlFor="eyeLookInRight">EyeLookInRight</label>
              <input type="text" id="eyeLookInRight" name="eyeLookInRight" disabled />
            </div>
            <div className="input-group">
              <label htmlFor="smile">Smile</label>
              <input type="text" id="smile" name="smile" disabled />
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
                style={{ display: capturedImage || isImageDisplayed  ? 'block' : 'none' }} 
                
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
            <div className="button-container mt-2">
              <Link to="/dataverficationcompleted">
                <button className="continue-button btn btn-secondary">CONTINUE</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanCard;
