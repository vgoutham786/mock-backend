const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const userModel = mongoose.model("user", UserSchema)


module.exports = userModel