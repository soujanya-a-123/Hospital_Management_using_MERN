import React, { useEffect, useState } from "react";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const res = await fetch("http://localhost:5000/rooms");
    const data = await res.json();
    setRooms(data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const deleteRoom = async (id) => {
    await fetch(`http://localhost:5000/rooms/${id}`, {
      method: "DELETE",
    });
    fetchRooms();
  };

  const changeStatus = async (room) => {
    const newStatus = room.status === "Available" ? "Occupied" : "Available";

    await fetch(`http://localhost:5000/rooms/${room._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...room, status: newStatus }),
    });

    fetchRooms();
  };

  return (
    <div className="card">
      <h2>Room / Bed List</h2>

      {rooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        rooms.map((r) => (
          <div className="list-box" key={r._id}>
            <p><b>Room Number:</b> {r.roomNumber}</p>
            <p><b>Bed Number:</b> {r.bedNumber}</p>
            <p><b>Patient Name:</b> {r.patientName || "None"}</p>
            <p><b>Status:</b> {r.status}</p>

            <button onClick={() => changeStatus(r)}>Change Status</button>
            <button onClick={() => deleteRoom(r._id)}>Delete Room</button>
          </div>
        ))
      )}
    </div>
  );
};

export default RoomList;