const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  actions: {
    edit: {
      type: Boolean,
      default: true,
    },
    delete: {
      type: Boolean,
      default: true,
    },
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
