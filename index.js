const fs = require("fs");
const { Client } = require("whatsapp-web.js");
const SESSION_FILE_PATH = "./session.json";
let sessionData;
const express = require("express");
const axios = require("axios");

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionData,
});

client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  try {
    await axios.post("http://127.0.0.1:8000/api/conversations/from", {
      username: msg.from,
      message: msg.body,
    });
  } catch (error) {
    console.error(error);
  }
});

client.initialize();

const app = express();
app.use(express.json());

app.get('', (req, res) => {
    res.send('Working!')
});

app.post("/send", (req, res) => {
  const { message, number } = req.body;
  client.sendMessage(number, message);
  res.send({ status: "Enviado mensagem!" });
});

app.listen(3000, () => console.log(`Server is ready`));
