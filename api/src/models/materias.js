const listar = async (req, res) => {

    const lista = [
        "MATEMATICA",
        "PORTUGUES",
        "HISTORIA",
        "GEOGRAFIA"
    ]; 

    res.status(200).json(lista);
};

module.exports = {
    listar
};