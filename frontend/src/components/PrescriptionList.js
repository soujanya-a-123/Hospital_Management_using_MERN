import React, { useEffect, useState } from "react";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    const res = await fetch("http://localhost:5000/prescriptions");
    const data = await res.json();
    setPrescriptions(data);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const deletePrescription = async (id) => {
    await fetch(`http://localhost:5000/prescriptions/${id}`, {
      method: "DELETE",
    });

    fetchPrescriptions();
  };

  const printPrescription = (p) => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription</title>
          <style>
            body { font-family: Arial; padding: 30px; }
            h2 { text-align: center; color: #007fa8; }
            .box { border: 1px solid #333; padding: 20px; margin-top: 20px; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h2>Hospital Prescription</h2>
          <div class="box">
            <p><b>Patient:</b> ${p.patientName}</p>
            <p><b>Doctor:</b> ${p.doctorName}</p>
            <p><b>Medicine:</b> ${p.medicineName}</p>
            <p><b>Dosage:</b> ${p.dosage}</p>
            <p><b>Days:</b> ${p.days}</p>
            <p><b>Notes:</b> ${p.notes}</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="card">
      <h2>Prescription List</h2>

      {prescriptions.length === 0 ? (
        <p>No prescriptions found</p>
      ) : (
        prescriptions.map((p) => (
          <div className="list-box" key={p._id}>
            <p><b>Patient:</b> {p.patientName}</p>
            <p><b>Doctor:</b> {p.doctorName}</p>
            <p><b>Medicine:</b> {p.medicineName}</p>
            <p><b>Dosage:</b> {p.dosage}</p>
            <p><b>Days:</b> {p.days}</p>
            <p><b>Notes:</b> {p.notes}</p>

            <button onClick={() => printPrescription(p)}>Print Prescription</button>
            <button onClick={() => deletePrescription(p._id)}>Delete Prescription</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PrescriptionList;