const { VacanciesRepository } = require("../repositories/vacancies-repository")
const { RepliesRepository } = require("../repositories/replies-repository")
const { ApplicantVacancy } = require("../models")

exports.GetVacanciesForApplicant = class GetVacanciesForApplicant {
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
   * @return {Promise<ApplicantVacancy[]>}
   */
  async execute(applicantId) {
    const vacancies = await this.vacanciesRepository.getVacancies()
    return await Promise.all(
      vacancies.map(async (vacancy) => {
        const replies = await this.repliesRepository.getReplies(
          null,
          applicantId,
          vacancy.id
        )
        const totalReplies = await this.repliesRepository.getReplies(
          null,
          null,
          vacancy.id
        )
        const isReplied = !!replies.length
        return new ApplicantVacancy(
          vacancy.id,
          vacancy.title,
          vacancy.employment,
          vacancy.description,
          isReplied,
          totalReplies.length,
          vacancy.company,
          vacancy.experienceFrom,
          vacancy.experienceTo,
          vacancy.city,
          vacancy.salaryFrom,
          vacancy.salaryTo
        )
      })
    )
  }
}
