const {
  VacanciesRepository,
} = require("../core/repositories/vacancies-repository")
const { RepliesRepository } = require("../core/repositories/replies-repository")

exports.ApplicantController = class ApplicantController {
  /**
   * @param {VacanciesRepository} vacanciesRepository
   * @param {RepliesRepository} repliesRepository
   */
  constructor(vacanciesRepository, repliesRepository) {
    this.vacanciesRepository = vacanciesRepository
    this.repliesRepository = repliesRepository
  }

  async getVacancies(req, res) {
    const vacancies = await this.vacanciesRepository.getVacancies()
    res.render("applicant/vacancies-list", { vacancies: vacancies })
  }

  async getVacancy(req, res) {
    const id = parseInt(req.params["id"])
    console.log("vacancy id", id)
    if (isNaN(id)) {
      res.render("applicant/vacancy", { vacancy: null })
    }
    const [vacancy] = await this.vacanciesRepository.getVacancies(id)
    console.log(vacancy)
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
