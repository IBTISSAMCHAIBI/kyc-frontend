
import Footer from "../components/Footer/Footer";
import HeaderMain from "../components/HeaderMain/HeaderMain";
import FeaturesSection from '../components/Landing/Landing';
import FlushExample from "../components/Footer/FAQSection";
import { Container } from 'react-bootstrap';
import '../components/Home/Home.css';

const Home = () => {
  return (
    <div id="home-page-container">
      <Container fluid>
        <HeaderMain />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="faq">
          <FlushExample />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </Container>
    </div>
  );
}

export default Home;
