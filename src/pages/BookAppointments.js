import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/Api";
import { toast, ToastContainer } from "react-toastify";

const BookAppointment = () => {
  const { id } = useParams(); // ✅ Get doctor ID from URL
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    appointment_name: "",
    appointment_date: "",
    appointment_time: "",
    appointment_type: "",
    doctor_id: id || "", // ✅ Ensure doctor ID is set
  });
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); 


  useEffect(() => {
    if (id) {
      api.get(`/api/auth/get-doctor/${id}`)
        .then(response => {
          if (response.data.success) {
            console.log("Doctor Data:", response.data.doctor);
            setDoctor(response.data.doctor);
            setAppointmentData(prev => ({
              ...prev,
              doctor_id: response.data.doctor.id,
              appointment_name: `Appointment with Dr. ${response.data.doctor.firstname} ${response.data.doctor.lastname}`,
            }));
          }
        })
        .catch(error => console.error("Error fetching doctor details:", error));
    }
  }, [id]);

  // ✅ Handle Form Changes & Ensure `doctor_id` Stays Set
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prevData => ({
      ...prevData,
      [name]: value,
      doctor_id: prevData.doctor_id || id // ✅ Ensure doctor_id remains set
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("User not found. Please log in.", { position: "top-right", autoClose: 5000 });
        setLoading(false);
        return;
      }

      if (!appointmentData.doctor_id) {
        toast.error("Doctor ID is missing! Please select a doctor.", { position: "top-right", autoClose: 5000 });
        setLoading(false);
        return;
      }

      if (!appointmentData.appointment_type) {
        toast.error("Please select an appointment type.", { position: "top-right", autoClose: 5000 });
        setLoading(false);
        return;
      }

      // ✅ Combine date and time before sending to backend
      const dateTime = `${appointmentData.appointment_date} ${appointmentData.appointment_time}:00`;

      const payload = {
        appointment_name: appointmentData.appointment_name,
        appointment_date: dateTime,
        appointment_type: appointmentData.appointment_type.toLowerCase(),
        doctor_id: Number(appointmentData.doctor_id),
        user_id: user.id,
      };

      console.log("Final Payload Before Sending:", JSON.stringify(payload, null, 2)); // ✅ Debugging

      const response = await api.post("/api/auth/store-appointment", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Appointment booked successfully!", { position: "top-right", autoClose: 5000 });
        setTimeout(() => navigate("/doctors"), 2000);
      } else {
        toast.error(response.data.message || "Failed to book appointment.", { position: "top-right", autoClose: 5000 });
      }
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || "No error details");
      toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.", { position: "top-right", autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Book Appointment</h2>

        {errorMessage && <p className="text-danger text-center fw-bold">{errorMessage}</p>}

        <form onSubmit={handleSubmitAppointment}>
          <div className="mb-3">
            <label className="form-label fw-bold">Appointment Name</label>
            <input type="text" name="appointment_name" className="form-control"
              value={appointmentData.appointment_name} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Appointment Date</label>
            <input type="date" name="appointment_date" className="form-control"
              value={appointmentData.appointment_date} onChange={handleInputChange} required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Appointment Time</label>
            <input type="time" name="appointment_time" className="form-control"
              value={appointmentData.appointment_time} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Appointment Type</label>
            <select name="appointment_type" className="form-control"
              value={appointmentData.appointment_type} onChange={handleInputChange} required>
              <option value="">Select Type</option>
              <option value="consult">Consult</option>
              <option value="follow-up">Follow-up</option>
              <option value="checkup">Checkup</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary fw-bold" disabled={loading}>
            {loading ? "Saving..." : "Save Appointment"}
          </button>
          <button type="button" className="btn btn-secondary ms-2 fw-bold" 
          onClick={() => navigate(`/book-appointment/${doctor?.id}`)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
