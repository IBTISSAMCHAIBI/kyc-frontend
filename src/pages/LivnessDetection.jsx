import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import vision from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';
import '../components/Dataverification/ScanFacePage.css';
import { Link } from 'react-router-dom';

const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;

const ScanFacePage = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [screenshotURL, setScreenshotURL] = useState(null);
  const [enableWebcamButton, setEnableWebcamButton] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const videoWidth = 480;

  const images = [
    { src: '/scan.png', text: 'smiling' },
    { src: '/left.png', text: 'Look left' },
    { src: '/right.png', text: 'Look right' }
  ];

  useEffect(() => {
    const createFaceLandmarker = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const faceLandmarkerInstance = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU"
          },
          outputFaceBlendshapes: true,
          runningMode: runningMode,
          numFaces: 1
        });
        setFaceLandmarker(faceLandmarkerInstance);
        console.log("FaceLandmarker initialized.");
      } catch (error) {
        console.error("Error initializing FaceLandmarker: ", error);
      }
    };

    createFaceLandmarker();
  }, [runningMode]);

  const handleWebcamEnable = () => {
    if (!faceLandmarker) {
      console.log("Wait! faceLandmarker not loaded yet.");
      return;
    }

    setWebcamRunning(!webcamRunning);

    if (!webcamRunning) {
      enableWebcam();
    } else {
      disableWebcam();
    }
  };

  const enableWebcam = () => {
    const constraints = {
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
          webcamRef.current.addEventListener("loadeddata", predictWebcam);
          setRunningMode("VIDEO");
          faceLandmarker.setOptions({ runningMode: "VIDEO" });
          setEnableWebcamButton(true);
          console.log("Webcam enabled and running.");
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };

  const clearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      }
    }
  };

  const disableWebcam = () => {
    setWebcamRunning(false);
    if (webcamRef.current && webcamRef.current.srcObject) {
      webcamRef.current.srcObject.getTracks().forEach(track => track.stop());
      webcamRef.current.srcObject = null;
    }
    if (canvasRef.current) {
      clearCanvas();
    }
    console.log("Webcam disabled.");
  };

  const predictWebcam = async () => {
    if (!webcamRef.current || !canvasRef.current || !faceLandmarker) {
      console.warn("Webcam or canvas or faceLandmarker is not ready.");
      return;
    }

    const video = webcamRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    const drawingUtils = new DrawingUtils(canvasCtx);

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.warn("Video dimensions are zero, skipping frame processing.");
      return;
    }

    const ratio = video.videoHeight / video.videoWidth;
    video.style.width = `${videoWidth}px`;
    video.style.height = `${videoWidth * ratio}px`;
    canvasElement.style.width = `${videoWidth}px`;
    canvasElement.style.height = `${videoWidth * ratio}px`;
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    let lastVideoTime = -1;
    let results;

    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      results = await faceLandmarker.detectForVideo(video, performance.now());
      console.log("Landmarks detected: ", results.faceLandmarks);
    }

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results && results.faceLandmarks) {
      for (const landmarks of results.faceLandmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_TESSELATION,
          { color: "#C0C0C070", lineWidth: 1 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
          { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
          { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
          { color: "#30FF30" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
          { color: "#30FF30" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
          { color: "#E0E0E0" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LIPS,
          { color: "#E0E0E0" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
          { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
          { color: "#30FF30" }
        );
      }
    }

    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Verification Steps</h2>
          <ul>
            <li>Turn your face to the right</li>
            <li>Turn your face to the left</li>
            <li>The front of the Document</li>
          </ul>
        </Col>
        <Col md={6}>
          <h2>Scanning your face</h2>
          <p>Please wait for the scan to complete before proceeding to the next step</p>
          <div id="webcam-container">
            {webcamRunning ? (
                        <div id="liveView" className="videoView">
                        <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={enableWebcam}>
                            <span className="mdc-button__ripple"></span>
                            <span className="mdc-button__label">ENABLE WEBCAM</span>
                        </button>
                        <div style={{ position: 'relative' }}>
                            <video id="webcam" style={{ position: 'absolute' }} className={webcamRunning ? "" : "invisible"} ref={webcamRef} autoPlay playsInline></video>
                            <canvas className="output_canvas" id="output_canvas" style={{ position: 'absolute', left: '0px', top: '0px' }} ref={canvasRef}></canvas>
                        </div>
                    </div>
            ) : (
              <img src={images[imageIndex].src} alt="Verification Step" />
            )}
          </div>
          <p>{images[imageIndex].text}</p>
          <button onClick={handleWebcamEnable} className="btn btn-primary">
            {webcamRunning ? 'Stop Webcam' : 'Go to Liveness Detection'}
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default ScanFacePage;
