import Footer from "../components/Footer/Footer"
import HeaderMain from "../components/HeaderMain/HeaderMain"
import  FeaturesSection from '../components/Landing/Landing'
import FlushExample from "../components/Footer/FAQSection"

const Home = () => {
  return (
    <div>
        <HeaderMain/>
        <FeaturesSection/>
        <FlushExample/>
        <Footer/>
    </div>
  )
}

export default Home