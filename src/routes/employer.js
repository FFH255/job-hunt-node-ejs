const express = require("express")
const { employerController } = require("../main")
const { employerMiddle } = require("../middleware")

const router = express.Router()

router.use(employerMiddle)

router.get("/vacancies", (req, res) =>
  employerController.getVacancies(req, res)
)

router.get("/vacancies/:id", (req, res) =>
  employerController.getVacancy(req, res)
)

router.get("/create-vacancy", (req, res) =>
  employerController.createVacancyPage(req, res)
)

router.post("/create-vacancy", (req, res) =>
  employerController.postVacancy(req, res)
)

router.get("/vacancies/:id/edit", (req, res) =>
  employerController.editVacancyPage(req, res)
)

router.post("/vacancies/:id/edit", (req, res) =>
  employerController.editVacancy(req, res)
)

router.delete("/vacancies/:id/delete", (req, res) =>
  employerController.deleteVacancy(req, res)
)

module.exports = router
