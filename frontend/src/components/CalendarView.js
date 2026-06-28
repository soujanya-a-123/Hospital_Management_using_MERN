import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const selectedDate = date.toISOString().split("T")[0];

  const filteredAppointments = appointments.filter(
    (a) => a.date === selectedDate
  );

  return (
    <div className="card">
      <h2>Appointment Calendar</h2>

      <Calendar onChange={setDate} value={date} />

      <h3>Appointments on {selectedDate}</h3>

      {filteredAppointments.length === 0 ? (
        <p>No appointments on this date</p>
      ) : (
        filteredAppointments.map((a) => (
          <div className="list-box" key={a._id}>
            <p><b>Patient:</b> {a.patientName}</p>
            <p><b>Doctor:</b> {a.doctorName}</p>
            <p><b>Time:</b> {a.time}</p>
            <p><b>Reason:</b> {a.reason}</p>
            <p><b>Status:</b> {a.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CalendarView;