import React, { useState } from "react";

const LabForm = () => {
  const [lab, setLab] = useState({
    patientName: "",
    doctorName: "",
    testName: "",
    testDate: "",
    result: "",
  });

  const handleChange = (e) => {
    setLab({
      ...lab,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/laboratory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lab),
    });

    alert("Lab test added");

    setLab({
      patientName: "",
      doctorName: "",
      testName: "",
      testDate: "",
      result: "",
    });
  };

  return (
    <div className="card">
      <h2>Add Laboratory Test</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="patientName"
          placeholder="Patient Name"
          value={lab.patientName}
          onChange={handleChange}
          required
        />

        <input
          name="doctorName"
          placeholder="Doctor Name"
          value={lab.doctorName}
          onChange={handleChange}
          required
        />

        <input
          name="testName"
          placeholder="Test Name"
          value={lab.testName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="testDate"
          value={lab.testDate}
          onChange={handleChange}
          required
        />

        <input
          name="result"
          placeholder="Result"
          value={lab.result}
          onChange={handleChange}
        />

        <button>Add Test</button>
      </form>
    </div>
  );
};

export default LabForm;