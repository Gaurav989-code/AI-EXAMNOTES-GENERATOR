const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    // password: {
    //   type: String,
    //   required: [true, "Password is required"],
    //   minlength: [6, "Password must be at least 6 characters long"],
    // },
    // role: {
    //   type: String,
    //   enum: ["user", "admin", "moderator"],
    //   default: "user",
    // },
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
    
    credits: {
      type: Number,
      default: 50,
      min: 0,
    },
    isCreditsAvailable: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Notes",
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("userModel", userSchema);
export default userModel;
// module.exports = userModel;
