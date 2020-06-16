const mongoose = require('mongoose');

const pastVisitorSchema = mongoose.Schema({
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
    checkOut: {
        type: Date,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'host'
    }
})

const PastVisitor = mongoose.model('pastvisitor', pastVisitorSchema);
module.exports = PastVisitor