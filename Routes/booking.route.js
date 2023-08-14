const express = require("express");
const BookingModel = require("../Models/Booking.model");
const bookingRoute = express.Router();


bookingRoute.post("/", async (req, res) => {
    try {
        const { userId, flightId } = req.body;
        let data = await BookingModel.insertMany([{ user: userId, flight: flightId }])
        res.status(201).send({ msg: "booking done", id: data[0]._id })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

module.exports = bookingRoute