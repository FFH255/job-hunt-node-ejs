class Vacancy {
  constructor(
    id,
    title,
    employment,
    description,
    company = null,
    experienceFrom = null,
    experienceTo = null,
    city = null,
    salaryFrom = null,
    salaryTo = null
  ) {
    this.id = id
    this.title = title
    this.employment = employment
    this.description = description
    this.company = company
    this.experienceFrom = experienceFrom
    this.experienceTo = experienceTo
    this.city = city
    this.salaryFrom = salaryFrom
    this.salaryTo = salaryTo
  }
}

class VacancyFormValue {
  constructor(
    title,
    employment,
    description,
    company = null,
    experienceFrom = null,
    experienceTo = null,
    city = null,
    salaryFrom = null,
    salaryTo = null
  ) {
    this.title = title
    this.employment = employment
    this.description = description
    this.company = company
    this.experienceFrom = experienceFrom
    this.experienceTo = experienceTo
    this.city = city
    this.salaryFrom = salaryFrom
    this.salaryTo = salaryTo
  }
}

exports.VacanciesRepository = class VacanciesRepository {
  constructor(mysql) {
    this.mysql = mysql
  }

  /**
   * @param {number} id
   * @param {number} employerId
   * @return {Promise<Vacancy[]>}
   */
  async getVacancies(id = null, employerId = null) {
    let sql = "SELECT * FROM vacancies WHERE 1"
    const params = []
    if (id !== null) {
      sql += " AND id = ?"
      params.push(id)
    }
    if (employerId !== null) {
      sql += " AND employer_id = ?"
      params.push(employerId)
    }

    const [rows] = await this.mysql.query(sql, params)

    if (!Array.isArray(rows)) {
      return []
    }

    return rows.map(
      (row) =>
        new Vacancy(
          row["id"],
          row["title"],
          row["employment"],
          row["description"],
          row["company"],
          row["experience_from"],
          row["experience_to"],
          row["city"],
          row["salary_from"],
          row["salary_to"]
        )
    )
  }

  /**
   *
   * @param {VacancyFormValue} draft
   * @return {Promise<Vacancy>}
   */
  async createVacancy(draft) {
    const sql =
      "INSERT INTO vacancies (title, company, employment, experience_from, experience_to, city, salary_from, salary_to, description, employer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const params = [
      draft.title,
      draft.company,
      draft.employment,
      draft.experienceFrom,
      draft.experienceTo,
      draft.city,
      draft.salaryFrom,
      draft.salaryTo,
      draft.description,
      draft.employerId,
    ]
    const [{ insertId }] = await this.mysql.query(sql, params)
    const [vacancy] = this.getVacancies(insertId)
    return vacancy
  }

  /**
   * @param {VacancyFormValue} draft
   * @param {number} id
   * @return {Promise<Vacancy>}
   */
  async updateVacancy(draft, id) {
    const sql = `UPDATE vacancies SET 
    title = ?, 
    company = ?, 
    employment = ?, 
    experience_from = ?, 
    experience_to = ?, 
    city = ?, 
    salary_from = ?, 
    salary_to = ?, 
    description = ? 
    WHERE id = ?`

    const params = [
      draft.title,
      draft.company,
      draft.employment,
      draft.experienceFrom,
      draft.experienceTo,
      draft.city,
      draft.salaryFrom,
      draft.salaryTo,
      draft.description,
      id,
    ]

    await this.mysql.query(sql, params)

    return new Vacancy(
      id,
      draft.title,
      draft.employment,
      draft.description,
      draft.company,
      draft.experienceFrom,
      draft.experienceTo,
      draft.city,
      draft.salaryFrom,
      draft.salaryTo
    )
  }

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  deleteVacancy(id) {
    const sql = "DELETE FROM vacancies WHERE id = ?"
    const params = [id]
    this.mysql.query(sql, params)
  }
}
