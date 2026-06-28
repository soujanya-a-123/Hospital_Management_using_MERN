import React, { useEffect, useState } from "react";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMedicines = async () => {
    const res = await fetch("http://localhost:5000/medicines");
    const data = await res.json();
    setMedicines(data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const deleteMedicine = async (id) => {
    await fetch(`http://localhost:5000/medicines/${id}`, {
      method: "DELETE",
    });

    fetchMedicines();
  };

  const reduceStock = async (m) => {
    if (Number(m.quantity) <= 0) {
      alert("Out of stock");
      return;
    }

    await fetch(`http://localhost:5000/medicines/${m._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...m, quantity: Number(m.quantity) - 1 }),
    });

    fetchMedicines();
  };

  const isExpired = (date) => {
    return new Date(date) < new Date();
  };

  const isExpiringSoon = (date) => {
    const today = new Date();
    const expiry = new Date(date);
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  };

  const filteredMedicines = medicines.filter((m) =>
    m.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Medicine Inventory</h2>

      <input
        placeholder="Search medicine"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredMedicines.length === 0 ? (
        <p>No medicines found</p>
      ) : (
        filteredMedicines.map((m) => (
          <div className="list-box" key={m._id}>
            <p><b>Medicine:</b> {m.medicineName}</p>
            <p><b>Category:</b> {m.category}</p>
            <p><b>Quantity:</b> {m.quantity}</p>
            <p><b>Expiry Date:</b> {m.expiryDate}</p>
            <p><b>Price:</b> ₹{m.price}</p>

            {Number(m.quantity) <= 2 && (
              <p className="alert-text">Low Stock Alert</p>
            )}

            {isExpired(m.expiryDate) && (
              <p className="danger-text">Expired Medicine</p>
            )}

            {isExpiringSoon(m.expiryDate) && (
              <p className="warning-text">Expiring Soon</p>
            )}

            <button onClick={() => reduceStock(m)}>Use 1 Stock</button>
            <button onClick={() => deleteMedicine(m._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MedicineList;