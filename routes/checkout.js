const express = require('express');
const router = express.Router();
const validate = require('../validation/validate.js');
const Visitor = require('../models/visitor');
const PastVisitor = require('../models/pastVisitor');
const sendInfo = require('../utils/sendinfo');

router.post('/', (req, res) => {
    const { errors, isValid } = validate.validateHost(req.body)
    console.log(errors, isValid)
    if (!isValid) {
        res.status(404).json(errors)
    }
    console.log(req.body)
    if (req.body.otp == undefined) {
        errors.otp = 'OTP EMPTY';
        return res.status(400).json(errors)
    }
    Visitor.findOne({ name: req.body.name, email: req.body.email })
        .then(visitor => {
            if (!visitor) {
                errors.notfound = 'NO visitor with this detail'
                return res.status(404).json(errors)
            }
            console.log(visitor)
            if (visitor.otp != req.body.otp) {
                errors.otp = 'OTP DOES NOT MATCH'
                return res.status(400).json({ errors })
            }
            var pastVisitor = new PastVisitor({
                name: visitor.name,
                email: visitor.email,
                mobileNo: visitor.mobileNo,
                host: visitor.host,
                checkIn: visitor.checkIn,
                checkOut: Date.now()
            });
            console.log(pastVisitor)
            Visitor.deleteOne({ name: req.body.name, email: req.body.email }, function (err) {
                if (err) return handleError(err);
            });
            pastVisitor.save();
            sendInfo.toVisitor(pastVisitor)
            res.json(pastVisitor)
        })
})

router.post('/getOtp', (req, res) => {
    const { errors, isValid } = validate.validateHost(req.body)
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log('out', OTP)
    Visitor.findOne({ name: req.body.name, email: req.body.email })
        .then(visitor => {
            if (!visitor) {
                errors.notfound = 'No Visitor with provided Details'
                return res.status(404).json({ errors })
            }

            Visitor.updateOne({ _id: visitor._id }, { $set: { otp: OTP } })
                .then(uVisitor => {
                    if (uVisitor.nModified != 1) {
                        return res.json(400).json({ err: 'could not update' })
                    }
                    console.log(visitor)
                    console.log('in', OTP)
                    sendInfo.sendOtp(visitor, OTP)
                    res.status(200).json({ otp: true, visitor: visitor })
                })
                .catch(err => console.log(err))
        })
})

module.exports = router