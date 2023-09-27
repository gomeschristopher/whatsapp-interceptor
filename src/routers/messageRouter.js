
const express = require('express');
const router = new express.Router();
const { MessageMedia } = require("whatsapp-web.js")
const whatsappclient = require("../services/WhatsappClient")
const multer = require("multer")

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./storage/")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  }),
})

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post("/message", upload.single("file"), (req, res) => {
  req.body.broadcastList.forEach(item => {
    console.log(item.number, item.message);
    whatsappclient.sendMessage(item.number, item.message)
  });

  res.send();
})

module.exports = router