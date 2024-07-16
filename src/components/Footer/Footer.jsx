import React, { useState } from 'react';
import { Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
// import '../../assets/logo.png';
import logo from '../../assets/logo.png';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div>
       <Container fluid className="appointment-section text-center py-5 d-flex justify-content-center align-items-center">
      <div className="box">
        <h2>Want to make an appointment easily?</h2>
        <Button variant="light" className="mt-3 contact-button">Contact here</Button>
      </div>
    </Container>
            <Container fluid className="footer-section py-4">
                <Row className="align-items-center">
                    <Col md={6}>
                        <div className="footer-logo">
                            <img src={logo}alt="DEVOSPACE Logo" />
                            <p>© 2024 DEVOSPACE</p>
                        </div>
                    </Col>
                    {/* <Col md={6} className="text-md-right">
                        <InputGroup className="email-subscribe">
                            <Form.Control
                                type="email"
                                placeholder="Your email address..."
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <InputGroup.Append>
                                <Button variant="primary">Subscribe</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col> */}
                </Row>
            </Container>
        </div>
    );
};

export default Footer;