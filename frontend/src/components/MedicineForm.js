import React, { useState } from "react";

const MedicineForm = () => {
  const [medicine, setMedicine] = useState({
    medicineName: "",
    category: "",
    quantity: "",
    expiryDate: "",
    price: "",
  });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const addMedicine = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/medicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicine),
    });

    alert("Medicine added successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Medicine</h2>

      <form onSubmit={addMedicine}>
        <input name="medicineName" placeholder="Medicine Name" value={medicine.medicineName} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={medicine.category} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={medicine.quantity} onChange={handleChange} required />
        <input name="expiryDate" type="date" value={medicine.expiryDate} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={medicine.price} onChange={handleChange} required />

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default MedicineForm;