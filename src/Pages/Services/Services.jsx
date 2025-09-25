import React from 'react';
import "./services.css";
import HeroServices from '../../Components/Hero/HeroServices';
import Testimonial from '../../Components/Testimonial/Testimonial';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';

function Services() {
  return (
    <div className="ServicePage">
      <div className='ServicePageContainer'>
      <HeroServices />
      <ServiceCard />
      <Testimonial />
      </div>
    </div>
  );
}

export default Services;
