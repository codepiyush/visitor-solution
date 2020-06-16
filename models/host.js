const mongoose = require('mongoose');

const hostSchema = mongoose.Schema({
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
    }
})

const Host = mongoose.model('host', hostSchema);
module.exports = Host