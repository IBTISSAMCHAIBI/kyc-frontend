import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import head_rightImg from '../assets/headerRght.png';
import '../components/Dataverification/DataVerification.css';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';

function VerificationCompleted () {
  const navigate=useNavigate()
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Clear localStorage on logout
      localStorage.removeItem('token');
      localStorage.removeItem('username'); // Correctly remove username

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
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <img src="/done.png" alt="Hero Background" className="img-fluid" />
            <h1>Face recognation completed</h1>
            <p>Thank you for following all these detailed steps to successfully perform facial recognition.
                 Click on 'Continue' to see the result.</p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={6} className="text-center">
           {/* <Link to="/ending">
            <Button size="lg">Continue</Button>
        </Link> */}
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Container>
  );
}

export default VerificationCompleted;