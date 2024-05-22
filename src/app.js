const express = require("express")

const path = require("path")

const app = express()

app.set("views", path.join(__dirname, "/views"))

app.set("view engine", "ejs")

app.get("/", function (req, res) {
  res.render("index", { title: "Hello world" })
})

app.listen(3000)
