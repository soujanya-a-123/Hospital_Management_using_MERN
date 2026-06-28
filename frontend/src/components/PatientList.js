import React, { useEffect, useState } from "react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [editPatient, setEditPatient] = useState(null);

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:5000/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = async (id) => {
    await fetch(`http://localhost:5000/patients/${id}`, {
      method: "DELETE",
    });

    fetchPatients();
  };

  const updatePatient = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/patients/${editPatient._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPatient),
    });

    alert("Patient updated successfully");
    setEditPatient(null);
    fetchPatients();
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.disease.toLowerCase().includes(search.toLowerCase()) ||
    p.contact.includes(search)
  );

  return (
    <div className="card">
      <h2>Patient List</h2>

      <input
        placeholder="Search by name, disease or contact"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {editPatient && (
        <form onSubmit={updatePatient} className="edit-box">
          <h3>Edit Patient</h3>

          <input
            value={editPatient.name}
            onChange={(e) =>
              setEditPatient({ ...editPatient, name: e.target.value })
            }
          />

          <input
            value={editPatient.age}
            onChange={(e) =>
              setEditPatient({ ...editPatient, age: e.target.value })
            }
          />

          <input
            value={editPatient.gender}
            onChange={(e) =>
              setEditPatient({ ...editPatient, gender: e.target.value })
            }
          />

          <input
            value={editPatient.disease}
            onChange={(e) =>
              setEditPatient({ ...editPatient, disease: e.target.value })
            }
          />

          <input
            value={editPatient.contact}
            onChange={(e) =>
              setEditPatient({ ...editPatient, contact: e.target.value })
            }
          />

          <button type="submit">Update Patient</button>
          <button type="button" onClick={() => setEditPatient(null)}>
            Cancel
          </button>
        </form>
      )}

      {filteredPatients.length === 0 ? (
        <p>No patients found</p>
      ) : (
        filteredPatients.map((p) => (
          <div className="list-box" key={p._id}>
            <p><b>Name:</b> {p.name}</p>
            <p><b>Age:</b> {p.age}</p>
            <p><b>Gender:</b> {p.gender}</p>
            <p><b>Disease:</b> {p.disease}</p>
            <p><b>Contact:</b> {p.contact}</p>

            <button onClick={() => setEditPatient(p)}>Edit</button>
            <button onClick={() => deletePatient(p._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientList;