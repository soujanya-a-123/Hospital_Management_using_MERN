import React from "react";

const EmergencyHelp = () => {
  return (
    <div className="card">
      <h2>Emergency Help</h2>

      <div className="list-box">
        <h3>Ambulance</h3>
        <p><b>Emergency Number:</b> 108</p>
        <p>Call immediately for serious accidents, heart attack symptoms, breathing problems, or unconsciousness.</p>
      </div>

      <div className="list-box">
        <h3>Hospital Helpline</h3>
        <p><b>Phone:</b> 080-12345678</p>
        <p>Contact hospital reception for appointment support, room availability, and general help.</p>
      </div>

      <div className="list-box">
        <h3>Emergency Instructions</h3>
        <p>Stay calm and explain the patient condition clearly.</p>
        <p>Keep patient ID, reports, and medicine details ready.</p>
        <p>For chest pain, breathing difficulty, or heavy bleeding, do not delay medical help.</p>
      </div>
    </div>
  );
};

export default EmergencyHelp;