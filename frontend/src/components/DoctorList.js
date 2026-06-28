import React, { useEffect, useState } from "react";

const DoctorList = ({ role }) => {
  const [doctors, setDoctors] = useState([]);
  const [editDoctor, setEditDoctor] = useState(null);

  const fetchDoctors = async () => {
    const res = await fetch("http://localhost:5000/doctors");
    const data = await res.json();
    setDoctors(data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const deleteDoctor = async (id) => {
    await fetch(`http://localhost:5000/doctors/${id}`, {
      method: "DELETE",
    });

    fetchDoctors();
  };

  const updateDoctor = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/doctors/${editDoctor._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editDoctor),
    });

    alert("Doctor updated successfully");
    setEditDoctor(null);
    fetchDoctors();
  };

  return (
    <div className="card">
      <h2>Doctor List</h2>

      {role === "Admin" && editDoctor && (
        <form onSubmit={updateDoctor} className="edit-box">
          <h3>Edit Doctor</h3>

          <input
            value={editDoctor.name}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, name: e.target.value })
            }
          />

          <input
            value={editDoctor.specialization}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, specialization: e.target.value })
            }
          />

          <input
            value={editDoctor.phone}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, phone: e.target.value })
            }
          />

          <input
            value={editDoctor.availableTime}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, availableTime: e.target.value })
            }
          />

          <button type="submit">Update Doctor</button>
          <button type="button" onClick={() => setEditDoctor(null)}>
            Cancel
          </button>
        </form>
      )}

      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        doctors.map((d) => (
          <div className="list-box" key={d._id}>
            <p><b>Name:</b> {d.name}</p>
            <p><b>Specialization:</b> {d.specialization}</p>
            <p><b>Phone:</b> {d.phone}</p>
            <p><b>Available Time:</b> {d.availableTime}</p>

            {role === "Admin" && (
              <>
                <button onClick={() => setEditDoctor(d)}>Edit</button>
                <button onClick={() => deleteDoctor(d._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorList;