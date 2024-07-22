import {Col, Container, Row } from 'react-bootstrap';
import './Header.css';
import head_rightImg from '../../assets/headerRght.png';

const Header = () => {
  return (
    <div className='header'>
    <div className="container-fluid">
      <Row className="custom-background">
        <Col md={5}>
          <div className="head_left">
            <div className="w-75 mt-2 h_title text-element">
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
        <Col md={7}>
          <div className="head_right">
            <div className="imageContainer">
              <img src={head_rightImg} alt="header-image" className="head_rightImg" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
  

  )
}

export default Header