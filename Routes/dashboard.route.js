const express = require("express");
const BookingModel = require("../Models/Booking.model");
const dasRoute = express.Router();


dasRoute.get("/", async (req, res) => {
    try {
        let data = await BookingModel.aggregate([{ $lookup: { from: 'flights', localField: 'flight', foreignField: '_id', as: 'users' } }]);
        res.status(200).send({ data: data })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

dasRoute.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let data = await BookingModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "deleted" })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
module.exports = dasRoute