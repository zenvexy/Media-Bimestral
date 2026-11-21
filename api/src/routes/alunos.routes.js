const express = require("express");

const router = express.Router();

const { 
    listar,
    cadastrar,
    atualizar,  
    excluir } = require("../controllers/alunos.controllers");

router.get("/listar", listar);
router.post("/cadastrar", cadastrar);
router.put("/atualizar/:matricula", atualizar);
router.delete("/excluir/:matricula", excluir);

module.exports = router;