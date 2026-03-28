const express = require("express");
const router = express.Router();
const Clinic = require("../models/Clinic");
const getDistance = require("../services/distance");

router.get("/nearby", async (req, res) => {

  try {

    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "Latitude and longitude required" });
    }

    const clinics = await Clinic.find();

    const nearbyClinics = clinics
      .map(clinic => {

        const distance = getDistance(
          lat,
          lon,
          clinic.latitude,
          clinic.longitude
        );

        return {
          _id: clinic._id,
          name: clinic.name,
          address: clinic.address,
          phone: clinic.phone,
          bookingAvailable: clinic.bookingAvailable,
          distance: Number(distance.toFixed(2))
        };

      })
      .filter(c => c.distance <= 20)
      .sort((a, b) => a.distance - b.distance);

    res.json(nearbyClinics);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Error fetching clinics" });

  }

});

module.exports = router;