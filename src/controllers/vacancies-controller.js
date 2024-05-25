const {
  VacanciesRepository,
} = require("../core/repositories/vacancies-repository")

exports.VacanciesController = class VacanciesController {
  /**
   * @param {VacanciesRepository} vacanciesRepository
   */
  constructor(vacanciesRepository) {
    this.vacanciesRepository = vacanciesRepository
  }

  async getVacanciesForApplicant(req, res) {
    const vacancies = await this.vacanciesRepository.getVacancies()
    res.render("applicant-vacancies-list", { vacancies: vacancies })
  }
}
