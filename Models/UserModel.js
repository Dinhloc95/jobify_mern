import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  location: {
    type: String,
    default: "my city",
  },
  avatar: String,
  avatarPublicId: String,
});
userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("User", userSchema);
