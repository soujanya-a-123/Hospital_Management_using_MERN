const Patient = require('../models/patientModel');

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      disease: req.body.disease,
    });

    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
