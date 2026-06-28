import React, { useState } from "react";

const AppointmentForm = () => {
  const [appointment, setAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const addAppointment = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    alert("Appointment booked successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Book Appointment</h2>

      <form onSubmit={addAppointment}>
        <input name="patientName" placeholder="Patient Name" value={appointment.patientName} onChange={handleChange} required />
        <input name="doctorName" placeholder="Doctor Name" value={appointment.doctorName} onChange={handleChange} required />
        <input name="date" type="date" value={appointment.date} onChange={handleChange} required />
        <input name="time" type="time" value={appointment.time} onChange={handleChange} required />
        <input name="reason" placeholder="Reason" value={appointment.reason} onChange={handleChange} required />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;