const express = require("express")
const { applicantController } = require("../main")
const { applicantMiddle } = require("../middleware")

const router = express.Router()

router.use(applicantMiddle)

router.get("/vacancies", (req, res) =>
  applicantController.getVacancies(req, res)
)

module.exports = router
