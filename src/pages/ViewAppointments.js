import React, { useEffect, useState } from "react";
import api from "../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/css.css';

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Added loading state

    useEffect(() => {
        const token = sessionStorage.getItem("token"); // ✅ Ensure using sessionStorage

        if (!token) {
            toast.error("No authentication token found. Please log in.", { position: "top-right", autoClose: 5000 });
            setLoading(false);
            return;
        }

        api.get("/api/auth/user-appointments", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                if (response.data.appointments.length > 0) {
                    setAppointments(response.data.appointments);
                } else {
                    toast.info("No appointments found for this user.", { position: "top-right", autoClose: 3000 });
                }
            } else {
                toast.error(response.data.message || "Failed to load appointments.");
            }
        })
        .catch(error => {
            console.error("Error fetching appointments:", error.response?.data || "No error details");
            toast.error("An error occurred while fetching appointments.");
        })
        .finally(() => setLoading(false));
    }, []);

    const openModal = (appointment) => setSelectedAppointment(appointment);
    const closeModal = () => setSelectedAppointment(null);

    return (
        <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "50vh" }}>
            <ToastContainer />
            <div className="card shadow-lg p-4" style={{ width: "100%" }}>
                <h2 className="text-center mb-4 text-primary">Appointments List</h2>

                {loading ? (
                    <div className="text-center fs-4 text-primary">Loading...</div>
                ) : appointments.length === 0 ? (
                    <div className="alert alert-danger text-center">No appointments found for this user.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center table-text">
                            <thead className="table-dark fs-5">
                                <tr>
                                    <th>#</th>
                                    <th>Appointment Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Type</th>
                                    <th>Assign Doctor</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment, index) => {
                                    const [date, timeRaw] = appointment.date_time.split("T");
                                    const [hours, minutes] = timeRaw.split(":");
                                    const period = hours >= 12 ? "PM" : "AM";
                                    const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

                                    return (
                                        <tr key={appointment.id} className="fs-6">
                                            <td className="fw-bold">{index + 1}</td>
                                            <td className="fw-bold">{appointment.appointment_name}</td>
                                            <td>{date}</td>
                                            <td>{formattedTime}</td>
                                            <td>{appointment.appointment_type}</td>
                                            <td>
                                                {appointment.doctor
                                                    ? `${appointment.doctor.firstname} ${appointment.doctor.lastname}`
                                                    : <span className="badge bg-danger">No Doctor Assigned</span>}
                                            </td>
                                            <td>
                                                {appointment.appointment_status 
                                                    ? <span className={`badge ${appointment.appointment_status.status === "pending" ? "bg-warning" : "bg-success"}`}>
                                                        {appointment.appointment_status.status}
                                                    </span>
                                                    : <span className="badge bg-secondary">No Status</span>}
                                            </td>
                                            <td>
                                                <button className="btn btn-info btn-sm" onClick={() => openModal(appointment)}>
                                                    <i className="fas fa-eye fs-3"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selectedAppointment && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fs-1">Appointment Details</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body modal-text">
                                <p><strong>Name:</strong> {selectedAppointment.appointment_name}</p>
                                <p><strong>Date:</strong> {selectedAppointment.date_time.split("T")[0]}</p>
                                <p><strong>Time:</strong> {selectedAppointment.date_time.split("T")[1].slice(0, 5)}</p>
                                <p><strong>Type:</strong> {selectedAppointment.appointment_type}</p>
                                <p><strong>Doctor:</strong> {selectedAppointment.doctor ? `${selectedAppointment.doctor.firstname} ${selectedAppointment.doctor.lastname}` : "No Doctor Assigned"}</p>
                                <p><strong>Status:</strong> {selectedAppointment.appointment_status ? selectedAppointment.appointment_status.status : "No Status"}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAppointments;
