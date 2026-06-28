import React, { useEffect, useState } from "react";

const ChatbotHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:5000/chatbot-history");
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="card">
      <h2>Chatbot Query History</h2>

      {history.length === 0 ? (
        <p>No chatbot history found</p>
      ) : (
        history.map((h) => (
          <div className="list-box" key={h._id}>
            <p><b>Question:</b> {h.question}</p>
            <p><b>Answer:</b> {h.answer}</p>
            <p><b>Date:</b> {new Date(h.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatbotHistory;