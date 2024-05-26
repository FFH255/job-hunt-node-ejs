const { UsersRepository } = require("../core/repositories/users-repository")

exports.AuthController = class AuthController {
  /**
   * @param {UsersRepository} usersRepository
   */
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  getLogin(req, res) {
    res.render("auth/login")
  }

  async postLogin(req, res) {
    const { username, password } = req.body
    if (!username || !password) {
      res.redirect("./login")
      return
    }
    const [user] = await this.usersRepository.getUsers(null, username, password)
    if (!user) {
      res.redirect("./login")
      return
    }
    req.session.user = user
    const url = user.role === 1 ? "/applicant/vacancies" : "/employer/vacancies"
    res.redirect(url)
  }

  async getRegister(req, res) {
    res.render("auth/register")
  }

  async postRegister(req, res) {
    const { username, password, role } = req.body
    if (!username || !password || !role) {
      res.redirect("./register")
      return
    }
    const user = await this.usersRepository.addUser(username, password, role)
    if (!user) {
      res.redirect("./register")
      return
    }
    req.session.user = user
    const url = user.role === 1 ? '/applicant/vacancies' : '/employer/vacancies'
    res.redirect(url)
  }

  logout(req, res) {
    req.session.user = undefined;
    res.redirect('/auth/login')
  }
}
