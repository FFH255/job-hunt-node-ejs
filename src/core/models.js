exports.Role = {
  None: 0,
  Applicant: 1,
  Employer: 2,
}

exports.User = class User {
  constructor(id, name, password, role) {
    this.id = id
    this.name = name
    this.password = password
    this.role = role
  }
}

exports.Reply = class Reply {
  constructor(id, date, title, company) {
    this.id = id
    this.date = date
    this.title = title
    this.company = company
  }
}

exports.ApplicantVacancy = class ApplicantVacancy {
  constructor(
    id,
    title,
    employment,
    description,
    isReplied,
    totalReplies,
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
    this.isReplied = isReplied
    this.company = company
    this.experienceFrom = experienceFrom
    this.experienceTo = experienceTo
    this.city = city
    this.salaryFrom = salaryFrom
    this.salaryTo = salaryTo
    this.totalReplies = totalReplies
  }
}

exports.EmployerVacancy = class EmployerVacancy {
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
