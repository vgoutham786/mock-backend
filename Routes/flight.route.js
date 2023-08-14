const express = require("express");
const flightRoute = express.Router();
const FlightModel = require("../Models/Flight.model");

flightRoute.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let data = null;
        if (id) {
            data = await FlightModel.findOne({ _id: id })
            if (data) {
                res.status(200).send({ data: data })
            } else {
                res.status(400).send({ msg: "flight not found" })
            }
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
flightRoute.get("/", async (req, res) => {
    try {


        const data = await FlightModel.find()


        res.status(200).send({ data: data })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

flightRoute.post("/", async (req, res) => {
    const obj = req.body
    try {
        let data = await FlightModel.insertMany(obj)
        res.status(201).send({ msg: "flight details added", id: data[0]._id })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

flightRoute.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const obj = req.body
    try {
        const data = await FlightModel.findOne({ _id: id })
        //console.log(data)
        if (data) {
            let upd = { ...data }
            //console.log()
            upd = { ...upd._doc, ...obj }
            await FlightModel.findByIdAndUpdate({ _id: id, upd })
            res.status(204).send({ msg: "updated" })
        } else {
            res.status(400).send({ msg: "flight not found" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
flightRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await FlightModel.findOne({ _id: id })
        //console.log(data)
        if (data) {

            //console.log()

            await FlightModel.findByIdAndDelete({ _id: id })
            res.status(202).send({ msg: "deleted" })
        } else {
            res.status(400).send({ msg: "flight not found" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

module.exports = flightRoute