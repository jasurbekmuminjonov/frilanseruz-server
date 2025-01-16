require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/db")

connectDB()

app.use(cors())

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use("/", require("./routes/index"))

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server http://localhost:${port} manzilida ishlamoqda`)
})