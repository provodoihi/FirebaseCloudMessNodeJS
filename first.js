const express = require('express');
const admin = require("firebase-admin");

const serviceAccount = require("./firebase.json");

const hostname = 'localhost'
const port = 8080;

const fcm = express();
fcm.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

fcm.post('/api', (req,res) => {
  const mess = req.body.message;
  const phone_token = req.body.token;
  const message = {
    data: {
      blah: mess
    },
    token: phone_token
  };
  admin.messaging().send(message)
  .then(response => {
    res.status(200).send(response);
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
})

fcm.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})