const url = "https://media-bimestral.vercel.app";

const pagina = document.body.dataset.page;
const logado = sessionStorage.getItem("professorLogado");
const nomeProfessor = sessionStorage.getItem("professorNome");
const idProfessor = sessionStorage.getItem("professorId");
const publica = pagina === "login" || pagina === "cadastro";


function pegar(id) {
  return document.getElementById(id);
}

function limpar(texto) {
  return String(texto ?? "-").replace(/</g, "&lt;");
}

function mensagem(texto, erro) {
  const campo = pegar("mensagem");

  if (!campo) return;

  campo.textContent = texto;
  campo.className = erro ? "mensagem erro" : "mensagem";
}


async function chamar(caminho, metodo = "GET", dados) {
  const opcoes = { method: metodo };

  if (dados) {
    opcoes.headers = { "Content-Type": "application/json" };
    opcoes.body = JSON.stringify(dados);
  }

  const resposta = await fetch(url + caminho, opcoes);
  const corpo = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(corpo.message || "Erro na operação.");
  }

  return corpo;
}

async function tentar(acao, sucesso) {
  try {
    await acao();
    mensagem(sucesso);
  } catch (erro) {
    mensagem(erro.message, true);
  }
}


const telas = {
  professores: {
    form: "formProfessor",
    lista: "listaProfessores",
    colunas: ["id", "nome", "email", "materia"],
    chave: "id",
    campos: ["nome", "email", "senha", "materia"]
  },

  alunos: {
    form: "formAluno",
    lista: "listaAlunos",
    colunas: ["matricula", "nome"],
    chave: "matricula",
    campos: ["nome"]
  },

  notas: {
    form: "formNota",
    lista: "listaNotas",
    colunas: ["id", "alunoMatricula", "professorId", "bimestre1", "bimestre2", "bimestre3", "bimestre4", "mediaFinal"],
    chave: "id",
    campos: ["alunoMatricula", "professorId", "bimestre1", "bimestre2", "bimestre3", "bimestre4"]
  }
};


function iniciarTela(tela) {
  const form = pegar(tela.form);
  const lista = pegar(tela.lista);
  const enviar = form.querySelector("button[type=submit]");
  const cancelar = pegar("cancelar");

  let itens = [];
  let editando = null;


  function sairDaEdicao() {
    editando = null;

    form.reset();
    enviar.textContent = "Cadastrar";
    cancelar.hidden = true;

    if (pagina === "professores") {
      pegar("senha").required = true;
    }
  }


  async function carregar() {
    itens = await chamar(`/${pagina}/listar`);

    let html = "";

    for (const item of itens) {
      html += "<tr>";

      for (const coluna of tela.colunas) {
        html += `<td>${limpar(item[coluna])}</td>`;
      }

      html += `
        <td>
          <button data-editar="${item[tela.chave]}">Editar</button>
          <button class="perigo" data-excluir="${item[tela.chave]}">Excluir</button>
        </td>
      </tr>`;
    }

    lista.innerHTML = html;
  }


  form.onsubmit = (e) => {
    e.preventDefault();

    const dados = {};

    for (const campo of tela.campos) {
      const valor = pegar(campo).value;

      dados[campo] = pagina === "notas" ? Number(valor) : valor;
    }

    if (editando && !dados.senha) {
      delete dados.senha;
    }

    const atualizando = Boolean(editando);
    const caminho = atualizando ? `/${pagina}/atualizar/${editando}` : `/${pagina}/cadastrar`;
    const metodo = atualizando ? "PUT" : "POST";

    tentar(async () => {
      await chamar(caminho, metodo, dados);

      sairDaEdicao();
      await carregar();
    }, atualizando ? "Alterado com sucesso." : "Cadastrado com sucesso.");
  };


  lista.onclick = (e) => {
    const idEditar = e.target.dataset.editar;
    const idExcluir = e.target.dataset.excluir;

    if (idEditar) {
      const item = itens.find((i) => String(i[tela.chave]) === idEditar);

      editando = idEditar;

      for (const campo of tela.campos) {
        pegar(campo).value = campo === "senha" ? "" : item[campo];
      }

      if (pagina === "professores") {
        pegar("senha").required = false;
      }

      enviar.textContent = "Salvar alteração";
      cancelar.hidden = false;

      return;
    }

    if (idExcluir && confirm("Excluir este registro?")) {
      tentar(async () => {
        const excluiuProprioPerfil = pagina === "professores"
          && String(idExcluir) === idProfessor;

        if (pagina === "professores" || pagina === "alunos") {
          const notas = await chamar("/notas/listar");

          const possuiNotas = notas.some((nota) => {
            if (pagina === "professores") {
              return nota.professorId === Number(idExcluir);
            }

            return nota.alunoMatricula === Number(idExcluir);
          });

          if (possuiNotas) {
            throw new Error("Exclua primeiro as notas vinculadas a este cadastro.");
          }
        }

        await chamar(`/${pagina}/excluir/${idExcluir}`, "DELETE");

        if (excluiuProprioPerfil) {
          sessionStorage.clear();
          location.replace("login.html");
          return;
        }

        await carregar();
      }, "Excluído.");
    }
  };


  cancelar.onclick = sairDaEdicao;

  carregar().catch((erro) => mensagem(erro.message, true));
}


function iniciarMaterias() {
  chamar("/materias/listar")
    .then((materias) => {
      let html = "";

      for (const materia of materias) {
        html += `<li>${limpar(materia)}</li>`;
      }

      pegar("listaMaterias").innerHTML = html;
    })
    .catch((erro) => mensagem(erro.message, true));
}


function iniciarLogin() {
  pegar("formLogin").onsubmit = (e) => {
    e.preventDefault();

    const email = pegar("email").value.trim();
    const senha = pegar("senha").value;

    tentar(async () => {
      await chamar("/professores/login", "POST", { email, senha });

      const professores = await chamar("/professores/listar");
      const professor = professores.find((p) => p.email === email);

      sessionStorage.setItem("professorLogado", "true");
      sessionStorage.setItem("professorNome", professor?.nome || "Professor");
      sessionStorage.setItem("professorId", professor?.id || "");

      location.href = "home.html";
    }, "Login realizado.");
  };
}


function iniciarCadastro() {
  pegar("formCadastro").onsubmit = (e) => {
    e.preventDefault();

    const dados = {
      nome: pegar("cadastroNome").value,
      email: pegar("cadastroEmail").value,
      senha: pegar("cadastroSenha").value,
      materia: pegar("cadastroMateria").value
    };

    tentar(async () => {
      await chamar("/professores/cadastrar", "POST", dados);

      location.href = "login.html";
    }, "Professor cadastrado.");
  };
}


function iniciar() {
  const sair = pegar("sair");
  const campoProfessor = pegar("professorLogado");

  if (campoProfessor && nomeProfessor) {
    campoProfessor.textContent = `Professor: ${nomeProfessor}`;
  }

  if (sair) {
    sair.onclick = (e) => {
      e.preventDefault();

      sessionStorage.clear();
      location.replace("login.html");
    };
  }

  if (telas[pagina]) iniciarTela(telas[pagina]);
  if (pagina === "materias") iniciarMaterias();
  if (pagina === "login") iniciarLogin();
  if (pagina === "cadastro") iniciarCadastro();
}


if (publica && logado) {
  location.replace("home.html");
} else if (!publica && !logado) {
  location.replace("login.html");
} else {
  iniciar();
}
