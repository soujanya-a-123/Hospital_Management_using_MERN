import React, { useState } from "react";

const DoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    phone: "",
    availableTime: "",
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const addDoctor = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });

    alert("Doctor added successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Doctor</h2>

      <form onSubmit={addDoctor}>
        <input name="name" placeholder="Doctor Name" value={doctor.name} onChange={handleChange} required />
        <input name="specialization" placeholder="Specialization" value={doctor.specialization} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={doctor.phone} onChange={handleChange} required />
        <input name="availableTime" placeholder="Available Time" value={doctor.availableTime} onChange={handleChange} required />

        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default DoctorForm;