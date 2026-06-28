const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/hospital")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

/* EMAIL SETUP */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soujanya.sait123@gmail.com",
    pass: "tppcyvstrthhrugb",
  },
});

/* SCHEMAS */

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    disease: String,
    contact: String,
    email: String,
  })
);

const Doctor = mongoose.model(
  "Doctor",
  new mongoose.Schema({
    name: String,
    specialization: String,
    phone: String,
    availableTime: String,
  })
);

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
    patientName: String,
    doctorName: String,
    date: String,
    time: String,
    reason: String,
    status: { type: String, default: "Pending" },
  })
);

const Prescription = mongoose.model(
  "Prescription",
  new mongoose.Schema({
    patientName: String,
    doctorName: String,
    medicineName: String,
    dosage: String,
    days: String,
    notes: String,
  })
);

const Bill = mongoose.model(
  "Bill",
  new mongoose.Schema({
    patientName: String,
    consultationFee: Number,
    medicineFee: Number,
    roomFee: Number,
    totalAmount: Number,
    paymentStatus: String,
  })
);

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    roomNumber: String,
    bedNumber: String,
    patientName: String,
    status: String,
  })
);

const Discharge = mongoose.model(
  "Discharge",
  new mongoose.Schema({
    patientName: String,
    doctorName: String,
    diagnosis: String,
    treatment: String,
    admissionDate: String,
    dischargeDate: String,
    advice: String,
  })
);

const Medicine = mongoose.model(
  "Medicine",
  new mongoose.Schema({
    medicineName: String,
    category: String,
    quantity: Number,
    expiryDate: String,
    price: Number,
  })
);

const Laboratory = mongoose.model(
  "Laboratory",
  new mongoose.Schema({
    patientName: String,
    doctorName: String,
    testName: String,
    testDate: String,
    result: String,
    status: { type: String, default: "Pending" },
  })
);

const Citizen = mongoose.model(
  "Citizen",
  new mongoose.Schema({
    username: String,
    email: String,
  })
);

const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema({
    name: String,
    email: String,
    rating: Number,
    message: String,
    date: { type: Date, default: Date.now },
  })
);

/* PATIENT ROUTES */

app.post("/patients", async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json(patient);
});

app.get("/patients", async (req, res) => {
  res.json(await Patient.find());
});

app.put("/patients/:id", async (req, res) => {
  res.json(
    await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

app.delete("/patients/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient deleted" });
});

/* DOCTOR ROUTES */

app.post("/doctors", async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.json(doctor);
});

app.get("/doctors", async (req, res) => {
  res.json(await Doctor.find());
});

app.put("/doctors/:id", async (req, res) => {
  res.json(
    await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

app.delete("/doctors/:id", async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor deleted" });
});

/* APPOINTMENT ROUTES WITH EMAIL */

app.post("/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    const patient = await Patient.findOne({
      name: { $regex: req.body.patientName, $options: "i" },
    });

    console.log("Found patient for appointment:", patient);

    if (patient && patient.email) {
      const info = await transporter.sendMail({
        from: "soujanya.sait123@gmail.com",
        to: patient.email,
        subject: "Appointment Confirmation",
        html: `
          <h2>Appointment Confirmed</h2>
          <p>Hello ${appointment.patientName},</p>
          <p>Your appointment has been booked successfully.</p>
          <p><b>Doctor:</b> ${appointment.doctorName}</p>
          <p><b>Date:</b> ${appointment.date}</p>
          <p><b>Time:</b> ${appointment.time}</p>
          <p><b>Reason:</b> ${appointment.reason}</p>
          <p><b>Status:</b> ${appointment.status}</p>
          <br/>
          <p>Regards,<br/>Hospital Management System</p>
        `,
      });

      console.log("Appointment email sent:", info.response);
    } else {
      console.log("Patient email not found. Appointment email not sent.");
    }

    res.json(appointment);
  } catch (error) {
    console.log("Appointment email error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/appointments", async (req, res) => {
  res.json(await Appointment.find());
});

app.put("/appointments/:id", async (req, res) => {
  res.json(
    await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

app.delete("/appointments/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment deleted" });
});

/* PRESCRIPTION ROUTES */

app.post("/prescriptions", async (req, res) => {
  const prescription = new Prescription(req.body);
  await prescription.save();
  res.json(prescription);
});

app.get("/prescriptions", async (req, res) => {
  res.json(await Prescription.find());
});

app.delete("/prescriptions/:id", async (req, res) => {
  await Prescription.findByIdAndDelete(req.params.id);
  res.json({ message: "Prescription deleted" });
});

/* BILL ROUTES */

app.post("/bills", async (req, res) => {
  const bill = new Bill(req.body);
  await bill.save();
  res.json(bill);
});

app.get("/bills", async (req, res) => {
  res.json(await Bill.find());
});

app.put("/bills/:id", async (req, res) => {
  res.json(await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/bills/:id", async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.json({ message: "Bill deleted" });
});

/* ROOM ROUTES */

app.post("/rooms", async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.json(room);
});

app.get("/rooms", async (req, res) => {
  res.json(await Room.find());
});

app.put("/rooms/:id", async (req, res) => {
  res.json(await Room.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/rooms/:id", async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Room deleted" });
});

/* DISCHARGE ROUTES */

app.post("/discharges", async (req, res) => {
  const discharge = new Discharge(req.body);
  await discharge.save();
  res.json(discharge);
});

app.get("/discharges", async (req, res) => {
  res.json(await Discharge.find());
});

app.delete("/discharges/:id", async (req, res) => {
  await Discharge.findByIdAndDelete(req.params.id);
  res.json({ message: "Discharge deleted" });
});

/* MEDICINE ROUTES */

app.post("/medicines", async (req, res) => {
  const medicine = new Medicine(req.body);
  await medicine.save();
  res.json(medicine);
});

app.get("/medicines", async (req, res) => {
  res.json(await Medicine.find());
});

app.put("/medicines/:id", async (req, res) => {
  res.json(
    await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

app.delete("/medicines/:id", async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.json({ message: "Medicine deleted" });
});

/* LABORATORY ROUTES WITH EMAIL */

app.post("/laboratory", async (req, res) => {
  const lab = new Laboratory(req.body);
  await lab.save();
  res.json(lab);
});

app.get("/laboratory", async (req, res) => {
  res.json(await Laboratory.find());
});

app.put("/laboratory/:id", async (req, res) => {
  try {
    const updatedLab = await Laboratory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedLab.status === "Completed") {
      const patient = await Patient.findOne({
        name: { $regex: updatedLab.patientName, $options: "i" },
      });

      console.log("Found patient for lab report:", patient);

      if (patient && patient.email) {
        const info = await transporter.sendMail({
          from: "soujanya.sait123@gmail.com",
          to: patient.email,
          subject: "Lab Report Ready",
          html: `
            <h2>Lab Report Ready</h2>
            <p>Hello ${updatedLab.patientName},</p>
            <p>Your laboratory report is completed and ready to download.</p>
            <p><b>Doctor:</b> ${updatedLab.doctorName}</p>
            <p><b>Test Name:</b> ${updatedLab.testName}</p>
            <p><b>Date:</b> ${updatedLab.testDate}</p>
            <p><b>Status:</b> ${updatedLab.status}</p>
            <br/>
            <p>Please login to the Citizen portal and download your report.</p>
            <p>Regards,<br/>Hospital Management System</p>
          `,
        });

        console.log("Lab report email sent:", info.response);
      } else {
        console.log("Patient email not found. Lab email not sent.");
      }
    }

    res.json(updatedLab);
  } catch (error) {
    console.log("Lab email error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/laboratory/:id", async (req, res) => {
  await Laboratory.findByIdAndDelete(req.params.id);
  res.json({ message: "Lab test deleted" });
});

/* CITIZEN LOGIN / REGISTER */

app.post("/citizen-register", async (req, res) => {
  const { username, email } = req.body;

  const existing = await Citizen.findOne({
    $or: [{ username }, { email }],
  });

  if (existing) {
    return res.status(400).json({
      message: "Username or email already exists",
    });
  }

  const citizen = new Citizen({ username, email });
  await citizen.save();

  res.json({ message: "Citizen registered successfully" });
});

app.post("/citizen-login", async (req, res) => {
  const { username, email } = req.body;

  const citizen = await Citizen.findOne({ username, email });

  if (!citizen) {
    return res.status(400).json({
      message: "Invalid username or email",
    });
  }

  res.json({
    message: "Citizen login successful",
    citizenName: citizen.username,
  });
});

/* FEEDBACK ROUTES WITH EMAIL */

app.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback({
      name: req.body.name,
      email: req.body.email,
      rating: Number(req.body.rating),
      message: req.body.message,
    });

    await feedback.save();

    if (feedback.email) {
      const info = await transporter.sendMail({
        from: "soujanya.sait123@gmail.com",
        to: feedback.email,
        subject: "Feedback Received - Hospital Management System",
        html: `
          <h2>Feedback Received</h2>
          <p>Hello ${feedback.name},</p>
          <p>Thank you for sharing your feedback with us.</p>
          <p><b>Your Rating:</b> ${feedback.rating}/5</p>
          <p><b>Your Message:</b> ${feedback.message}</p>
          <br/>
          <p>We appreciate your response.</p>
          <p>Regards,<br/>Hospital Management System</p>
        `,
      });

      console.log("Feedback email sent:", info.response);
    }

    res.json(feedback);
  } catch (error) {
    console.log("Feedback email error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/feedback", async (req, res) => {
  res.json(await Feedback.find().sort({ date: -1 }));
});

/* PATIENT FULL REPORT */

app.get("/patient-report/:name", async (req, res) => {
  const name = req.params.name;

  const patient = await Patient.findOne({
    name: { $regex: name, $options: "i" },
  });

  const appointments = await Appointment.find({
    patientName: { $regex: name, $options: "i" },
  });

  const prescriptions = await Prescription.find({
    patientName: { $regex: name, $options: "i" },
  });

  const bills = await Bill.find({
    patientName: { $regex: name, $options: "i" },
  });

  const discharges = await Discharge.find({
    patientName: { $regex: name, $options: "i" },
  });

  const labReports = await Laboratory.find({
    patientName: { $regex: name, $options: "i" },
  });

  res.json({
    patient,
    appointments,
    prescriptions,
    bills,
    discharges,
    labReports,
  });
});

/* DASHBOARD */

app.get("/dashboard", async (req, res) => {
  const bills = await Bill.find();

  const totalRevenue = bills
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + Number(b.totalAmount), 0);

  const paidBills = bills.filter((b) => b.paymentStatus === "Paid").length;
  const pendingBills = bills.filter((b) => b.paymentStatus === "Pending").length;

  res.json({
    totalPatients: await Patient.countDocuments(),
    totalDoctors: await Doctor.countDocuments(),
    totalAppointments: await Appointment.countDocuments(),
    totalPrescriptions: await Prescription.countDocuments(),
    totalBills: await Bill.countDocuments(),
    totalRooms: await Room.countDocuments(),
    totalDischarges: await Discharge.countDocuments(),
    totalMedicines: await Medicine.countDocuments(),
    totalLabTests: await Laboratory.countDocuments(),
    totalRevenue,
    paidBills,
    pendingBills,
    totalFeedbacks: await Feedback.countDocuments(),
  });
});

/* START SERVER */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});