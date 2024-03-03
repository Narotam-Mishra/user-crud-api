const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 16,
    },
    middleName: String,
    lastName: String,
    dob: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
      maxlength: 99,
    },
    profileImage: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
