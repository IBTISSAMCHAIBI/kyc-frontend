import { Container, Row, Col , Button} from 'react-bootstrap';
import  { useEffect, useRef, useState } from 'react';
import vision from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';
import '../components/Dataverification/ScanFacePage.css';
import { Link  ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;
const ScanFacePage = () => {

  const [eyeLookOutLeftCompleted, setEyeLookOutLeftCompleted] = useState(false);
  const [screenshotCaptured, setScreenshotCaptured] = useState(false);
  const [eyeLookInRightCompleted, setEyeLookInRightCompleted] = useState(false);
  const [smileCompleted, setSmileCompleted] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [webcamRunning, setWebcamRunning] = useState(false);;
  const [enableWebcamButton, setEnableWebcamButton] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const videoWidth = 480;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
const [eyeLookOutLeftScore, setEyeLookOutLeftScore] = useState(0);
const [eyeLookInRightScore, setEyeLookInRightScore] = useState(0);
const [mouthSmileRightScore, setMouthSmileRightScore] = useState(0);
const [mouthSmileLeftScore, setMouthSmileLeftScore] = useState(0);
const [spoofingDetected, setSpoofingDetected] = useState(false);
const [screenshotTaken, setScreenshotTaken] = useState(false);
const [abortController, setAbortController] = useState(null);




  const images = [
    { src: '/scan.png', text: 'smiling' },
    { src: '/left.png', text: 'Look left' },
    { src: '/right.png', text: 'Look right' }
  ];
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
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
          color: "#E0E0E0"
        });
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
    updateCheckboxes(results.faceBlendshapes);
    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images.length]);

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
                setWebcamEnabled(true); // Set webcamEnabled to true
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

  





let currentStep = 0;
let isPaused = false;
let startTime = null;

const steps = [
  {
    actionName: 'Turn Left',
    categoryNames: ['eyeLookInLeft', 'eyeLookOutRight'],
    actionMessage: 'Please turn your eyes to the left.',
    completed: false,
    pauseDuration: 5000
  },
  {
    actionName: 'Turn Right',
    categoryNames: ['eyeLookInRight', 'eyeLookOutLeft'],
    actionMessage: 'Now, turn your eyes to the right.',
    completed: false,
    pauseDuration: 5000
  },
  {
    actionName: 'Smile',
    categoryNames: ['mouthSmileRight', 'mouthSmileLeft'],
    actionMessage: 'Great! Please smile.',
    completed: false,
    pauseDuration: 1000
  }
];

const checkActionCompletion = (blendShapes, step) => {
  return step.categoryNames.every(categoryName => {
    const shape = blendShapes[0].categories.find(shape => shape.categoryName === categoryName);
    return shape && shape.score >= 0.80;
  });
};

let debounceTimer;
const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};
const captureScreenshot = debounce (async () => {
  if (screenshotCaptured) {
    console.log('Screenshot already captured. Skipping...');
    return;
  }

  const controller = new AbortController();
  setAbortController(controller);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.play();

    return new Promise((resolve, reject) => {
      videoElement.addEventListener('loadedmetadata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        stream.getVideoTracks()[0].stop();
        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject('Failed to capture screenshot');
            return;
          }
          const username = localStorage.getItem('username');
          if (!username) {
            reject('No username found');
            return;
          }
          const formData = new FormData();
          formData.append('file', blob, 'screenshot.jpg');

          try {
            const response = await fetch(`http://127.0.0.1:5000/upload-screenshot/${username}`, {
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              signal: controller.signal // Pass the abort signal
            });

            if (response.ok) {
              console.log('Screenshot saved successfully.');
              setScreenshotCaptured(true);
              disableWebcam();
              resolve();
            } else {
              reject('Failed to save screenshot');
            }
          } catch (error) {
            if (error.name === 'AbortError') {
              console.log('Screenshot capture aborted.');
            } else {
              reject('Error sending screenshot: ' + error.message);
            }
          } finally {
            videoElement.pause();
            stream.getVideoTracks()[0].stop();
            videoElement.remove();
          }
        }, 'image/jpg');
      });
    });
  } catch (error) {
    console.error('Error accessing webcam:', error);
    throw error;
  }
},2000)

const checkScreenshotStatus = async (username) => {
  const controller = new AbortController();
  setAbortController(controller);

  try {
    const response = await fetch(`http://127.0.0.1:5000/check-screenshot/${username}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      signal: controller.signal // Pass the abort signal
    });

    if (response.ok) {
      const result = await response.json();
      return result.saved;
    } else {
      throw new Error('Failed to check screenshot status');
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Screenshot status check aborted.');
    } else {
      console.error('Error checking screenshot status:', error);
    }
    return false;
  }
};

// const captureScreenshot = async () => {
//   if (screenshotCaptured) {
//     console.log('Screenshot already captured. Skipping...');
//     return;
//   }  
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     const videoElement = document.createElement('video');
//     videoElement.srcObject = stream;
//     videoElement.play();

//     return new Promise((resolve, reject) => {
//       videoElement.addEventListener('loadedmetadata', () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = videoElement.videoWidth;
//         canvas.height = videoElement.videoHeight;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

//         stream.getVideoTracks()[0].stop();
//         canvas.toBlob(async (blob) => {
//           if (!blob) {
//             reject('Failed to capture screenshot');
//             return;
//           }
//           const username = localStorage.getItem('username');
//           if (!username) {
//             reject('No username found');
//             return;
//           }
//           const formData = new FormData();
//           formData.append('file', blob, 'screenshot.jpg');

//           try {
//             const response = await fetch(`http://127.0.0.1:5000/upload-screenshot/${username}`, {
//               method: 'POST',
//               body: formData,
//               headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in headers
//               }
//             });

//             if (response.ok) {
//               console.log('Screenshot saved successfully.');
//               setScreenshotCaptured(true); // Mark screenshot as captured
//               disableWebcam(); // Disable webcam after successful capture
//               resolve();
//             } else {
//               reject('Failed to save screenshot');
//             }
//           } catch (error) {
//             reject('Error sending screenshot: ' + error.message);
//           } finally {
//             videoElement.pause();
//             stream.getVideoTracks()[0].stop();
//             videoElement.remove();
//           }
//         }, 'image/jpg');
//       });
//     });
//   } catch (error) {
//     console.error('Error accessing webcam:', error);
//     throw error;
//   }
// };
// const checkScreenshotStatus = async (username) => {
//   try {
//     const response = await fetch(`http://127.0.0.1:5000/check-screenshot/${username}`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });

//     if (response.ok) {
//       const result = await response.json();
//       return result.saved;
//     } else {
//       throw new Error('Failed to check screenshot status');
//     }
//   } catch (error) {
//     console.error('Error checking screenshot status:', error);
//     return false;
//   }
// };
// const updateCheckboxes = async (blendShapes) => {
//   if (!blendShapes || !blendShapes[0] || !blendShapes[0].categories) {
//     console.log("No blend shapes data available.");
//     return;
//   }
//   if (currentStep < steps.length && !isPaused) {
//     if (!startTime) {
//       startTime = new Date().getTime();
//     }
//     if (checkActionCompletion(blendShapes, steps[currentStep])) {
//       steps[currentStep].completed = true;
//       isPaused = true;
//       setTimeout(() => {
//         currentStep++;
//         isPaused = false;
//         startTime = null;
//         console.log(`Step ${steps[currentStep]?.actionName} completed.`);
//       }, steps[currentStep].pauseDuration);
//     } else if (new Date().getTime() - startTime > steps[currentStep].pauseDuration) {
//       if (!steps[currentStep].completed) {
//         setSpoofingDetected(true);
//         console.log("Spoofing detected!");
//         stopWebcamAndLogic('Spoofing detected!');
//         return;
//       }
//     }
//   }

//   if (currentStep < steps.length) {
//     const blendShapeData = blendShapes[0].categories;
//     const scores = {
//       eyeLookOutLeft: blendShapeData.find(shape => shape.categoryName === 'eyeLookOutLeft')?.score || 0,
//       eyeLookInRight: blendShapeData.find(shape => shape.categoryName === 'eyeLookInRight')?.score || 0,
//       eyeLookInLeft: blendShapeData.find(shape => shape.categoryName === 'eyeLookInLeft')?.score || 0,
//       eyeLookOutRight: blendShapeData.find(shape => shape.categoryName === 'eyeLookOutRight')?.score || 0,
//       mouthSmileRight: blendShapeData.find(shape => shape.categoryName === 'mouthSmileRight')?.score || 0,
//       mouthSmileLeft: blendShapeData.find(shape => shape.categoryName === 'mouthSmileLeft')?.score || 0,
//     };

//     console.log("Scores:", scores);

//     if (scores.eyeLookOutLeft >= 0.8 && scores.eyeLookInRight >= 0.8 && !eyeLookOutLeftCompleted) {
//       setEyeLookOutLeftCompleted(true);
//       setEyeLookOutLeftScore(scores.eyeLookOutLeft);
//       console.log("Eye Look Out Left completed.");
//     }

//     if (scores.eyeLookInLeft >= 0.8 && scores.eyeLookOutRight >= 0.8 && !eyeLookInRightCompleted) {
//       setEyeLookInRightCompleted(true);
//       setEyeLookInRightScore(scores.eyeLookInLeft);
//       console.log("Eye Look In Right completed.");
//     }

//     if (scores.mouthSmileRight >= 0.8 && scores.mouthSmileLeft >= 0.8 &&  !smileCompleted) {
//       setSmileCompleted(true);
//       setMouthSmileRightScore(scores.mouthSmileRight);
//       setMouthSmileLeftScore(scores.mouthSmileLeft);
//       console.log("Smile completed.");

//       if (!screenshotTaken) {
//         try {
//           await captureScreenshot();
//           console.log('Screenshot captured.');
//           const username = localStorage.getItem('username');
//           if (await checkScreenshotStatus(username)) {
//             console.log('Screenshot saved confirmed. Stopping webcam.');
//           } else {
//             console.log('Screenshot not confirmed saved. Retry capturing.');
//           }
//         } catch (error) {
//           console.error('Error capturing screenshot:', error);
//         }
//       }
//     }

 
//   }
// };

const updateCheckboxes = async (blendShapes) => {
  if (!blendShapes || !blendShapes[0] || !blendShapes[0].categories) {
    console.log("No blend shapes data available.");
    return;
  }
  if (currentStep < steps.length && !isPaused) {
    if (!startTime) {
      startTime = new Date().getTime();
    }
    if (checkActionCompletion(blendShapes, steps[currentStep])) {
      steps[currentStep].completed = true;
      isPaused = true;
      setTimeout(() => {
        currentStep++;
        isPaused = false;
        startTime = null;
        console.log(`Step ${steps[currentStep]?.actionName} completed.`);
      }, steps[currentStep].pauseDuration);
    } else if (new Date().getTime() - startTime > steps[currentStep].pauseDuration) {
      if (!steps[currentStep].completed) {
        setSpoofingDetected(true);
        console.log("Spoofing detected!");
        stopWebcamAndLogic('Spoofing detected!');
        return;
      }
    }
  }

  if (currentStep < steps.length) {
    const blendShapeData = blendShapes[0].categories;
    const scores = {
      eyeLookOutLeft: blendShapeData.find(shape => shape.categoryName === 'eyeLookOutLeft')?.score || 0,
      eyeLookInRight: blendShapeData.find(shape => shape.categoryName === 'eyeLookInRight')?.score || 0,
      eyeLookInLeft: blendShapeData.find(shape => shape.categoryName === 'eyeLookInLeft')?.score || 0,
      eyeLookOutRight: blendShapeData.find(shape => shape.categoryName === 'eyeLookOutRight')?.score || 0,
      mouthSmileRight: blendShapeData.find(shape => shape.categoryName === 'mouthSmileRight')?.score || 0,
      mouthSmileLeft: blendShapeData.find(shape => shape.categoryName === 'mouthSmileLeft')?.score || 0,
    };

    console.log("Scores:", scores);

    if (scores.eyeLookOutLeft >= 0.8 && scores.eyeLookInRight >= 0.8 && !eyeLookOutLeftCompleted) {
      setEyeLookOutLeftCompleted(true);
      setEyeLookOutLeftScore(scores.eyeLookOutLeft);
      console.log("Eye Look Out Left completed.");
      localStorage.setItem('right', 'true');
    }

    if (scores.eyeLookInLeft >= 0.8 && scores.eyeLookOutRight >= 0.8 && !eyeLookInRightCompleted) {
      setEyeLookInRightCompleted(true);
      setEyeLookInRightScore(scores.eyeLookInLeft);
      console.log("Eye Look In Right completed.");
      localStorage.setItem('left', 'true');
    }

    if (scores.mouthSmileRight >= 0.8 && scores.mouthSmileLeft >= 0.8 &&  !smileCompleted) {
      setSmileCompleted(true);
      setMouthSmileRightScore(scores.mouthSmileRight);
      setMouthSmileLeftScore(scores.mouthSmileLeft);
      console.log("Smile completed.");
      localStorage.setItem('smiling', 'true');
    }

    // Check if all actions are completed and stored in localStorage
    const right = localStorage.getItem('right') 
    const left = localStorage.getItem('left') 
    const smiling = localStorage.getItem('smiling')

    if (right && left && smiling && !screenshotTaken) {
      try {
        await captureScreenshot();
        console.log('Screenshot captured.');
        const username = localStorage.getItem('username');
        if (await checkScreenshotStatus(username)) {
          console.log('Screenshot saved confirmed. Stopping webcam.');
        } else {
          console.log('Screenshot not confirmed saved. Retry capturing.');
        }
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  }
};


const handleContinue = () => {
  // Abort ongoing requests
  if (abortController) {
    abortController.abort();
  }
  // Stop webcam
  disableWebcam();
  // Navigate to the next page
  window.location.href = '/selfie';
};


const stopWebcamAndLogic = (message) => {
  console.log(message);
  disableWebcam();
};


useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      const response = await axios.get('http://localhost:5000/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data.user_data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login'); // Redirect to login if there's an error
    }
  };

  fetchUserData();
}, [navigate]);

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Clear localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect to login
    navigate('/login');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
  


  return (
<Container>
<Row>
{userData ? (
            <>
              <h1>Welcome, {userData.username}!</h1>
              <p>Email: {userData.email}</p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
  <Col md={6}>
    <div className="verification-steps">
      <h1></h1>
      <h2 className="mb-4">Verification Steps</h2>
      <ul className="list-unstyled">
        <li className={`d-flex align-items-center mb-2 ${eyeLookOutLeftCompleted ? 'completed' : ''}`}>
          <input type="checkbox" checked={eyeLookOutLeftCompleted} readOnly />
          <span className="ms-2">Turn your face to the right</span>
        </li>
        <li className={`d-flex align-items-center mb-2 ${eyeLookInRightCompleted ? 'completed' : ''}`}>
          <input type="checkbox" checked={eyeLookInRightCompleted} readOnly />
          <span className="ms-2">Turn your face to the left</span>
        </li>
        <li className={`d-flex align-items-center mb-2 ${smileCompleted ? 'completed' : ''}`}>
          <input type="checkbox" checked={smileCompleted} readOnly />
          <span className="ms-2">Smile</span>
        </li>
      </ul>
      <img src='/icon3.png' alt="check icon" className="status-icon" />
      <h2 className="mt-4">Scanning your face</h2>
      <p>Please wait for the scan to complete before proceeding to the next step</p>
      <p>if you want to continue you ve to resoect t order of t steps </p> 
      <div className="scan-status">
        <div className="mb-3">
          <label htmlFor="right">Look Right</label>
          <div className="d-flex align-items-center">
            <input
              id="right"
              type="text"
              placeholder="EyeLookOutLeft Value"
              className={`form-control ${eyeLookOutLeftCompleted ? 'completed' : spoofingDetected ? 'spoofing' : ''}`}
              readOnly
            />
   
            {spoofingDetected && !eyeLookOutLeftCompleted && (
              <img src='/spoofing-detected.png' alt="spoofing detected" className="status-icon ms-2" />
            )}
            {eyeLookOutLeftCompleted && (
              <img src='/checked.png' alt="check icon" className="status-icon ms-2" />
            )}
           {!spoofingDetected && !eyeLookOutLeftCompleted && (
                           <img src='/progre.png' alt="progress icon" className="status-icon ms-2" />
            )}

          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="left">Look Left</label>
          <div className="d-flex align-items-center">
            <input
              id="left"
              type="text"
              placeholder="EyeLookInRight Value"
              className={`form-control ${eyeLookInRightCompleted ? 'completed' : spoofingDetected ? 'spoofing' : ''}`}
              readOnly
            />
            {spoofingDetected && !eyeLookInRightCompleted && (
              <img src='/spoofing-detected.png' alt="spoofing detected" className="status-icon ms-2" />
            )}
            {eyeLookInRightCompleted && (
              <img src='/checked.png' alt="check icon" className="status-icon ms-2" />
            )}
            {!spoofingDetected && !eyeLookOutLeftCompleted && (
                           <img src='/progre.png' alt="progress icon" className="status-icon ms-2" />
            )}
            
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="mouth">Smile</label>
          <div className="d-flex align-items-center">
            <input
              id="mouth"
              type="text"
              placeholder="Smile Value"
              className={`form-control ${smileCompleted ? 'completed' : spoofingDetected ? 'spoofing' : ''}`}
              readOnly
            />
            {spoofingDetected && !smileCompleted && (
              <img src='/spoofing-detected.png' alt="spoofing detected" className="status-icon ms-2" />
            )}
            {smileCompleted && (
              <img src='/checked.png' alt="check icon" className="status-icon ms-2" />
            )}
            {!spoofingDetected && !eyeLookOutLeftCompleted && (
                           <img src='/progre.png' alt="progress icon" className="status-icon ms-2" />
            )}
          </div>
        </div>
      </div>
    </div>
  </Col>
  <Col md={6}>
    <h2 className="mb-4">Scanning your face</h2>
    <p>Please wait for the scan to complete before proceeding to the next step</p>
    <div id="webcam-container" className="text-center">
      {webcamRunning ? (
        <div id="liveView" className="videoView">
          <button id="webcamButton" className="btn btn-primary mb-2" onClick={enableWebcam}>
            ENABLE WEBCAM
          </button>
          <button id="webcamButton" className="btn btn-danger mb-2" onClick={disableWebcam}>
            DISABLE WEBCAM
          </button>
          <div className="position-relative">
            <video id="webcam" className={webcamRunning ? "" : "d-none"} ref={webcamRef} autoPlay playsInline></video>
            <canvas className="output_canvas position-absolute top-0 start-0" id="output_canvas" ref={canvasRef}></canvas>
          </div>
        </div>
      ) : (
        <img src={images[imageIndex].src} alt="Verification Step" className="img-fluid" />
      )}
    </div>
    <button onClick={handleWebcamEnable} className="btn btn-primary">
      {webcamRunning ? 'Stop Webcam' : 'Go to Liveness Detection'}
    </button>
    <div>
      {screenshotCaptured && (
        <div className="button-container">
          <Link to="/selfie">
          <button className="continue-button" onClick={handleContinue}>
        CONTINUE
      </button>
          </Link>
        </div>
      )}
    </div>
  </Col>
  <Button variant="danger" onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</Button>
</Row>
</Container>
  );
};

export default ScanFacePage;