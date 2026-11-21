const express = require("express");

const router = express.Router();

const { listar } = require("../models/materias");

router.get("/listar", listar);

module.exports = router;