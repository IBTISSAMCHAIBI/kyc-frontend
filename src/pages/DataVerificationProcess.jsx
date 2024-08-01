import  { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../components/Dataverification/DataVerification.css';
import { Link, useNavigate } from 'react-router-dom';
import head_rightImg from '../assets/head_rightImg.png';
import axios from 'axios';

const DataVerificationProcess = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setIsButtonEnabled(!isChecked);
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
    <Container fluid>
      <div className="header">
        <div className="header-content">
          {userData ? (
            <>
              <h1>Welcome, {userData.username}!</h1>
              <p>Email: {userData.email}</p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
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
        <Button variant="danger" onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</Button>
        <Link to="/scan">
          <Button>
            Start verification process
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default DataVerificationProcess;
