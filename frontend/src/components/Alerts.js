import React, { useEffect, useState } from "react";

const Alerts = () => {
  const [medicines, setMedicines] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const m = await fetch("http://localhost:5000/medicines");
    const r = await fetch("http://localhost:5000/rooms");

    setMedicines(await m.json());
    setRooms(await r.json());
  };

  const lowStock = medicines.filter((m) => Number(m.quantity) <= 5);
  const availableRooms = rooms.filter((r) => r.status === "Available");

  return (
    <div className="card">
      <h2>Notifications & Alerts</h2>

      {lowStock.length === 0 ? (
        <p>No low stock medicines</p>
      ) : (
        lowStock.map((m) => (
          <p className="alert-text" key={m._id}>
            Low Stock: {m.medicineName} only {m.quantity} left
          </p>
        ))
      )}

      {availableRooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        availableRooms.map((r) => (
          <p className="warning-text" key={r._id}>
            Room Available: Room {r.roomNumber}, Bed {r.bedNumber}
          </p>
        ))
      )}
    </div>
  );
};

export default Alerts;