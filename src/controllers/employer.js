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

  async createVacancyPage(req, res) {
    res.render("employer/create-vacancy")
  }

  async postVacancy(req, res) {
    const {
      title,
      company,
      employment,
      experienceFrom,
      exrepienceTo,
      city,
      salaryFrom,
      salaryTo,
      description,
    } = req.body
    if (!title || !employment || !description) {
      res.redirect("/employer/create-vacancy")
      return
    }
    const employerId = parseInt(req.session.user?.id)
    if (isNaN(employerId)) {
      res.redirect("/employer/create-vacancy")
      return
    }
    await this.vacanciesRepository.createVacancy(
      {
        title,
        company,
        employment,
        experienceFrom,
        exrepienceTo,
        city,
        salaryFrom,
        salaryTo,
        description,
      },
      employerId
    )
    res.redirect("/employer/vacancies")
  }

  async editVacancy(req, res) {}

  async deleteVacancy(req, res) {}
}
