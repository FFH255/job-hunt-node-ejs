const express = require("express")
const path = require("path")
const session = require("express-session")
const bodyParser = require("body-parser")
const authRouter = require("./routes/auth")
const applicantRouter = require("./routes/applicant")
const employerRouter = require("./routes/employer")

const app = express()

app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
  })
)

app.set("views", path.join(__dirname, "/views"))

app.use(express.static("src/public"))

app.set("view engine", "ejs")

app.use("/auth", authRouter)

app.use("/applicant", applicantRouter)

app.use("/employer", employerRouter)

app.get("*", (req, res) => {
  res.redirect("/auth/login")
})

app.listen(process.env.PORT, () => {
  console.log("Node Server Is Listenning On Port:", process.env.PORT)
})
