import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import head_rightImg from '../assets/headerRght.png';
import '../components/Dataverification/DataVerification.css';
import { Link } from 'react-router-dom';

function VerificationCompleted () {
  return (
    <div className=" ">
      <Container className="py-5">
      <Row className="custom-background">
      <Col md={6}>
        <div className="head_left">
          <div className="w-75 mt-2 h_title">
            <h1>Seamless Real-time Identity Verification</h1>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="head_right">
          <div className="imageContainer d-flex justify-content-end align-items-center shadow-sm rounded">
            <img src={head_rightImg} alt="header-image" className="head_rightImg" />
          </div>
        </div>
      </Col>
    </Row>
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
           <Link to="/ending">
            <Button size="lg">Continue</Button>
        </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VerificationCompleted;