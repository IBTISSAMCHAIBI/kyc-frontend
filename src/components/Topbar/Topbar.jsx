import './Topbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Button } from 'react-bootstrap';

const Topbar = () => {
  return (
  <div>
  <Navbar expand="lg" className="bg_color shadow-sm " >
  <Container>
    <Navbar.Brand href="#home">
      <img src={logo} alt="logo" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto text-center d-flex justify-content-center align-items-center" style={{ marginRight: "40px" }}>
        <Nav.Link  className='links active'>Home</Nav.Link>
        <Nav.Link href="#features" className='links'>About Us</Nav.Link>
        <Nav.Link  href="#faq"  className='links'>FAQ</Nav.Link>
        <Nav.Link  href="#contact" className='links'>Contact</Nav.Link>
        <Nav.Item>
          <Link to='/login' className='text-decoration-none'>
            <Button size="sm" className="bg_login">Login</Button>
          </Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


</div>
  );
}

export default Topbar;
