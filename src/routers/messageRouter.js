
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

router.post("/message", upload.single("file"), (req, res) => {
  let message = req.body.message
  if (req.file) {
    message = MessageMedia.fromFilePath(`./storage/${req.file.filename}`)
  }
  whatsappclient.sendMessage(req.body.number, message)
  res.send()
})

module.exports = router