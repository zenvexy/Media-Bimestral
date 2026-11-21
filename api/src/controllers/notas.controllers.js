const prisma = require("../data/prisma");

const calcularMedia = (nota) => {

    const soma = nota.bimestre1 + nota.bimestre2 + nota.bimestre3 + nota.bimestre4;

    return Math.round((soma / 4) * 10) / 10;
};


const listar = async (req, res) => {

    const lista = await prisma.nota.findMany();

    res.status(200).json(lista);
};


const cadastrar = async (req, res) => {

    const data = req.body;

    data.mediaFinal = calcularMedia(data);

    const item = await prisma.nota.create({
        data
    });

    res.status(201).json(item);
};


const atualizar = async (req, res) => {

    const { id } = req.params;

    const atual = await prisma.nota.findUnique({
        where: {
            id: Number(id)
        }
    });

    const dados = { ...atual, ...req.body };

    dados.mediaFinal = calcularMedia(dados);

    const item = await prisma.nota.update({
        where: {
            id: Number(id)
        },
        data: dados
    });

    res.status(200).json(item);
};


const excluir = async (req, res) => {

    const { id } = req.params;

    const item = await prisma.nota.delete({
        where: {
            id: Number(id)
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