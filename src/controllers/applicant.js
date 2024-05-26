const {
  VacanciesRepository,
} = require("../core/repositories/vacancies-repository")
const { RepliesRepository } = require("../core/repositories/replies-repository")
const {
  GetVacanciesForApplicant,
} = require("../core/use-cases/get-vacancies-for-applicant")
const {
  GetVacancyForApplicant,
} = require("../core/use-cases/get-vacancy-for-applicant")

exports.ApplicantController = class ApplicantController {
  /**
   * @param {VacanciesRepository} vacanciesRepository
   * @param {RepliesRepository} repliesRepository
   * @param {GetVacanciesForApplicant} getVacanciesForApplicant
   * @param {GetVacancyForApplicant} getVacancyForApplicant
   */
  constructor(
    vacanciesRepository,
    repliesRepository,
    getVacanciesForApplicant,
    getVacancyForApplicant
  ) {
    this.vacanciesRepository = vacanciesRepository
    this.repliesRepository = repliesRepository
    this.getVacanciesForApplicant = getVacanciesForApplicant
    this.getVacancyForApplicant = getVacancyForApplicant
  }

  async getVacancies(req, res) {
    const applicantId = parseInt(req.session.user.id)
    if (isNaN(applicantId)) {
      res.sendStatus(500)
      return
    }
    const vacancies = await this.getVacanciesForApplicant.execute(applicantId)
    res.render("applicant/vacancies-list", { vacancies: vacancies })
  }

  async getVacancy(req, res) {
    const id = parseInt(req.params["id"])
    console.log("vacancy id", id)
    if (isNaN(id)) {
      res.sendStatus(400)
      res.render("applicant/vacancy", { vacancy: null })
      return
    }
    const applicantId = parseInt(req.session.user?.id)
    if (isNaN(applicantId)) {
      res.sendStatus(500)
      res.render("applicant/vacancy", { vacancy: null })
      return
    }
    const vacancy = await this.getVacancyForApplicant.execute(applicantId, id)
    res.render("applicant/vacancy", { vacancy: vacancy })
  }

  async replyVacancy(req, res) {
    const vacancyId = parseInt(req.query["vacancy-id"])
    if (isNaN(vacancyId)) {
      res.sendStatus(400)
      return
    }
    const applicantId = req.session.user?.id
    if (applicantId === undefined) {
      res.sendStatus(500)
      return
    }
    await this.repliesRepository.createReply(applicantId, vacancyId)
    res.sendStatus(200)
  }
}
