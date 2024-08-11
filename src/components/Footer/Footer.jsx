import { Button, Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            {/* Appointment Section */}
            <Container fluid className="appointment-section text-center py-4">
                <Row className="justify-content-center">
                    <Col md={8} lg={6} className="box">
                        <h2>Want to make test easily?</h2>
                        <Link to ="/SignUp">
                        <Button variant="light" className="mt-3 contact-button">Click here</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>

            {/* Footer Section */}
            <Container fluid className="footer-section py-4">
                <Row className="align-items-center justify-content-center">
                    <Col md={12} className="text-center">
                        <div className="footer-logo">
                            <img src={logo} alt="DEVOSPACE Logo" />
                        </div>
                        <p className="copyright">Copyright © 2024 DEVOSPACE</p>
                    </Col>
                    {/* <Col md={6} className="text-center mt-3 mt-md-0">
                        <input type="email" placeholder="Your email address..." className="email-input" />
                        <Button variant="primary" className="subscribe-button">Subscribe</Button>
                    </Col> */}
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
