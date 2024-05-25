const { User } = require("../models")

exports.UsersRepository = class UsersRepository {
  constructor(mysql) {
    this.mysql = mysql
  }

  /**
   * @param {string | null} id
   * @param {string | null} name
   * @param {string | null} password
   * @param {number | null} role
   * @return {Promise<User[]>}
   */
  async getUsers(id = null, name = null, password = null, role = null) {
    let sql = "SELECT * FROM users WHERE 1"
    const params = []

    if (id !== null) {
      sql += " AND id = ?"
      params.push(id)
    }
    if (name !== null) {
      sql += " AND login = ?"
      params.push(name)
    }
    if (password !== null) {
      sql += " AND password = ?"
      params.push(password)
    }
    if (role !== null) {
      sql += " AND role = ?"
      params.push(role)
    }

    const [rows] = await this.mysql.query(sql, params)

    if (!Array.isArray(rows)) {
      return []
    }

    return rows.map(
      (row) => new User(row.id, row.login, row.password, row.role)
    )
  }

  /**
   * @param {string} login
   * @param {string} password
   * @param {number} role
   */
  async addUser(login, password, role) {
    const sql = "INSERT INTO users(login, password, role) VALUES (?, ?, ?)"
    const params = [login, password, role]
    const [{ insertId }] = await this.mysql.query(sql, params)
    const [user] = await this.getUsers(insertId)
    return user
  }
}
