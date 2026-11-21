const bcrypt = require("bcrypt");

const hashSenha = (senha) => bcrypt.hash(senha, 12);
const compararSenha = async (senha, senhaHash) => bcrypt.compare(senha, senhaHash);

module.exports = {
    hashSenha,
    compararSenha
};
