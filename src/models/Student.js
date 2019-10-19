import mongoose, { Schema } from "mongoose";

const std = {
  firstName: { type: String },
  lastName: { type: String },
  className: { type: String },
  registrationNumber: { type: Number },
  fatherName: { type: String },
  motherName: { type: String },
  dob: { type: Date },
  email: { type: String }
};
var StudentSchema = new Schema(std);

export default mongoose.model("students", StudentSchema);
