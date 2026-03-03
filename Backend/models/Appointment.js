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
  petType: {
    type: String,
    enum: ['Dog', 'Cat'],
    required: true
  },
  preferredDate: {
    type: String, 
    required: true
  },
  amount:{
    type:Number,
    required:true
  },
  preferredTime: {
    type: String,
    required: true
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
