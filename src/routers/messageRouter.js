
const express = require('express');
const router = new express.Router();
const { startClient, sendMessage } = require("../services/WhatsappClient")
const multer  = require('multer')
const upload = multer()

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post("/message", upload.single("file"), (req, res) => {
  const file = req.file
  const clientId = req.body.clientId;
  sendMessage(req.body.phoneNumber, req.body.message, clientId, file);
  res.send();
})

router.get('/:id/start', (req, res) => {
  startClient(req.params.id)
  res.send()
})

module.exports = router