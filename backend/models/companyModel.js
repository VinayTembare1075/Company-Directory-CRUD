const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },

  email: String,
  phone: String,
  location: String,
  description: String,

  link: String
});

module.exports = mongoose.model("Company", companySchema);