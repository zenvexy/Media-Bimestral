const express = require("express");

const router = express.Router();

const { 
    listar,
    cadastrar,
    atualizar,  
    excluir } = require("../controllers/notas.controllers");

router.get("/listar", listar);
router.post("/cadastrar", cadastrar);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;