const mysql = require("mysql2")
const { UsersRepository } = require("./core/repositories/users-repository")
const {
  VacanciesRepository,
} = require("./core/repositories/vacancies-repository.js")
const { ApplicantController } = require("./controllers/applicant.js")
const { AuthController } = require("./controllers/auth.js")

const connection = mysql
  .createConnection({
    host: process.env.MY_SQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_ROOT_PASSWORD,
  })
  .promise()

const usersRepository = new UsersRepository(connection)

const vacanciesRepository = new VacanciesRepository(connection)

exports.applicantController = new ApplicantController(vacanciesRepository)

exports.authController = new AuthController(usersRepository)
