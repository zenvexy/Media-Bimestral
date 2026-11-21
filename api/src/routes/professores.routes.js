const express = require("express");

const router = express.Router();

const { 
    login,
    listar, 
    cadastrar,  
    atualizar,
    excluir } = require("../controllers/professores.controllers");

router.post("/login", login);
router.get("/listar", listar);
router.post("/cadastrar", cadastrar);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;