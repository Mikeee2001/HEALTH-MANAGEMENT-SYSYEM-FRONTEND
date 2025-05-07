import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api";
import "../styles/css.css"; 

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/auth/display/doctors")
      .then((response) => {
        console.log("Doctors API Response:", response.data);
        setDoctors(response.data.doctors || []);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Doctors</h2>

      {loading ? (
        <div className="loader-container"> {/* ✅ Centers the loader on screen */}
          <span className="loader"></span>
        </div>
      ) : (
        <div className="row">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.id} className="col-md-4 col-sm-6 mb-4"> 
                <div className="card doctor-card shadow-lg border-0 rounded-lg"> 
                  <div className="card-body text-center">
                    <img
                      src={`http://127.0.0.1:8000/storage/${doctor.doctor_image}`} 
                      alt="Doctor"
                      className="doctor-img rounded-circle mb-3"
                    />
                    <h5 className="card-title">{doctor.firstname} {doctor.lastname}</h5>
                    <p className="text-muted"><strong>Specialty:</strong> {doctor.specialty}</p>
                    <p><strong>Qualification:</strong> {doctor.qualification}</p>
                    <button 
                      className="btn btn-primary fw-bold mt-3 px-4"
                      onClick={() => navigate(`/book-appointment/${doctor.id}`)} 
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No doctors found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
