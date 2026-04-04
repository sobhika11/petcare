const mongoose = require("mongoose");

// Schema for a single health/vaccination record
const healthRecordSchema = new mongoose.Schema(
  {
    petId: {
      type: String,
      required: true,
    },
    petName: {
      type: String,
      required: true,
    },
    // Vaccination fields
    vaccineName: {
      type: String,
      default: "",
    },
    vaccineDate: {
      type: Date,
      default: null,
    },
    nextDueDate: {
      type: Date,
      default: null,
    },
    // Medicine fields
    medicineName: {
      type: String,
      default: "",
    },
    medicineDosage: {
      type: String,
      default: "",
    },
    // Health log fields
    healthNote: {
      type: String,
      default: "",
    },
    // Record type: "vaccine" | "medicine" | "log"
    recordType: {
      type: String,
      enum: ["vaccine", "medicine", "log"],
      default: "vaccine",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
