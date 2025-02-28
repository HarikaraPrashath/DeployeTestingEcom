const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
