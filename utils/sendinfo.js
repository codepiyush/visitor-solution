const nodemailer = require("nodemailer");
const Nexmo = require('nexmo');
const keys = require('../config/keys')

async function toHost(reciever, recieverNo, mailbody) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: keys.emailId,
            pass: keys.password
        }
    });
    const nexmo = new Nexmo({
        apiKey: keys.nexmoKey,
        apiSecret: keys.nexmoSecret
    });
    //get date
    let k;
    let t = ''
    if (mailbody.checkIn.getHours() > 12) {
        k = mailbody.checkIn.getHours() - 12
        t = 'PM'
    } else {
        k = mailbody.checkIn.getHours()
        t = 'AM'
    }
    min = mailbody.checkIn.getMinutes()
    var FinalDate = `${k}:${min} ${t} IST`

    //message
    htmlData = '<h2>There is a new visitor for you</h2><p>Name: ' + mailbody.name + '</p><p>Email: ' + mailbody.email + '</p><p>Phone: ' + mailbody.mobileNo + '</p><p>Checkin Time: ' + FinalDate + '</p>'
    // send mail with defined transport object
    await transporter.sendMail({
        from: 'piyush.bhargav70@gmail.com',
        to: reciever,
        subject: 'New visitor alert',
        html: htmlData
    })
        .then(info => console.log('Email sent: ' + info.response))
        .catch(err => console.log(err))

    const from = 'Nexmo';
    const to = recieverNo.toString();
    console.log(to)
    const text = `There is a new visitor for you
Name: ${mailbody.name}
Email: ${mailbody.email}
Phone:${mailbody.mobileNo}
Checkin Time: ${FinalDate}`;

    nexmo.message.sendSms(from, to, text);

}

async function toVisitor(mailbody) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'piyush.bhargav70@gmail.com',
            pass: 'piyush@123#'
        }
    });
    const nexmo = new Nexmo({
        apiKey: 'b4de07ee',
        apiSecret: 'E1f5NODYGDf0Vj5f',
    });
    //get date
    let k;
    let t = ''
    if (mailbody.checkIn.getHours() > 12) {
        k = mailbody.checkIn.getHours() - 12
        t = 'PM'
    } else {
        k = mailbody.checkIn.getHours()
        t = 'AM'
    }
    min = mailbody.checkIn.getMinutes()
    var FinalDate = `${k}:${min} ${t} IST`
    var f = new Date()
    if (f.getHours() > 12) {
        k = f.getHours() - 12
        t = 'PM'
    } else {
        k = f.getHours()
        t = 'AM'
    }
    min = f.getMinutes()
    var CheckOutTime = `${k}:${min} ${t} IST`
    //message
    htmlData = '<h2>Here is your Visit Detail to Innovacer</h2><p>Name: ' + mailbody.name + '</p><p>Email: ' + mailbody.email + '</p><p>Phone: ' + mailbody.mobileNo + '</p><p>Checkin Time: ' + FinalDate + '</p><p>Checkout Time: ' + CheckOutTime + '</p>'
    // send mail with defined transport object
    await transporter.sendMail({
        from: 'piyush.bhargav70@gmail.com',
        to: mailbody.email,
        subject: 'Innovacer Visit Details',
        html: htmlData
    })
        .then(info => console.log('Email sent: ' + info.response))
        .catch(err => console.log(err))

    const from = 'Nexmo';
    const to = '91'+ mailbody.mobileNo.toString();
    console.log(to)
    const text = `Here is your Visit Detail to Innovacer
Name: ${mailbody.name}
Email: ${mailbody.email}
Phone:${mailbody.mobileNo}
Checkin Time: ${FinalDate}
Checkout Time: ${CheckOutTime}`;

    nexmo.message.sendSms(from, to, text);

}
async function sendOtp(msgbody,otp) {
    const nexmo = new Nexmo({
        apiKey: 'b4de07ee',
        apiSecret: 'E1f5NODYGDf0Vj5f',
    });
    const from = 'Nexmo';
    const to =  '91'+ msgbody.mobileNo.toString();
    // const to = '918538975607'
    console.log(to)
    const text = `OTP for Innovacer CheckOut ${otp}`;

    nexmo.message.sendSms(from, to, text);
}
sendInfo = {
    toHost,
    toVisitor,
    sendOtp
}
module.exports = sendInfo
