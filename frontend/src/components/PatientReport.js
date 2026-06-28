import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PatientReport = () => {
  const [name, setName] = useState("");
  const [report, setReport] = useState(null);

  const fetchReport = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/patient-report/${name}`);
    const data = await res.json();
    setReport(data);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("patient-report");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${name}_patient_report.pdf`);
  };

  return (
    <div className="card">
      <h2>Patient Full Report</h2>

      <form onSubmit={fetchReport}>
        <input
          placeholder="Enter Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">Search Report</button>
      </form>

      {report && (
        <>
          <div className="report-box" id="patient-report">
            <h2>Hospital Patient Report</h2>

            <h3>Patient Details</h3>

            {report.patient ? (
              <>
                <p><b>Name:</b> {report.patient.name}</p>
                <p><b>Age:</b> {report.patient.age}</p>
                <p><b>Gender:</b> {report.patient.gender}</p>
                <p><b>Disease:</b> {report.patient.disease}</p>
                <p><b>Contact:</b> {report.patient.contact}</p>
              </>
            ) : (
              <p>No patient found</p>
            )}

            <h3>Appointments</h3>
            {report.appointments.length === 0 ? (
              <p>No appointments found</p>
            ) : (
              report.appointments.map((a) => (
                <div className="list-box" key={a._id}>
                  <p><b>Doctor:</b> {a.doctorName}</p>
                  <p><b>Date:</b> {a.date}</p>
                  <p><b>Time:</b> {a.time}</p>
                  <p><b>Reason:</b> {a.reason}</p>
                  <p><b>Status:</b> {a.status}</p>
                </div>
              ))
            )}

            <h3>Prescriptions</h3>
            {report.prescriptions.length === 0 ? (
              <p>No prescriptions found</p>
            ) : (
              report.prescriptions.map((p) => (
                <div className="list-box" key={p._id}>
                  <p><b>Doctor:</b> {p.doctorName}</p>
                  <p><b>Medicine:</b> {p.medicineName}</p>
                  <p><b>Dosage:</b> {p.dosage}</p>
                  <p><b>Days:</b> {p.days}</p>
                  <p><b>Notes:</b> {p.notes}</p>
                </div>
              ))
            )}

            <h3>Bills</h3>
            {report.bills.length === 0 ? (
              <p>No bills found</p>
            ) : (
              report.bills.map((b) => (
                <div className="list-box" key={b._id}>
                  <p><b>Consultation Fee:</b> ₹{b.consultationFee}</p>
                  <p><b>Medicine Fee:</b> ₹{b.medicineFee}</p>
                  <p><b>Room Fee:</b> ₹{b.roomFee}</p>
                  <p><b>Total Amount:</b> ₹{b.totalAmount}</p>
                  <p><b>Status:</b> {b.paymentStatus}</p>
                </div>
              ))
            )}

            <h3>Discharge Summary</h3>
            {report.discharges.length === 0 ? (
              <p>No discharge summary found</p>
            ) : (
              report.discharges.map((d) => (
                <div className="list-box" key={d._id}>
                  <p><b>Doctor:</b> {d.doctorName}</p>
                  <p><b>Diagnosis:</b> {d.diagnosis}</p>
                  <p><b>Treatment:</b> {d.treatment}</p>
                  <p><b>Admission Date:</b> {d.admissionDate}</p>
                  <p><b>Discharge Date:</b> {d.dischargeDate}</p>
                  <p><b>Advice:</b> {d.advice}</p>
                </div>
              ))
            )}
          </div>

          <button onClick={downloadPDF}>Download PDF</button>
        </>
      )}
    </div>
  );
};

export default PatientReport;