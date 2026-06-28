import React, { useEffect, useState } from "react";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "DELETE",
    });

    fetchAppointments();
  };

  const markCompleted = async (id) => {
    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" }),
    });

    fetchAppointments();
  };

  const filteredAppointments = appointments.filter((a) =>
    a.patientName.toLowerCase().includes(search.toLowerCase()) ||
    a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
    a.date.includes(search) ||
    a.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Appointment List</h2>

      <input
        placeholder="Search by patient, doctor, date or status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredAppointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        filteredAppointments.map((a) => (
          <div className="list-box" key={a._id}>
            <p><b>Patient:</b> {a.patientName}</p>
            <p><b>Doctor:</b> {a.doctorName}</p>
            <p><b>Date:</b> {a.date}</p>
            <p><b>Time:</b> {a.time}</p>
            <p><b>Reason:</b> {a.reason}</p>
            <p><b>Status:</b> {a.status}</p>

            {a.status !== "Completed" && (
              <button onClick={() => markCompleted(a._id)}>
                Mark Completed
              </button>
            )}

            <button onClick={() => deleteAppointment(a._id)}>
              Cancel Appointment
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentList;