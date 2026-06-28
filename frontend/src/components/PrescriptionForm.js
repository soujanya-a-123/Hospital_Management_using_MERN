import React, { useState } from "react";

const PrescriptionForm = () => {
  const [prescription, setPrescription] = useState({
    patientName: "",
    doctorName: "",
    medicineName: "",
    dosage: "",
    days: "",
    notes: "",
  });

  const handleChange = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  const addPrescription = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/prescriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prescription),
    });

    alert("Prescription added successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Prescription</h2>

      <form onSubmit={addPrescription}>
        <input name="patientName" placeholder="Patient Name" value={prescription.patientName} onChange={handleChange} required />
        <input name="doctorName" placeholder="Doctor Name" value={prescription.doctorName} onChange={handleChange} required />
        <input name="medicineName" placeholder="Medicine Name" value={prescription.medicineName} onChange={handleChange} required />
        <input name="dosage" placeholder="Dosage" value={prescription.dosage} onChange={handleChange} required />
        <input name="days" placeholder="Days" value={prescription.days} onChange={handleChange} required />
        <input name="notes" placeholder="Notes" value={prescription.notes} onChange={handleChange} />

        <button type="submit">Add Prescription</button>
      </form>
    </div>
  );
};

export default PrescriptionForm;