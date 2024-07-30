import React from 'react';
import { Container, Row, Col, Card, Form,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faPassport, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import '../components/Dataverification/DataVerification.css';
import { Link } from 'react-router-dom';
import head_rightImg from '../assets/headerRght.png';
import { useState } from 'react';




const DataVerification = () => {
  const [selectedDocument, setSelectedDocument] = useState('');

  const handleDocumentChange = (event) => {
      setSelectedDocument(event.target.id);
  };

  return (
    <Container fluid>
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
    <h2 className="mb-4">Data Verification</h2>
    <p>Choose one of these document types.</p>
    <Row className="justify-content-center">
        <Col md={4}>
            <Card className="mb-3">
                <Card.Body className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faIdCard} size="2x" className="me-3" style={{ color: '#007bff' }} />
                    <div className="flex-grow-1">
                        <Card.Title className="mb-0">National identity card</Card.Title>
                        <Card.Text className="text-muted">Recommended</Card.Text>
                    </div>
                    <Form.Check
                        type="radio"
                        name="document"
                        id="nationalId"
                        onChange={handleDocumentChange}
                        checked={selectedDocument === 'nationalId'}
                    />
                </Card.Body>
            </Card>
        </Col>
        <Col md={4}>
            <Card className="mb-3">
                <Card.Body className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faPassport} size="2x" className="me-3" style={{ color: '#007bff' }} />
                    <div className="flex-grow-1">
                        <Card.Title className="mb-0">Passport</Card.Title>
                    </div>
                    <Form.Check
                        type="radio"
                        name="document"
                        id="passport"
                        onChange={handleDocumentChange}
                        checked={selectedDocument === 'passport'}
                    />
                </Card.Body>
            </Card>
        </Col>
        <Col md={4}>
            <Card className="mb-3">
                <Card.Body className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faIdBadge} size="2x" className="me-3" style={{ color: '#007bff' }} />
                    <div className="flex-grow-1">
                        <Card.Title className="mb-0">Driving license</Card.Title>
                    </div>
                    <Form.Check
                        type="radio"
                        name="document"
                        id="drivingLicense"
                        onChange={handleDocumentChange}
                        checked={selectedDocument === 'drivingLicense'}
                    />
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <div className="text-center mt-4">
        <Link to="/scan">
            <Button variant="primary" size="lg" disabled={!selectedDocument}>Continue</Button>
        </Link>
    </div>
</Container>




  );
}

export default DataVerification ;
