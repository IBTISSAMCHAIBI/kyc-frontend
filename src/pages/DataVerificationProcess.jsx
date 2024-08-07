import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import head_rightImg from '../assets/head_rightImg.png';
import '../components/Dataverification/DataVerification.css';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;
const DataVerificationProcess = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('No token found. Please log in.');
          navigate('/login'); 
          return;
        }

        const response = await axios.get(`${baseURL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data.user_data);
        localStorage.setItem('username', response.data.user_data.username);
        toast.success(`welcome back ${ response.data.user_data.username}.`);
      } catch (error) {
        toast.error('Error fetching user data. Train again .');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <Container fluid>
      <ToastContainer />
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
      <div className="content">
        {userData ? (
          <>
            <h1>Welcome, {userData.username}!</h1>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
        <h2>Data Verification</h2>
        <div className="verification-items">
          <div className="item">
            <div className="icon">
              <img src='/icon1.png' alt="Icon" />
            </div>
            <div className="description">
              <h3>Identity document verification</h3>
              <p>Take a photo with your webcam against a neutral background. Please remove any objects that may cover your face.</p>
            </div>
          </div>
          <div className="item">
            <div className="icon">
              <img src='/icon2.png' alt="Icon" />
            </div>
            <div className="description">
              <h3>Face recognition</h3>
              <p>Scan your ID document to digitize it. Ensure that it is still valid and not damaged.</p>
            </div>
          </div>
        </div>
        <div className="checkbox">
          <input type="checkbox" id="consent" checked={isChecked} onChange={handleCheckboxChange} />
          <label htmlFor="consent">
            I consent to my personal information being processed by a third party for identity verification.
          </label>
        </div>
        <Link to={isChecked ? "/scan" : "#"}>
          <Button disabled={!isChecked}>
            Start verification process
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default DataVerificationProcess;
