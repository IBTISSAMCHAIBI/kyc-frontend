
import { PiNumberSixThin } from "react-icons/pi";
import { Card, Row, Col ,Container ,Button} from 'react-bootstrap';
import { FaRegCheckCircle, FaUserCheck, FaEquals, FaEye } from 'react-icons/fa';
import './Landing.css'; // Make sure to import your CSS file
import head_rightImg from '../../assets/head_rightImg.png';
import head1_rightImg from '../../assets/head1_rightImg.png';
const FeatureCard = ({ title, description, backgroundColor, width, height ,marginLeft, marginRight}) => {
  return (
    <Card className="feature-card shadow-sm rounded" style={{ backgroundColor,width,height ,   marginLeft, marginRight }}>
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Button variant="link" className="learn-more-button">
          Learn more <span>&rarr;</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

const FeaturesSection = () => {
  const steps = [
    { id: 1, image: '/01.png', title: 'Document verification' },
    { id: 2, image: '/02.png', title: 'Face recognition' },
    { id: 3, image: '/03.png', title: 'Comparison' },
    { id: 4, image: '/04.png', title: 'Comparison display of results' },
  ];
  return (
    <Container fluid>
    <Row>
      <Col md={6} className="card1 ml-10">
        <FeatureCard
          title="Document verification"
          description="An AI-driven real-time verification solution to enhance the security of digital transactions. Instantly validate identities, ensuring a seamless experience and increasing trust in your online interactions."
          backgroundColor="#E6F9FC"
          height="280px"
          width="600px"
          marginLeft="30px"
          marginRight="0px"
        />
      </Col>
      <Col md={6} className="card2">
        <FeatureCard
          title="Face recognition"
          description="An advanced compliance solution providing secure management while adhering to KYC and AML/CFT standards. Additionally, we are on track for PVID certification, ensuring full compliance."
          backgroundColor="#FFF6D4"
          height="280px"
          width="600px"
           marginLeft="30px"
          marginRight="0px"
        />
      </Col>
    </Row>
    <Row className="custom-bg">
        <Col md={5}>
          <div className="head_left">
            <div className="w-75 mt-2 h_title">
              <h2>
                <span className="yellow-underline">Fast Secure</span> Verification
              </h2>
            </div>
            <p className="text-secondary mt-3">
              Verify your customers' identities in 1 minute with our guided and secure process. Our solution simplifies the authentication process,
              enhancing both security and the customer experience by ensuring quick and efficient verification through small, practical, and fast steps.
            </p>
            <div className="d-flex justify-content-between align-items-start w-50 mt-4">
            </div>
          </div>
        </Col>
        <Col md={7}>
          <div className="head_right">
            <div className="imageContainer d-flex justify-content-end align-items-center shadow-sm rounded">
              <img src={head_rightImg} alt="header-image" className="head_rightImg small-image" />
            </div>
          </div>
        </Col>
    </Row>
      <div className="verification-process">
      <h2 className="title">VERIFICATION PROCESS</h2>
      <div className="steps">
        {steps.map((step) => (
          <div key={step.id} className="step">
            <div className="image-container">
              <img src={step.image} alt={`Step ${step.id}`} className="number-image" />
              <div className="number-text">{step.id < 10 ? `0${step.id}` : step.id}</div>
            </div>
            <div className="description">{step.title}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="  container-fluid text-center py-5" style={{ backgroundColor: '#003366', color: 'white' }}>
      <h2 className="text-center">The documents available on DevoSpace</h2>
      <p className="text-center" style={{width:"1260px" }}>
        Devospace is the ultimate solution for creating unique and powerful online experiences with AI and machine learning.
        Explore our pre-built and ready-to-use AI models to meet your specific use cases starting today.
      </p>
      <div className="d-flex justify-content-center">
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
    <Row className="custom-bg">
      <Col md={6}>
        <div className="head_left">
          <div className="w-75 mt-2 h_title"> 
            <h2><span className="yellow-underline">Exceed </span>Traditional Limits</h2>
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
            <img src={head1_rightImg} alt="header-image" className="head_rightImg" />
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
          description="Your processes are private and remain so, even internally. Users cannot see the title or content of items that are not shared with them."
          backgroundColor="#EDFFF8"
          height="300px"
          width="409px"
        />
      </Col>
      <Col md={4}>
        <FeatureCard
          title="Deletion"
          description="Your processes are private and remain so, even internally. Users cannot see the title or content of items that are not shared with them."
          backgroundColor="#FBF2EE"
          height="300px"
          width="409px"
        />
      </Col>
      <Col md={4}>
        <FeatureCard
          title="ISO 27001"
          description="Our servers ISO 27001 certified are located in France, and support HTTPS and the latest version of TLS. GDPR compliance is ensured."
          backgroundColor="#FEFEEE"
          height="300px"
          width="409px"
        />
      </Col>
    </Row>
  </Container>
  );
};

export default FeaturesSection;
