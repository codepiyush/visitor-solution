var express = require('express');
var mongoose = require('mongoose');
var Host = require('./models/host');
var app = express();
const cors = require("cors");
app.use(require("cors")());
const keys = require('./config/keys');

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5000/api/test"],
    credentials: true
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
//mongoose connect
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  })
.then(()=>console.log("Mongodb Connected"))
.catch(err=>console.log(err))

//add routes
const addVisitor = require('./routes/addVisitor')
const checkOut = require('./routes/checkout')
app.use('/api', addVisitor);
app.use('/api/checkout', checkOut)
// const hosts = [
//     {
//         name: "Piyush Bhargav",
//         email: 'piyush.bhargav70@gmail.com',
//         mobileNo: 8871904557
//     },
//     {
//         name: "Rishabh Kejriwal",
//         email: 'rishabh.kejriwal70@gmail.com',
//         mobileNo: 8004511111
//     },
//     {
//         name: "Pushpak Agarwal",
//         email: 'Pushpak.agarwal@gmail.com',
//         mobileNo: 8538975607
//     },
//     {
//         name: "Sakshi Bhargav",
//         email: 'sakshi.bhargav@gmail.com',
//         mobileNo: 9691201491
//     },
//     {
//         name: "Ayush Tiwari",
//         email: 'ayush.tiwari@gmail.com',
//         mobileNo: 8871904557
//     },
// ]
// app.post('/addhost', (req, res)=> {
//     hosts.forEach(host =>{
//         let toSave = new Host(host)
//         toSave.save(host)
//         .then(saved=>{console.log(saved)})
//         .catch(err=>console.log(err))
//     })
    
// })

app.listen(5000, (err)=>{
    if(err){
        console.log(err)
    }else {
        console.log('Server connected at port 5000')
    }
})