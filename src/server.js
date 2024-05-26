const express = require("express")
const path = require("path")
const authRouter = require("./routes/auth")

const app = express()

app.set("views", path.join(__dirname, "/views"))

app.use(express.static("src/public"))

app.set("view engine", "ejs")

app.use("/auth", authRouter)

app.listen(process.env.PORT, () => {
  console.log("NODE-SERVER IS LISTENNING ON PORT", process.env.PORT)
})
