require("dotenv").config();
const express = require("express");
const cors = require("cors");

const professoresRoutes = require("./src/routes/professores.routes");
const alunosRoutes = require("./src/routes/alunos.routes");
const notasRoutes = require("./src/routes/notas.routes");
const materiasRoutes = require("./src/routes/materias.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/professores", professoresRoutes);
app.use("/alunos", alunosRoutes);
app.use("/notas", notasRoutes);
app.use("/materias", materiasRoutes);

const rotas = [
    { rota: "/", verbo: "GET" },
    { rota: "/professores/login", verbo: "POST" },
    { rota: "/professores/listar", verbo: "GET" },
    { rota: "/professores/cadastrar", verbo: "POST" },
    { rota: "/professores/atualizar/:id", verbo: "PUT" },
    { rota: "/professores/excluir/:id", verbo: "DELETE" },
    { rota: "/alunos/listar", verbo: "GET" },
    { rota: "/alunos/cadastrar", verbo: "POST" },
    { rota: "/alunos/atualizar/:matricula", verbo: "PUT" },
    { rota: "/alunos/excluir/:matricula", verbo: "DELETE" },
    { rota: "/notas/listar", verbo: "GET" },
    { rota: "/notas/cadastrar", verbo: "POST" },
    { rota: "/notas/atualizar/:id", verbo: "PUT" },
    { rota: "/notas/excluir/:id", verbo: "DELETE" },
    { rota: "/materias/listar", verbo: "GET" }
];

app.get("/", (req, res) => {
    res.json({
        message: "API de médias online",
        rotas
    });
});

module.exports = app;
