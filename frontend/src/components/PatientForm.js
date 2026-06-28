import React, { useState } from "react";

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
    contact: "",
    email: "",
  });

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const addPatient = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });

    if (res.ok) {
      alert("Patient added successfully");

      setPatient({
        name: "",
        age: "",
        gender: "",
        disease: "",
        contact: "",
        email: "",
      });
    } else {
      alert("Failed to add patient");
    }
  };

  return (
    <div className="card">
      <h2>Add Patient</h2>

      <form onSubmit={addPatient}>
        <input
          name="name"
          placeholder="Patient Name"
          value={patient.name}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={patient.age}
          onChange={handleChange}
          required
        />

        <input
          name="gender"
          placeholder="Gender"
          value={patient.gender}
          onChange={handleChange}
          required
        />

        <input
          name="disease"
          placeholder="Disease"
          value={patient.disease}
          onChange={handleChange}
          required
        />

        <input
          name="contact"
          placeholder="Contact Number"
          value={patient.contact}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Patient Email"
          value={patient.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;