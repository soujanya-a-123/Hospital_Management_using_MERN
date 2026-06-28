import React, { useEffect, useState } from "react";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch("http://localhost:5000/feedback");
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="card">
      <h2>Patient Feedback List</h2>

      {feedbacks.length === 0 ? (
        <p>No feedback found</p>
      ) : (
        feedbacks.map((f) => (
          <div className="list-box" key={f._id}>
            <p><b>Name:</b> {f.name}</p>
            <p><b>Email:</b> {f.email}</p>
            <p><b>Rating:</b> {f.rating}/5</p>
            <p><b>Message:</b> {f.message}</p>
            <p><b>Date:</b> {new Date(f.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;