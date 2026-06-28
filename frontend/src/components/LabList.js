import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const LabList = ({ role }) => {
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTests = async () => {
    const res = await fetch("http://localhost:5000/laboratory");
    const data = await res.json();
    setTests(data);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const downloadPDF = async (item) => {
    const input = document.getElementById(`report-${item._id}`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
    pdf.save(`${item.patientName}_LabReport.pdf`);
  };

  const markCompleted = async (item) => {
    await fetch(`http://localhost:5000/laboratory/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, status: "Completed" }),
    });

    alert("Lab report marked as completed");
    fetchTests();
  };

  const deleteTest = async (id) => {
    await fetch(`http://localhost:5000/laboratory/${id}`, {
      method: "DELETE",
    });

    alert("Lab report deleted");
    fetchTests();
  };

  const filtered =
    role === "Citizen"
      ? search.trim() === ""
        ? []
        : tests.filter(
            (item) =>
              item.status === "Completed" &&
              (item.patientName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
                item.doctorName
                  ?.toLowerCase()
                  .includes(search.toLowerCase()) ||
                item.testName
                  ?.toLowerCase()
                  .includes(search.toLowerCase()) ||
                item.status?.toLowerCase().includes(search.toLowerCase()))
          )
      : search.trim() === ""
      ? tests
      : tests.filter(
          (item) =>
            item.patientName?.toLowerCase().includes(search.toLowerCase()) ||
            item.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
            item.testName?.toLowerCase().includes(search.toLowerCase()) ||
            item.status?.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="card">
      <h2>
        {role === "Citizen"
          ? "Search Laboratory Report"
          : "Laboratory Test Details"}
      </h2>

      <input
        type="text"
        placeholder="Search by Patient, Doctor, Test or Status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {role === "Citizen" && search.trim() === "" && (
        <p>Enter patient name or test name to view completed lab report.</p>
      )}

      {search.trim() !== "" && filtered.length === 0 && (
        <p>
          {role === "Citizen"
            ? "No completed lab report found"
            : "No lab report found"}
        </p>
      )}

      {filtered.map((item) => (
        <div className="list-box" key={item._id}>
          <div id={`report-${item._id}`}>
            <h3>Lab Report</h3>

            <p>
              <b>Patient:</b> {item.patientName}
            </p>

            <p>
              <b>Doctor:</b> {item.doctorName}
            </p>

            <p>
              <b>Test:</b> {item.testName}
            </p>

            <p>
              <b>Date:</b> {item.testDate}
            </p>

            <p>
              <b>Result:</b> {item.result || "Not updated"}
            </p>

            <p>
              <b>Status:</b> {item.status || "Pending"}
            </p>
          </div>

          <button onClick={() => downloadPDF(item)}>Download PDF</button>

          {(role === "Admin" || role === "Doctor") &&
            item.status !== "Completed" && (
              <button onClick={() => markCompleted(item)}>
                Mark Completed
              </button>
            )}

          {role === "Admin" && (
            <button onClick={() => deleteTest(item._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default LabList;