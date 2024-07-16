import Accordion from 'react-bootstrap/Accordion';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function FlushExample() {
  return (
    <Container className="mt-4">
      <div className="w-75 mt-2 h_title">
        <h1>Frequently Asked Questions</h1>
      </div>
      <Row className="">
        <Col md={6} className="mb-4">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How can I test the KYC API ?</Accordion.Header>
              <Accordion.Body>
              Our KYC API is available to any user with an account on our platform and includes 
              a free trial period. To test our API, simply create a free account,
               and you will be able to upload KYC documents in our user interface 
               to see the KYC API in action, as well as the JSON output.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={6} className="mb-4">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Which documents are accepted by KYC ?</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={6} className="mb-4">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Which documents are accepted by KYC ?</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={6} className="mb-4">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What is KYC processing time ?</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default FlushExample;
