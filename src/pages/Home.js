import React from "react";
import Header from "../pages/Header"; 
import DoctorsList from "../pages/DoctorList"; 
import About from "../pages/About"; 

import "bootstrap/dist/css/bootstrap.min.css";

import ScrollEffect from "../components/ScrollEffect";
import SlideShow from "../components/SlideShow";


const Home = () => {

  return (
    <>
    <ScrollEffect />
      <Header />     

      <div className="container mt-5">
      <SlideShow />
      </div>

        <div className="fade-in">
          <DoctorsList /> 
        </div>

        <div className="fade-in">
          <About /> 
        </div>

     
    </>
  );
};

export default Home;
