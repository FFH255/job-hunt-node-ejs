const { Reply } = require("../models")

exports.RepliesRepository = class RepliesRepository {
  constructor(mysql) {
    this.mysql = mysql
  }

  /**
   * @param {number | null} id
   * @param {number | null} applicantId
   * @param {number | null} vacancyId
   * @return {Promise<Reply[]>}
   */
  async getReplies(id, applicantId, vacancyId) {
    let sql =
      "SELECT r.id, r.created_at, v.title, v.company FROM replies as r JOIN vacancies as v WHERE r.vacancy_id = v.id"
    const params = []
    if (id !== null) {
      sql += " AND r.id = ?"
      params.push(id)
    }
    if (applicantId !== null) {
      sql += " AND r.user_id = ?"
      params.push(applicantId)
    }
    if (vacancyId !== null) {
      sql += " AND r.vacancy_id = ?"
    }

    const [rows] = await this.mysql.query(sql, params)

    if (!Array.isArray(rows)) {
      return []
    }

    return rows.map(
      (row) =>
        new Reply(row["id"], row["created_at"], row["title"], row["company"])
    )
  }

  /**
   * @param {number} applicantId
   * @param {number} vacancyId
   * @return {Promise<Reply>}
   */
  async createReply(applicantId, vacancyId) {
    const sql =
      "INSERT INTO replies (user_id, vacancy_id, created_at) VALUES (?, ?, NOW())"
    const params = [applicantId, vacancyId]
    const [{ insertId }] = await this.mysql.query(sql, params)
    const [reply] = this.getReplies(insertId)
    return reply
  }

  /**
   * @param {number} id
   * @return {Promise}
   */
  async deleteReply(id) {
    const sql = "DELETE FROM replies WHERE id = ?"
    const params = [id]
    await this.mysql.query(sql, params)
  }
}
