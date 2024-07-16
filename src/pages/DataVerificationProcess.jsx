import React  from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../components/Dataverification/DataVerification.css';
import { Link } from 'react-router-dom';
import head_rightImg from '../assets/headerRght.png';

const DataVerificationProcess= () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      setIsButtonEnabled(!isChecked);
    };
  return (
    <Container>
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
  <div className="content">
          <h2>Data Verification</h2>
          <div className="verification-items">
            <div className="item">
              <div className="icon">
                <img src="icon1.png" alt="Icon" />
              </div>
              <div className="description">
                <h3>Identity document verification</h3>
                <p>
                  Take a photo with your webcam against a neutral background. Please remove any objects that may cover your face.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src="icon2.png" alt="Icon" />
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
          <Link to="/scan">
          <button className="continue-button" disabled={!isButtonEnabled}>
            Continue
          </button>
          </Link>
        </div>
 </Container>



  );
}

export default DataVerificationProcess ;
