import React, { useState } from 'react';

import Header, { HeroSection } from '../compartments/Header.jsx';
import CounterSection from '../compartments/Cards.jsx';  
import CourseCarousel from '../compartments/Carousel.jsx';
import ImageWithText from '../compartments/aftercaro.jsx';
import ProjectsSection from '../compartments/ProjectSection.jsx';
import TrainersSection from '../compartments/trainersection.jsx';
import GetStartedSection from '../compartments/GetStarted.jsx';
import Footer from '../compartments/footer.jsx';


function Home(){
  return (
    <><div><Header/></div>
    <div><HeroSection/></div>
    <div><CounterSection/></div>
    <div><CourseCarousel/></div>
    <div><ImageWithText/></div>
    <div><ProjectsSection/></div>
    <div><TrainersSection/></div>
    <div><GetStartedSection/></div>
    <div><Footer/></div>

    </>
  )
}

export default  Home