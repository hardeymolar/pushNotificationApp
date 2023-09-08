require('dotenv').config();
const express = require("express");
const webpush = require("web-push");
// const bodyparser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname,"client")))
app.use(express.json());

const publicVapidKey = "BHP6m8uPMSyAOvo1tMqkxfOIIzom-hBeT81mwOGqnpQzE-gXNLSA6EY6LXySTv_u1-5bIwDlo8H5jB7WZEMqJFI";
const privateVapidKey = "mTAzX_IW8sZ7nSjf5oTaNZdeqR4AD-Zx_2LAr6cidpY";

webpush.setVapidDetails("mailto:abdulmalikgbolahan95@gmail.com",publicVapidKey,privateVapidKey);


// suscribe route

app.post("/subscribe",(req,res)=>{
    // Get push subscription object

const subscription = req.body;

// send 201 - resource created

res.status(201).json({});

// create payload
const payload = "here is a payload";

const options ={

}

// pass object into send notification

webpush.sendNotification(subscription,payload).catch(err => console.error(err));

})

PORT = process.env.PORT

app.listen(PORT,()=>console.log(`app is listening on port ${PORT}...`))
