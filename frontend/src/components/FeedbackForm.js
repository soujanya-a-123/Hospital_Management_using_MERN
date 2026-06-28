import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: feedback.name,
        email: feedback.email,
        rating: Number(feedback.rating),
        message: feedback.message,
      }),
    });

    if (res.ok) {
      alert("Feedback submitted successfully. Email sent.");

      setFeedback({
        name: "",
        email: "",
        rating: "",
        message: "",
      });
    } else {
      alert("Feedback not submitted");
    }
  };

  return (
    <div className="card">
      <h2>Patient Feedback</h2>

      <form onSubmit={submitFeedback}>
        <input
          name="name"
          placeholder="Your Name"
          value={feedback.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={feedback.email}
          onChange={handleChange}
          required
        />

        <select
          name="rating"
          value={feedback.rating}
          onChange={handleChange}
          required
        >
          <option value="">Select Rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Very Poor</option>
        </select>

        <input
          name="message"
          placeholder="Write your feedback"
          value={feedback.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;