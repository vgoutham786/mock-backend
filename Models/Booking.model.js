const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
   
    user : { type: mongoose.Schema.ObjectId, ref: 'users' },
    flight : { type: mongoose.Schema.ObjectId, ref: 'flights' }
}
)

const BookingModel = mongoose.model("Booking", BookingSchema)


module.exports = BookingModel