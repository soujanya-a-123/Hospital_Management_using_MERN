import React, { useState } from "react";

const DischargeForm = () => {
  const [discharge, setDischarge] = useState({
    patientName: "",
    doctorName: "",
    diagnosis: "",
    treatment: "",
    admissionDate: "",
    dischargeDate: "",
    advice: "",
  });

  const handleChange = (e) => {
    setDischarge({ ...discharge, [e.target.name]: e.target.value });
  };

  const addDischarge = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/discharges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discharge),
    });

    alert("Discharge summary added successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Discharge Summary</h2>

      <form onSubmit={addDischarge}>
        <input name="patientName" placeholder="Patient Name" value={discharge.patientName} onChange={handleChange} required />
        <input name="doctorName" placeholder="Doctor Name" value={discharge.doctorName} onChange={handleChange} required />
        <input name="diagnosis" placeholder="Diagnosis" value={discharge.diagnosis} onChange={handleChange} required />
        <input name="treatment" placeholder="Treatment" value={discharge.treatment} onChange={handleChange} required />
        <input name="admissionDate" type="date" value={discharge.admissionDate} onChange={handleChange} required />
        <input name="dischargeDate" type="date" value={discharge.dischargeDate} onChange={handleChange} required />
        <input name="advice" placeholder="Advice" value={discharge.advice} onChange={handleChange} />

        <button type="submit">Add Discharge Summary</button>
      </form>
    </div>
  );
};

export default DischargeForm;