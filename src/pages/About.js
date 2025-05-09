import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const About = () => {
  return (
    <>
    
    <div className="container mb-1 mt-5 pt-5">
      <div className="text-center">
        <h1 className="mb-4 text-primary fw-bold">About Our Hospital Management System</h1>
        <p className="lead text-muted">Efficient Healthcare Through Technology</p>
      </div>

 
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <h2 className="text-dark fw-bold">Our Mission</h2>
          <p className="text-muted">
            We aim to provide a seamless, technology-driven platform that enables healthcare providers 
            to focus on patient care while improving operational efficiency.
          </p>
        </div>
      </div>

  
      <div className="row text-center mt-5">
        <h2 className="fw-bold text-dark mb-4">Key Features</h2>

        <div className="col-md-4">
          <div className="card shadow-lg p-3 border-0">
            <div className="card-body">
              <i className="bi bi-calendar2-check fs-1 text-primary"></i>
              <h5 className="card-title mt-3">Appointment Scheduling</h5>
              <p className="card-text text-muted">Easily schedule and manage users appointments.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-3 border-0">
            <div className="card-body">
              <i className="bi bi-file-earmark-medical fs-1 text-success"></i>
              <h5 className="card-title mt-3">Medical Records</h5>
              <p className="card-text text-muted">Secure and organized users records management.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-3 border-0">
            <div className="card-body">
              <i className="bi bi-hospital fs-1 text-danger"></i>
              <h5 className="card-title mt-3">Hospital Operations</h5>
              <p className="card-text text-muted">Streamlined workflows for doctor and administration.</p>
            </div>
          </div>
        </div>
      </div>
   
    </div>
    </>
  );
};

export default About;
