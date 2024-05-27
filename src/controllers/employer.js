const {
  VacanciesRepository,
} = require("../core/repositories/vacancies-repository")

exports.EmployerController = class EmployerController {
  /**
   * @param {VacanciesRepository} vacanciesRepository
   */
  constructor(vacanciesRepository) {
    this.vacanciesRepository = vacanciesRepository
  }

  async getVacancies(req, res) {
    const employerId = parseInt(req.session.user?.id)
    if (isNaN(employerId)) {
      res.sendStatus(500)
      res.render("employer/vacancies-list", { vacancies: [] })
      return
    }
    const vacancies = await this.vacanciesRepository.getVacancies(
      null,
      employerId
    )
    res.render("employer/vacancies-list", { vacancies: vacancies })
  }

  async getVacancy(req, res) {
    const employerId = parseInt(req.session.user?.id)
    if (isNaN(employerId)) {
      res.sendStatus(500)
      res.render("employer/vacancy", { vacancy: null })
      return
    }
    const vacancyId = parseInt(req.params["id"])
    if (isNaN(vacancyId)) {
      res.sendStatus(500)
      res.render("employer/vacancy", { vacancy: null })
      return
    }
    const [vacancy] = await this.vacanciesRepository.getVacancies(
      vacancyId,
      employerId
    )
    res.render("employer/vacancy", { vacancy: vacancy })
  }

  async postVacancy() {}

  async editVacancy() {}

  async deleteVacancy() {}
}
