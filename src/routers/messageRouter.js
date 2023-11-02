
const express = require('express');
const router = new express.Router();
const whatsappclient = require("../services/WhatsappClient")

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post("/message", upload.single("file"), (req, res) => {
  whatsappclient.sendMessage(req.body.phoneNumber, req.body.message);
  res.send();
})

module.exports = router