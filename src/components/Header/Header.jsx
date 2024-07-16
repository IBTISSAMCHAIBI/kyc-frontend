import {Col, Container, Row } from 'react-bootstrap';
import './Header.css';
import head_rightImg from '../../assets/headerRght.png';

const Header = () => {
  return (
    <div className='mt-5 header'>
      <Container>
      <Row className="custom-background">
      <Col md={6}>
        <div className="head_left">
          <div className="w-75 mt-2 h_title">
            <h1>Seamless Real-time Identity Verification</h1>
          </div>
          <p className="text-secondary">
            Discover Our Cutting-Edge Verification Solutions.
          </p>
          <div className="d-flex justify-content-between align-items-start w-50 mt-4">
          <a href="#features" className="custom-button">
                 Explore our Features
               <span>&rarr;</span>
           </a>
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
      </Container>
    </div>

  )
}

export default Header