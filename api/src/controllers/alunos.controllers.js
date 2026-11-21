const prisma = require("../data/prisma");

const listar = async (req, res) => {

    const lista = await prisma.aluno.findMany();

    res.status(200).json(lista);
};

const cadastrar = async (req, res) => {

    const data = req.body;

    const item = await prisma.aluno.create({
        data
    });

    res.status(201).json(item);
};


const atualizar = async (req, res) => {

    const { matricula } = req.params;

    const dados = req.body;

    const item = await prisma.aluno.update({
        where: {
            matricula: Number(matricula)
        },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {

    const { matricula } = req.params;

    const item = await prisma.aluno.delete({
        where: {
            matricula: Number(matricula)
        }
    });

    res.status(200).json(item);
};

module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir
};