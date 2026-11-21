const prisma = require("../data/prisma");
const { hashSenha, compararSenha } = require("../models/login");

const login = async (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const professor = await prisma.professor.findUnique({
        where: { email }
    });

    if (!professor || !(await compararSenha(senha, professor.senha))) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    return res.status(200).json({ message: "Login bem-sucedido" });
};

const listar = async (req, res) => {
    const lista = await prisma.professor.findMany({
        omit: { senha: true }
    });

    res.status(200).json(lista);
};

const cadastrar = async (req, res) => {

    const senha = await hashSenha(req.body.senha);
    const item = await prisma.professor.create({
        data: {
            ...req.body,
            senha
        },
        omit: { senha: true }
    });

    return res.status(201).json(item);
};

const atualizar = async (req, res) => {

    const { id } = req.params;
    const dados = { ...req.body };

    if (typeof dados.senha === "string") {
        dados.senha = await hashSenha(dados.senha);
    }

    const item = await prisma.professor.update({
        where: { id: Number(id) },
        data: dados,
        omit: { senha: true }
    });

    return res.status(200).json(item);
};

const excluir = async (req, res) => {

    const { id } = req.params;

    const item = await prisma.professor.delete({
        where: {
            id: Number(id)
        },
        omit: { senha: true }
    });

    res.status(200).json(item);
};

module.exports = {
    login,
    cadastrar,
    listar,
    atualizar,
    excluir
};
