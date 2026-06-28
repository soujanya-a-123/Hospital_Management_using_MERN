import React, { useEffect, useState } from "react";

const BillList = () => {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    const res = await fetch("http://localhost:5000/bills");
    const data = await res.json();
    setBills(data);
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const deleteBill = async (id) => {
    await fetch(`http://localhost:5000/bills/${id}`, {
      method: "DELETE",
    });

    fetchBills();
  };

  const markPaid = async (bill) => {
    await fetch(`http://localhost:5000/bills/${bill._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bill, paymentStatus: "Paid" }),
    });

    fetchBills();
  };

  return (
    <div className="card">
      <h2>Bill List</h2>

      {bills.length === 0 ? (
        <p>No bills found</p>
      ) : (
        bills.map((b) => (
          <div className="list-box" key={b._id}>
            <p><b>Patient:</b> {b.patientName}</p>
            <p><b>Consultation Fee:</b> ₹{b.consultationFee}</p>
            <p><b>Medicine Fee:</b> ₹{b.medicineFee}</p>
            <p><b>Room Fee:</b> ₹{b.roomFee}</p>
            <p><b>Total Amount:</b> ₹{b.totalAmount}</p>
            <p><b>Status:</b> {b.paymentStatus}</p>

            {b.paymentStatus !== "Paid" && (
              <button onClick={() => markPaid(b)}>Mark Paid</button>
            )}

            <button onClick={() => window.print()}>Print Bill</button>
            <button onClick={() => deleteBill(b._id)}>Delete Bill</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BillList;