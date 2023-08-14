const express = require("express");
const userModel = require("../Models/User.model");
const userRoute = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const saltRounds = +process.env.Salt
const secrectKey = process.env.secrectKey
userRoute.post("/register", async (req, res) => {
    try {
        const { email, name, password } = req.body
        const hashed = await bcrypt.hash(password, saltRounds);

        let data = await userModel.insertMany([{ name, email, password: hashed }])
        res.status(201).send({ msg: "user Registered", id: data[0]._id })

    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})
userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await userModel.findOne({ email })
        //console.log(data)
        if (data) {
            const pass = await bcrypt.compare(password, data.password);
            if (pass) {
                var token = jwt.sign({ id: data._id, name: data.name, email: data.email }, secrectKey);
                res.status(201).send({ msg: "Succesfull login", token: token, id: data._id })
            } else {
                res.status(201).send({ msg: "Invalid  password" })
            }
        } else {
            res.status(201).send({ msg: "Please register first" })
        }


    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})


module.exports = userRoute