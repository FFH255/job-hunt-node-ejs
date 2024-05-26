const {
  VacanciesRepository,
} = require("../core/repositories/vacancies-repository")

exports.ApplicantController = class ApplicantController {
  /**
   * @param {VacanciesRepository} vacanciesRepository
   */
  constructor(vacanciesRepository) {
    this.vacanciesRepository = vacanciesRepository
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
}
