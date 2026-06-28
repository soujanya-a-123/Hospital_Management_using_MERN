import React, { useState } from "react";

const BillForm = () => {
  const [bill, setBill] = useState({
    patientName: "",
    consultationFee: "",
    medicineFee: "",
    roomFee: "",
    paymentStatus: "Pending",
  });

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const addBill = async (e) => {
    e.preventDefault();

    const totalAmount =
      Number(bill.consultationFee) +
      Number(bill.medicineFee) +
      Number(bill.roomFee);

    await fetch("http://localhost:5000/bills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bill, totalAmount }),
    });

    alert("Bill added successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Create Bill</h2>

      <form onSubmit={addBill}>
        <input name="patientName" placeholder="Patient Name" value={bill.patientName} onChange={handleChange} required />
        <input name="consultationFee" type="number" placeholder="Consultation Fee" value={bill.consultationFee} onChange={handleChange} required />
        <input name="medicineFee" type="number" placeholder="Medicine Fee" value={bill.medicineFee} onChange={handleChange} required />
        <input name="roomFee" type="number" placeholder="Room Fee" value={bill.roomFee} onChange={handleChange} required />

        <select name="paymentStatus" value={bill.paymentStatus} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <button type="submit">Create Bill</button>
      </form>
    </div>
  );
};

export default BillForm;