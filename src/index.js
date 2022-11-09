const express = require("express")
const messageRouter = require('./routers/messageRouter')
const whatsappclient = require('./services/WhatsappClient')

whatsappclient.initialize()

const app = express()
app.use(express.json())
app.use(messageRouter)

app.listen(process.env.PORT, () => console.log(`Server is ready in on port ${process.env.PORT}`))
