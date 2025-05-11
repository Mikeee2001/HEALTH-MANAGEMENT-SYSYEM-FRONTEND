import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const EditAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ appointment_date: "", hour: "08", minute: "00", period: "AM", appointment_type: "" });

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Unauthorized! Please log in.");
            navigate("/login");
            return;
        }

        api.get(`/api/auth/get-appointment/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                const [date, time] = response.data.appointment.date_time.split("T");
                let [hours, minutes] = time.slice(0, 5).split(":");

                // ✅ Convert 24-hour to 12-hour format
                let period = hours >= 12 ? "PM" : "AM";
                let formattedHour = `${hours % 12 || 12}`.padStart(2, "0");

                setFormData({
                    appointment_date: date,
                    hour: formattedHour,
                    minute: minutes,
                    period,
                    appointment_type: response.data.appointment.appointment_type
                });
            }
        })
        .catch(() => console.log("Error fetching appointment details"));
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");

        if (!token) {
            toast.error("Unauthorized! Please log in.");
            navigate("/login");
            return;
        }

        // ✅ Convert selected time to 24-hour format
        let { hour, minute, period } = formData;
        let formattedHour = parseInt(hour);
        if (period === "PM" && formattedHour !== 12) formattedHour += 12;
        if (period === "AM" && formattedHour === 12) formattedHour = 0;

        let formatted24HourTime = `${formattedHour.toString().padStart(2, "0")}:${minute}`;

        api.put(`/api/auth/update-appointment/${id}`, {
            appointment_date: formData.appointment_date,
            appointment_time: formatted24HourTime, // ✅ Send back as 24-hour format
            appointment_type: formData.appointment_type
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                toast.success("Appointment updated successfully!");
                navigate("/view-appointment");
            } else {
                toast.error("Failed to update appointment.");
            }
        })
        .catch(() => toast.error("Something went wrong."));
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="card shadow-lg p-4 border-primary" style={{ maxWidth: "500px", margin: "auto", backgroundColor: "#f8f9fa" }}>
                <h2 className="text-center text-primary">Edit Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-secondary">Date (Today & Future Dates Only):</label>
                        <input
                            type="date"
                            name="appointment_date"
                            className="form-control border-primary"
                            value={formData.appointment_date}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-secondary">Time (08:00 AM - 08:00 PM):</label>
                        <div className="d-flex gap-2">
                            <select name="hour" className="form-select border-primary" value={formData.hour} onChange={(e) => setFormData({ ...formData, hour: e.target.value })} required>
                                {[...Array(12)].map((_, i) => {
                                    let hour = (i + 1).toString().padStart(2, "0");
                                    return <option key={hour} value={hour}>{hour}</option>;
                                })}
                            </select>
                            <select name="minute" className="form-select border-primary" value={formData.minute} onChange={(e) => setFormData({ ...formData, minute: e.target.value })} required>
                                {["00", "15", "30", "45"].map(min => <option key={min} value={min}>{min}</option>)}
                            </select>
                            <select name="period" className="form-select border-primary" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} required>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-secondary">Type:</label>
                        <select
                            name="appointment_type"
                            className="form-select border-primary"
                            value={formData.appointment_type}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                        >
                             <option value="" disabled selected>Select type</option>
                            <option value="checkup">Check-up</option>
                            <option value="emergency">Emergency</option>
                            <option value="follow-up">Follow-up</option>
                            <option value="consult">Consultation</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Save Changes</button>
                    <button type="button" className="btn btn-secondary mt-2 w-100" onClick={() => navigate("/view-appointment")}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditAppointment;
