import React, { useEffect, useState } from "react";

const AnalyticsDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [bills, setBills] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const p = await fetch("http://localhost:5000/patients");
    const b = await fetch("http://localhost:5000/bills");
    const a = await fetch("http://localhost:5000/appointments");

    setPatients(await p.json());
    setBills(await b.json());
    setAppointments(await a.json());
  };

  const maleCount = patients.filter(
    (p) => p.gender?.toLowerCase() === "male"
  ).length;

  const femaleCount = patients.filter(
    (p) => p.gender?.toLowerCase() === "female"
  ).length;

  const paidRevenue = bills
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + Number(b.totalAmount), 0);

  const pendingBills = bills.filter((b) => b.paymentStatus === "Pending").length;

  const completedAppointments = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  const pendingAppointments = appointments.filter(
    (a) => a.status !== "Completed"
  ).length;

  return (
    <div className="card">
      <h2>Hospital Analytics</h2>

      <div className="dashboard">
        <div className="dash-card">
          <h3>Male Patients</h3>
          <p>{maleCount}</p>
        </div>

        <div className="dash-card">
          <h3>Female Patients</h3>
          <p>{femaleCount}</p>
        </div>

        <div className="dash-card">
          <h3>Paid Revenue</h3>
          <p>₹{paidRevenue}</p>
        </div>

        <div className="dash-card">
          <h3>Pending Bills</h3>
          <p>{pendingBills}</p>
        </div>

        <div className="dash-card">
          <h3>Completed Appointments</h3>
          <p>{completedAppointments}</p>
        </div>

        <div className="dash-card">
          <h3>Pending Appointments</h3>
          <p>{pendingAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;