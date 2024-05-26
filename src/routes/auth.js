const express = require("express")
const { authController } = require("../main")

const router = express.Router()

router.get("/login", (req, res) => authController.getLogin(req, res))

router.post("/login", (req, res) => authController.postLogin(req, res))

router.get("/register", (req, res) => authController.getRegister(req, res))

router.post("/register", (req, res) => authController.postRegister(req, res))

module.exports = router