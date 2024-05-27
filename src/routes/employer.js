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

module.exports = router
