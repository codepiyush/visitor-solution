const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    checkIn: {
        type: Date,
        default: Date.now
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'host'
    },
    otp:{
        type: String,
    }
})

const Visitor = mongoose.model('visitor', visitorSchema);
module.exports = Visitor