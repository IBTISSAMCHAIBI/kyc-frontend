
import { PiNumberSixThin } from "react-icons/pi";
import { Card, Row, Col ,Container} from 'react-bootstrap';
import './Landing.css'; // Make sure to import your CSS file
import head_rightImg from '../../assets/headerRght.png';

const FeatureCard = ({ title, description }) => {
  return (
    <Card className="custom-card">
      <Card.Body>
        <Card.Title as="h5">{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <a href="#learn-more" className="btn">
          Learn more <span>&rarr;</span>
        </a>
      </Card.Body>
    </Card>
  );
};

const FeaturesSection = () => {
  return (
    <Container>
    <Row>
      <Col md={6}>
        <FeatureCard 
          title="Document verification"
          description="An AI-driven real-time verification solution to enhance the security of digital transactions. Instantly validate identities, ensuring a seamless experience and increasing trust in your online interactions."
        />
      </Col>
      <Col md={6}>
        <FeatureCard 
          title="Face recognition"
          description="An advanced compliance solution providing secure management while adhering to KYC and AML/CFT standards. Additionally, we are on track for PVID certification, ensuring full compliance."
        />
      </Col>
    </Row>
      <Row className="custom-bg">
      <Col md={6}>
        <div className="head_left">
          <div className="w-75 mt-2 h_title">
            <h1>Fast Secure Verification</h1>
          </div>
          <p className="text-secondary">
          Verify your customers' identities in 1 minute with our guided and secure process. Our solution simplifies the authentication process,
          enhancing both security and the customer experience by ensuring quick and efficient verification through small, practical, and fast steps.
          </p>
          <div className="d-flex justify-content-between align-items-start w-50 mt-4">
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
    <Row>
    <div className="w-75 mt-2 h_title">
    <h1>VERIFICATION PROCESS</h1>
    </div>
          <Col md={3}>
            <div className="box">
              <div className="boxContianer d-flex">
                <div className="w-100">
                  <h5 style={{ color: '#3D3F42', fontWeight: 'bold' }}>Delicious Food</h5>
                  <h6 className='text-secondary'>Document verification</h6>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="box">
              <div className="boxContianer d-flex">
                <div className="w-100">
                  <h5 style={{ color: '#3D3F42', fontWeight: 'bold' }}>
                  <PiNumberSixThin />
                  </h5>
                  <h6 className='text-secondary'>Face recognation</h6>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="box">
              <div className="boxContianer d-flex">
                <div className="w-100">
                  <h5 style={{ color: '#3D3F42', fontWeight: 'bold' }}>Feedback
                   </h5>
                  <p className='text-secondary'>results</p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="box">
              <div className="boxContianer d-flex">
                <div className="w-100">
                  <h5 style={{ color: '#3D3F42', fontWeight: 'bold' }}>comparison</h5>
                  <p className='text-secondary'>comparison</p>
                </div>
              </div>
            </div>
          </Col>
    </Row>

    <div className="container text-center py-5" style={{backgroundColor: '#003366', color: 'white'}}>
            <h2>The documents available on DevoSpace</h2>
            <p>
                Devospace is the ultimate solution for creating unique and powerful online experiences with AI and machine learning.
                Explore our pre-built and ready-to-use AI models to meet your specific use cases starting today.
            </p>
            <div className="d-flex justify-content-center">
                <button className="btn btn-light m-2" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span className="icon">&#128100;</span> Identity card
                </button>
                <button className="btn btn-light m-2" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span className="icon">&#128188;</span> Passport
                </button>
                <button className="btn btn-light m-2" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span className="icon">&#128663;</span> Driving license
                </button>
            </div>
        </div>
        <Row className="custom-bg">
      <Col md={6}>
        <div className="head_left">
          <div className="w-75 mt-2 h_title">
            <h1>Exceed Traditional Limits</h1>
          </div>
          <p className="text-secondary">
          Our technology converts your KYC documents into structured data in less than 10 seconds, providing real-time results. Trained to extract data from documents in Latin and European languages, 
          it can process up to 3000 documents. Video analysis allows for quick identity verification, ensuring instant and accurate results.
          </p>
          <div className="d-flex justify-content-between align-items-start w-50 mt-4">
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

    <Row>
    <div className="w-75 mt-2 h_title">
            <h1>Remote Video Verification</h1>
          </div>
      <Col md={4}>
        <FeatureCard 
          title="Privacy"
          description="Your processes are private and remain so, even internally. Users cannot see the title or content of items that are not shared with them.."
        />
      </Col>
      <Col md={4}>
        <FeatureCard 
          title="Deletion"
          description="Your processes are private and remain so, even internally. Users cannot see the title or content of items that are not shared with them."
        />
      </Col>
      <Col md={4}>
        <FeatureCard 
          title="ISO 27001"
          description="Our servers ISO 27001 certified are located in France, and support HTTPS and the latest version of TLS. GDPR compliance is ensured."
        />
      </Col>
    </Row>
    </Container>

  );
};

export default FeaturesSection;
