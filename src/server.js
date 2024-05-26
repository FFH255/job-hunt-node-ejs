const express = require("express")
const path = require("path")
const session = require("express-session")
const bodyParser = require("body-parser")
const authRouter = require("./routes/auth")
const applicantRouter = require("./routes/applicant")

const app = express()

app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(
  session({
    secret: "you secret key",
    saveUninitialized: true,
  })
)

app.set("views", path.join(__dirname, "/views"))

app.use(express.static("src/public"))

app.set("view engine", "ejs")

app.use("/auth", authRouter)

app.use("/applicant", applicantRouter)

app.get("/", (req, res) => {
  res.send("hello world")
})

app.listen(process.env.PORT, () => {
  console.log("NODE-SERVER IS LISTENNING ON PORT", process.env.PORT)
})
