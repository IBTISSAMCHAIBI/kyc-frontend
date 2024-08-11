import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import './Landing.css'; // Make sure to import your CSS file
import head_rightImg from '../../assets/head_rightImg.png';
import head1_rightImg from '../../assets/head1_rightImg.png';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, backgroundColor, width, height, marginLeft, marginRight }) => {
  return (
    <Card className="feature-card shadow-sm rounded" style={{ backgroundColor, width, height, marginLeft, marginRight }}>
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Link to ="/login">
        <Button variant="" className="learn-more-button">
          Discover more <span>&rarr;</span>
        </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

const FeaturesSection = () => {
  return (
    <Container fluid id="">
      <Row>
        <Col md={6} className="mb-4">
          <FeatureCard
            title="Document verification"
            description="An AI-driven real-time verification solution to enhance the security of digital transactions. Instantly validate identities, ensuring a seamless experience and increasing trust in your online interactions."
            backgroundColor="#E6F9FC"
            height="280px"
            width="100%" // Adjust width to 100% to fit the container
            marginLeft="0"
            marginRight="0"
          />
        </Col>
        <Col md={6} className="mb-4">
          <FeatureCard
            title="Face recognition"
            description="An advanced compliance solution providing secure management while adhering to KYC and AML/CFT standards. Additionally, we are on track for PVID certification, ensuring full compliance."
            backgroundColor="#FFF6D4"
            height="280px"
            width="100%" // Adjust width to 100% to fit the container
            marginLeft="0"
            marginRight="0"
          />
        </Col>
      </Row>
      <Row className="custom-bg mb-4">
        <Col  xs={12} md={6} style={{ margin: 0, padding: 0, marginBottom: '40px' }}>
          <div className="head_left">
            <h2 style={{ margin: 0, padding: 0, marginBottom: '40px' }}><span className="yellow-underline">Fast Secure</span> Verification</h2>
            <p  style={{ margin: 0, padding: 0 }} className="text-secondary">
              Verify your customers identities in 1 minute with our guided and secure process. Our solution simplifies the authentication process, enhancing both security and the customer experience by ensuring quick and efficient verification through small, practical, and fast steps.
            </p>
          </div>
        </Col>
        <Col  xs={12} md={6}>
          <div className="head_right">
            <div className="imageContainer d-flex justify-content-end align-items-center shadow-sm rounded">
              <img src={head_rightImg} alt="header-image" className="head_rightImg" />
            </div>
          </div>
        </Col>
      </Row>
      <div className="verification-process text-center py-5" style={{ backgroundColor: '#003366', color: 'white' }}>
        <h2 style={{ margin: 0, padding: 0, marginBottom: '40px' }}>The documents available on DevoSpace</h2>
        <p style={{ margin: 0, padding: 0 }}>
          Devospace is the ultimate solution for creating unique and powerful online experiences with AI and machine learning.
          Explore our pre-built and ready-to-use AI models to meet your specific use cases starting today.
        </p>
        <div className="d-flex justify-content-center flex-wrap">
          <button className="btn btn-light m-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="icon">&#128100;</span> Identity card
          </button>
          <button className="btn btn-light m-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="icon">&#128188;</span> Passport
          </button>
          <button className="btn btn-light m-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="icon">&#128663;</span> Driving license
          </button>
        </div>
      </div>
      <Row className="custom-bg mb-4">
        <Col  xs={12} md={6}>
          <div className="head_left">
            <h2  style={{ margin: 0, padding: 0, marginBottom: '40px' }} ><span className="yellow-underline">Exceed </span>Traditional Limits</h2>
            <p style={{ margin: 0, padding: 0 }} className="text-secondary">
              Our technology converts your KYC documents into structured data in less than 10 seconds, providing real-time results. Trained to extract data from documents in Latin and European languages,
              it can process up to 3000 documents. Video analysis allows for quick identity verification, ensuring instant and accurate results.
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="head_right">
            <div className="imageContainer d-flex justify-content-end align-items-center shadow-sm rounded">
              <img src={head1_rightImg} alt="header-image" className="head_rightImg" />
            </div>
          </div>
        </Col>
      </Row>
      <h2  style={{ marginLeft: '100px', padding: 0, marginBottom: '40px' }} ><span className="yellow-underline">Remote  </span>Video Verification</h2>
      <Row className="text-center mb-4">
        <Col md={4}>
          <FeatureCard
            title="Privacy"
            description="Your processes are private and remain so, even internally. Users cannot see the title or content of items that are not shared with them."
            backgroundColor="#EDFFF8"
            height="300px"
            width="100%" 
          />
        </Col>
        <Col md={4}>
          <FeatureCard
            title="Deletion"
            description="Your processes are private and remain so, even internally. Users cannot see the title or content of items that are not shared with them."
            backgroundColor="#FBF2EE"
            height="300px"
            width="100%" 
          />
        </Col>
        <Col md={4}>
          <FeatureCard
            title="ISO 27001"
            description="Our servers ISO 27001 certified are located in France, and support HTTPS and the latest version of TLS. GDPR compliance is ensured."
            backgroundColor="#FEFEEE"
            height="300px"
            width="100%" // Adjust width to 100% to fit the container
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturesSection;
