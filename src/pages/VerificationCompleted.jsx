import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import head_rightImg from '../assets/headerRght.png';
import '../components/Dataverification/DataVerification.css';

import { Link } from 'react-router-dom';

function VerificationCompleted () {
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
          </Col>
        </Row>
      </Container>
  );
}

export default VerificationCompleted;