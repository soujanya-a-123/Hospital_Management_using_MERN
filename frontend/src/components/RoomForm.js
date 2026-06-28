import React, { useState } from "react";

const RoomForm = () => {
  const [room, setRoom] = useState({
    roomNumber: "",
    bedNumber: "",
    patientName: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const addRoom = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });

    alert("Room added successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Room / Bed</h2>

      <form onSubmit={addRoom}>
        <input name="roomNumber" placeholder="Room Number" value={room.roomNumber} onChange={handleChange} required />
        <input name="bedNumber" placeholder="Bed Number" value={room.bedNumber} onChange={handleChange} required />
        <input name="patientName" placeholder="Patient Name" value={room.patientName} onChange={handleChange} />

        <select name="status" value={room.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </select>

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default RoomForm;