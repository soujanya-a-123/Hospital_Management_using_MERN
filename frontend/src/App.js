import React, { useState } from "react";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import DoctorForm from "./components/DoctorForm";
import DoctorList from "./components/DoctorList";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
import PrescriptionForm from "./components/PrescriptionForm";
import PrescriptionList from "./components/PrescriptionList";
import BillForm from "./components/BillForm";
import BillList from "./components/BillList";
import RoomForm from "./components/RoomForm";
import RoomList from "./components/RoomList";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import DischargeForm from "./components/DischargeForm";
import DischargeList from "./components/DischargeList";
import MedicineForm from "./components/MedicineForm";
import MedicineList from "./components/MedicineList";
import PatientReport from "./components/PatientReport";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import Alerts from "./components/Alerts";
import EmergencyHelp from "./components/EmergencyHelp";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import LabForm from "./components/LabForm";
import LabList from "./components/LabList";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [role, setRole] = useState(localStorage.getItem("role") || "");

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />;
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    setActiveTab("dashboard");
  };

  const isCitizen = role === "Citizen";

  return (
    <div className="container">
      <div className="header">
        <h1>Unified Hospital Management System</h1>

        <p className="subHeading">
          Smart Digital Platform for Patient Care, Hospital Services,
          Laboratory Management, Appointments, Reports and Healthcare
          Communication
        </p>

        <p className="roleText">Logged in as: {role}</p>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      {isCitizen ? (
        <>
          <div className="tabs">
            <button
              className={activeTab === "emergency" ? "active" : ""}
              onClick={() => setActiveTab("emergency")}
            >
              Emergency Help
            </button>

            <button
              className={activeTab === "feedback" ? "active" : ""}
              onClick={() => setActiveTab("feedback")}
            >
              Feedback
            </button>

            <button
              className={activeTab === "laboratory" ? "active" : ""}
              onClick={() => setActiveTab("laboratory")}
            >
              Laboratory
            </button>
          </div>

          {activeTab === "dashboard" && <EmergencyHelp />}
          {activeTab === "emergency" && <EmergencyHelp />}
          {activeTab === "feedback" && <FeedbackForm />}
          {activeTab === "laboratory" && <LabList role={role} />}
        </>
      ) : (
        <>
          <div className="tabs">
            <button
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>

            {(role === "Admin" ||
              role === "Doctor" ||
              role === "Receptionist") && (
              <button
                className={activeTab === "patients" ? "active" : ""}
                onClick={() => setActiveTab("patients")}
              >
                Patients
              </button>
            )}

            {(role === "Admin" || role === "Receptionist") && (
              <button
                className={activeTab === "doctors" ? "active" : ""}
                onClick={() => setActiveTab("doctors")}
              >
                Doctors
              </button>
            )}

            {(role === "Admin" ||
              role === "Doctor" ||
              role === "Receptionist") && (
              <button
                className={activeTab === "appointments" ? "active" : ""}
                onClick={() => setActiveTab("appointments")}
              >
                Appointments
              </button>
            )}

            {(role === "Admin" || role === "Doctor") && (
              <button
                className={activeTab === "prescriptions" ? "active" : ""}
                onClick={() => setActiveTab("prescriptions")}
              >
                Prescriptions
              </button>
            )}

            {(role === "Admin" || role === "Receptionist") && (
              <button
                className={activeTab === "billing" ? "active" : ""}
                onClick={() => setActiveTab("billing")}
              >
                Billing
              </button>
            )}

            {(role === "Admin" || role === "Receptionist") && (
              <button
                className={activeTab === "rooms" ? "active" : ""}
                onClick={() => setActiveTab("rooms")}
              >
                Rooms
              </button>
            )}

            {(role === "Admin" || role === "Doctor") && (
              <button
                className={activeTab === "discharge" ? "active" : ""}
                onClick={() => setActiveTab("discharge")}
              >
                Discharge
              </button>
            )}

            {role === "Admin" && (
              <button
                className={activeTab === "medicines" ? "active" : ""}
                onClick={() => setActiveTab("medicines")}
              >
                Medicines
              </button>
            )}

            {(role === "Admin" ||
              role === "Doctor" ||
              role === "Receptionist") && (
              <button
                className={activeTab === "laboratory" ? "active" : ""}
                onClick={() => setActiveTab("laboratory")}
              >
                Laboratory
              </button>
            )}

            {(role === "Admin" ||
              role === "Doctor" ||
              role === "Receptionist") && (
              <button
                className={activeTab === "report" ? "active" : ""}
                onClick={() => setActiveTab("report")}
              >
                Patient Report
              </button>
            )}

            {role === "Admin" && (
              <button
                className={activeTab === "analytics" ? "active" : ""}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </button>
            )}

            {role === "Admin" && (
              <button
                className={activeTab === "alerts" ? "active" : ""}
                onClick={() => setActiveTab("alerts")}
              >
                Alerts
              </button>
            )}

            {role === "Admin" && (
              <button
                className={activeTab === "feedbackList" ? "active" : ""}
                onClick={() => setActiveTab("feedbackList")}
              >
                Feedback List
              </button>
            )}
          </div>

          {activeTab === "dashboard" && <Dashboard />}

          {activeTab === "patients" && (
            <>
              <PatientForm />
              <PatientList />
            </>
          )}

          {activeTab === "doctors" && (
            <>
              {role === "Admin" && <DoctorForm />}
              <DoctorList role={role} />
            </>
          )}

          {activeTab === "appointments" && (
            <>
              <AppointmentForm />
              <AppointmentList />
            </>
          )}

          {activeTab === "prescriptions" &&
            (role === "Admin" || role === "Doctor") && (
              <>
                <PrescriptionForm />
                <PrescriptionList />
              </>
            )}

          {activeTab === "billing" &&
            (role === "Admin" || role === "Receptionist") && (
              <>
                <BillForm />
                <BillList />
              </>
            )}

          {activeTab === "rooms" &&
            (role === "Admin" || role === "Receptionist") && (
              <>
                <RoomForm />
                <RoomList />
              </>
            )}

          {activeTab === "discharge" &&
            (role === "Admin" || role === "Doctor") && (
              <>
                <DischargeForm />
                <DischargeList />
              </>
            )}

          {activeTab === "medicines" && role === "Admin" && (
            <>
              <MedicineForm />
              <MedicineList />
            </>
          )}

          {activeTab === "laboratory" && (
            <>
              {(role === "Admin" || role === "Receptionist") && <LabForm />}
              <LabList role={role} />
            </>
          )}

          {activeTab === "report" && <PatientReport />}

          {activeTab === "analytics" && role === "Admin" && (
            <AnalyticsDashboard />
          )}

          {activeTab === "alerts" && role === "Admin" && <Alerts />}

          {activeTab === "feedbackList" && role === "Admin" && (
            <FeedbackList />
          )}
        </>
      )}
    </div>
  );
}

export default App;