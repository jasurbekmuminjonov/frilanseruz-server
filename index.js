require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/db")

connectDB()

app.use(cors())

app.use(express.json())

app.use("/", require("./routes/index"))

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server http://localhost:${port} manzilida ishlamoqda`)
})