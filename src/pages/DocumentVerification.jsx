import React from 'react';
import { Container, Row, Col, Card, Form,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faPassport, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import '../components/Dataverification/DataVerification.css';
import { Link } from 'react-router-dom';
import head_rightImg from '../assets/headerRght.png';


const iconStyle = { color: 'blue' };

const DataVerification = () => {
  return (<div className="container">
<Container className="my-5">
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
<h2 className="mb-4">Data Verification</h2>
<p>Choose one of these document types.</p>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faIdCard} size="2x" className="me-3" style={iconStyle} />
              <div className="flex-grow-1">
                <Card.Title className="mb-0">National identity card</Card.Title>
                <Card.Text className="text-muted">Recommended</Card.Text>
              </div>
              <Form.Check type="radio" name="document" id="nationalId" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faPassport} size="2x" className="me-3" style={iconStyle} />
              <div className="flex-grow-1">
                <Card.Title className="mb-0">Passport</Card.Title>
              </div>
              <Form.Check type="radio" name="document" id="passport" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faIdBadge} size="2x" className="me-3" style={iconStyle} />
              <div className="flex-grow-1">
                <Card.Title className="mb-0">Driving license</Card.Title>
              </div>
              <Form.Check type="radio" name="document" id="drivingLicense" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center mt-4">
           <Link to="/scancard">
            <Button variant="primary" size="lg">Continue</Button>
            </Link>
          </div>
</Container>
</div>



  );
}

export default DataVerification ;
