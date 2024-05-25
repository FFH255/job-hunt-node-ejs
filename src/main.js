const express = require("express")
const path = require("path")
const mysql = require("mysql2")
const { UsersRepository } = require("./core/repositories/users-repository")

const connection = mysql
  .createConnection({
    host: process.env.MY_SQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_ROOT_PASSWORD,
  })
  .promise()

const usersRepository = new UsersRepository(connection)

const app = express()

app.set("views", path.join(__dirname, "/views"))

app.use(express.static("src/public"))

app.set("view engine", "ejs")

app.get("/", function (req, res) {
  res.render("index", { title: "Hello world" })
})

app.listen(process.env.PORT, () => {
  console.log("NODE-SERVER IS LISTENNING ON PORT", process.env.PORT)
})
