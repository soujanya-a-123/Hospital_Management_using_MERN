import React, { useEffect, useState } from "react";

const DischargeList = () => {
  const [discharges, setDischarges] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDischarges = async () => {
    const res = await fetch("http://localhost:5000/discharges");
    const data = await res.json();
    setDischarges(data);
  };

  useEffect(() => {
    fetchDischarges();
  }, []);

  const deleteDischarge = async (id) => {
    await fetch(`http://localhost:5000/discharges/${id}`, {
      method: "DELETE",
    });

    fetchDischarges();
  };

  const printDischarge = (d) => {
    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <head>
          <title>Discharge Summary</title>
          <style>
            body { font-family: Arial; padding: 30px; }
            h2 { text-align: center; color: #007fa8; }
            .box { border: 1px solid #333; padding: 20px; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h2>Hospital Discharge Summary</h2>
          <div class="box">
            <p><b>Patient:</b> ${d.patientName}</p>
            <p><b>Doctor:</b> ${d.doctorName}</p>
            <p><b>Diagnosis:</b> ${d.diagnosis}</p>
            <p><b>Treatment:</b> ${d.treatment}</p>
            <p><b>Admission Date:</b> ${d.admissionDate}</p>
            <p><b>Discharge Date:</b> ${d.dischargeDate}</p>
            <p><b>Advice:</b> ${d.advice}</p>
          </div>
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  const filteredDischarges = discharges.filter((d) =>
    d.patientName.toLowerCase().includes(search.toLowerCase()) ||
    d.doctorName.toLowerCase().includes(search.toLowerCase()) ||
    d.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
    d.dischargeDate.includes(search)
  );

  return (
    <div className="card">
      <h2>Discharge Summary List</h2>

      <input
        placeholder="Search by patient, doctor, diagnosis or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredDischarges.length === 0 ? (
        <p>No discharge summaries found</p>
      ) : (
        filteredDischarges.map((d) => (
          <div className="list-box" key={d._id}>
            <p><b>Patient:</b> {d.patientName}</p>
            <p><b>Doctor:</b> {d.doctorName}</p>
            <p><b>Diagnosis:</b> {d.diagnosis}</p>
            <p><b>Treatment:</b> {d.treatment}</p>
            <p><b>Admission:</b> {d.admissionDate}</p>
            <p><b>Discharge:</b> {d.dischargeDate}</p>
            <p><b>Advice:</b> {d.advice}</p>

            <button onClick={() => printDischarge(d)}>Print</button>
            <button onClick={() => deleteDischarge(d._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default DischargeList;