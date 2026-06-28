import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalPrescriptions: 0,
    totalBills: 0,
    totalRooms: 0,
    totalDischarges: 0,
    totalMedicines: 0,
    totalLabTests: 0,
  });

  const fetchDashboard = async () => {
    const res = await fetch("http://localhost:5000/dashboard");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: [
      "Patients",
      "Doctors",
      "Appointments",
      "Prescriptions",
      "Bills",
      "Rooms",
      "Discharges",
      "Medicines",
      "Lab Tests",
    ],
    datasets: [
      {
        label: "Hospital Records",
        data: [
          data.totalPatients,
          data.totalDoctors,
          data.totalAppointments,
          data.totalPrescriptions,
          data.totalBills,
          data.totalRooms,
          data.totalDischarges,
          data.totalMedicines,
          data.totalLabTests,
        ],
        backgroundColor: [
          "#00897b",
          "#1976d2",
          "#7b1fa2",
          "#f57c00",
          "#d32f2f",
          "#388e3c",
          "#5d4037",
          "#0097a7",
          "#c2185b",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#004d40",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#004d40",
          font: { size: 12, weight: "bold" },
        },
      },
      y: {
        ticks: {
          color: "#004d40",
          font: { size: 12, weight: "bold" },
        },
      },
    },
  };

  return (
    <>
      <div className="dashboard">
        <div className="dash-card">
          <h3>Total Patients</h3>
          <p>{data.totalPatients}</p>
        </div>

        <div className="dash-card">
          <h3>Total Doctors</h3>
          <p>{data.totalDoctors}</p>
        </div>

        <div className="dash-card">
          <h3>Total Appointments</h3>
          <p>{data.totalAppointments}</p>
        </div>

        <div className="dash-card">
          <h3>Total Prescriptions</h3>
          <p>{data.totalPrescriptions}</p>
        </div>

        <div className="dash-card">
          <h3>Total Bills</h3>
          <p>{data.totalBills}</p>
        </div>

        <div className="dash-card">
          <h3>Total Rooms</h3>
          <p>{data.totalRooms}</p>
        </div>

        <div className="dash-card">
          <h3>Total Discharges</h3>
          <p>{data.totalDischarges}</p>
        </div>

        <div className="dash-card">
          <h3>Total Medicines</h3>
          <p>{data.totalMedicines}</p>
        </div>

        <div className="dash-card">
          <h3>Total Lab Tests</h3>
          <p>{data.totalLabTests}</p>
        </div>
      </div>

      <div className="card chart-card">
        <h2>Hospital Data Bar Chart</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Dashboard;