const mongoose = require("mongoose");

const users = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    fav: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarDetails",
      },
    ],
    my_post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarDetails",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UsersDB", users);
