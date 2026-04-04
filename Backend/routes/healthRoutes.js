const express = require("express");
const router = express.Router();
const HealthRecord = require("../models/HealthRecord");
router.post("/", async (req, res) => {
  try {
    const record = new HealthRecord(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating health record:", err);
    res.status(500).json({ error: "Failed to create record" });
  }
});
router.get("/:petId", async (req, res) => {
  try {
    const records = await HealthRecord.find({ petId: req.params.petId }).sort({
      createdAt: -1,
    });
    res.json(records);
  } catch (err) {
    console.error("Error fetching health records:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updated = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Record not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating health record:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error("Error deleting health record:", err);
    res.status(500).json({ error: "Failed to delete record" });
  }
});

module.exports = router;
