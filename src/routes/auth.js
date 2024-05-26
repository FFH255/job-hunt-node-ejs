const express = require("express")
const { authController } = require("../main")

const router = express.Router()

router.get("/login", (req, res) => authController.login(req, res))

module.exports = router
