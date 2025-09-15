const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  petName: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    enum: ['Dog', 'Cat', 'Bird', 'Other'],
    required: true
  },
  petAge: {
    type: Number,
    required: true
  },
  preferredDate: {
    type: String, 
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
