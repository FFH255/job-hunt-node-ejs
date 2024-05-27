const mysql = require("mysql2")
const { UsersRepository } = require("./core/repositories/users-repository")
const {
  VacanciesRepository,
} = require("./core/repositories/vacancies-repository.js")
const {
  RepliesRepository,
} = require("./core/repositories/replies-repository.js")
const { ApplicantController } = require("./controllers/applicant.js")
const { AuthController } = require("./controllers/auth.js")
const {
  GetVacanciesForApplicant,
} = require("./core/use-cases/get-vacancies-for-applicant.js")
const {
  GetVacancyForApplicant,
} = require("./core/use-cases/get-vacancy-for-applicant.js")
const { EmployerController } = require("./controllers/employer.js")

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

const repliesRepository = new RepliesRepository(connection)

const getVacanciesForApplicant = new GetVacanciesForApplicant(
  repliesRepository,
  vacanciesRepository
)

const getVacancyForApplicant = new GetVacancyForApplicant(
  repliesRepository,
  vacanciesRepository
)

exports.applicantController = new ApplicantController(
  vacanciesRepository,
  repliesRepository,
  getVacanciesForApplicant,
  getVacancyForApplicant
)

exports.employerController = new EmployerController(vacanciesRepository)

exports.authController = new AuthController(usersRepository) 
