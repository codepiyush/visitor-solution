const express = require('express');
const router = express.Router();
const Visitor = require('../models/visitor');
const Host = require('../models/host');
const validate = require('../validation/validate.js')
const nodemailer = require("nodemailer");
const Nexmo = require('nexmo');
const sendInfo = require('../utils/sendinfo')

//async function for sending mail
// async function sendmail(reciever, recieverNo, mailbody) {
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'piyush.bhargav70@gmail.com',
//             pass: 'piyush@123#'
//         }
//     });
//     const nexmo = new Nexmo({
//         apiKey: 'b4de07ee',
//         apiSecret: 'E1f5NODYGDf0Vj5f',
//     });
//     //get date
//     let k;
//     let t = ''
//     if (mailbody.checkIn.getHours() > 12) {
//         k = mailbody.checkIn.getHours() - 12
//         t = 'PM'
//     } else {
//         k = mailbody.checkIn.getHours()
//         t = 'AM'
//     }
//     min = mailbody.checkIn.getMinutes()
//     var FinalDate = `${k}:${min} ${t} IST`

//     //message
//     htmlData = '<h2>There is a new visitor for you</h2><p>Name: ' + mailbody.name + '</p><p>Email: ' + mailbody.email + '</p><p>Phone: ' + mailbody.mobileNo + '</p><p>Checkin Time: ' + FinalDate + '</p>'
//     // send mail with defined transport object
//     await transporter.sendMail({
//         from: 'piyush.bhargav70@gmail.com',
//         to: reciever,
//         subject: 'New visitor alert',
//         html: htmlData
//     })
//         .then(info => console.log('Email sent: ' + info.response))
//         .catch(err => console.log(err))

//     const from = 'Nexmo';
//     const to = recieverNo.toString();
//     console.log(to)
//     const text = `There is a new visitor for you
// Name: ${mailbody.name}
// Email: ${mailbody.email}
// Phone:${mailbody.mobileNo}
// Checkin Time: ${FinalDate}`;

//     nexmo.message.sendSms(from, to, text);

// }
//test route

router.get('/test', (req, res) => {
    k= new Date();
    res.json({date: k.getHours()})
})

//add new visitor
router.post('/addVisitor', (req, res) => {
    const { errors, isValid } = validate.validateVisitor(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newVisitor = new Visitor({
        name: req.body.name,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        host: req.body.hostId
    })

    newVisitor.save()
        .then(visitor => {
            sendInfo.toHost(req.body.hostEmail,req.body.hostNo, visitor);
            res.status(200).send(visitor)
        })
        .catch(err => res.status(400).json(err))
})

//find host 
router.post('/gethost', (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validate.validateHost(req.body)
    console.log(errors,isValid)
    if (!isValid) {
        return res.status(400).json(errors)
    }

    Host.findOne({ name: req.body.name, email: req.body.email })
        .then(host => {
            if (host) {
                return res.status(200).json(host)
            } else {
                errors.notFound = 'No Host with these details';
                return res.status(404).json(errors)
            }
        })
        .catch(err => res.status(400).json(err))
})


module.exports = router;