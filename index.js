const express = require("express");
const connectDB = require("./db");
const userRoute = require("./Routes/user.route");
const flightRoute = require("./Routes/flight.route");
const bookingRoute = require("./Routes/booking.route");
const dasRoute = require("./Routes/dashboard.route");
const app = express()
app.use(express.json())
require("dotenv").config()
const port = process.env.PORT || 8000

app.use("/", userRoute)
app.use("/flights", flightRoute)
app.use("/booking", bookingRoute)
app.use("/dashboard", dasRoute)



app.listen(port, async () => {
    try {
        await connectDB
        console.log("connected to db")
        console.log("server running at ", port)
    } catch (error) {
        console.log(error)
    }
})