import React from 'react'
import Content from './Content'
import Navbar from './Navbar'
import './HomePage.css';
import { Container } from 'react-bootstrap';
import SliderBanner from './SliderBanner';
import Service from './Service';

const HomePage = () => {
  return (
    <Container>
        <div className="home-page">
            <Navbar />
            <Content/>
            <Service/>
            <SliderBanner/>
        </div>
    </Container>
    
  )
}

export default HomePage;