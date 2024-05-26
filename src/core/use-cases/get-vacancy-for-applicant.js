const { VacanciesRepository } = require("../repositories/vacancies-repository")
const { RepliesRepository } = require("../repositories/replies-repository")
const { ApplicantVacancy } = require("../models")

exports.GetVacancyForApplicant = class GetVacanciesForApplicant {
  /**
   * @param {RepliesRepository} repliesRepository
   * @param {VacanciesRepository} vacanciesRepository
   */
  constructor(repliesRepository, vacanciesRepository) {
    this.repliesRepository = repliesRepository
    this.vacanciesRepository = vacanciesRepository
  }

  /**
   * @param {number} applicantId
   * @param {number} vacancyId
   * @return {Promise<ApplicantVacancy | null>}
   */
  async execute(applicantId, vacancyId) {
    const [vacancy] = await this.vacanciesRepository.getVacancies(vacancyId)
    if (!vacancy) {
      return null
    }
    const replies = await this.repliesRepository.getReplies(
      null,
      applicantId,
      vacancyId
    )
    const isReplied = !!replies.length
    return new ApplicantVacancy(
      vacancy.id,
      vacancy.title,
      vacancy.employment,
      vacancy.description,
      isReplied,
      vacancy.company,
      vacancy.experienceFrom,
      vacancy.experienceTo,
      vacancy.city,
      vacancy.salaryFrom,
      vacancy.salaryTo
    )
  }
}
