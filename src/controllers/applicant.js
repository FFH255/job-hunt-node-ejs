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
}
