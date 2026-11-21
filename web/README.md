# Média Bimestral - Frontend 

Interface web simples para consumir a API do projeto Média Bimestral. Ela permite que professores entrem no sistema, cadastrem alunos, lancem notas e consultem as matérias aceitas.

## Documentação relacionada

- [Backend Média Bimestral](../README.md)

## Tecnologias

- HTML
- CSS
- JavaScript
- API REST Média Bimestral

## Como funcionas

O arquivo `script.js` envia as requisições com `fetch` e atualiza as tabelas na própria página. Não há bibliotecas ou framework: a lógica foi mantida direta para facilitar o entendimento.

## Telas

### Login

Tela de entrada do professor, com acesso ao cadastro inicial quando necessário.

![Tela de login do professor](../assets/screenshots/screenshot4.png)

### Cadastro de professor

Permite criar o primeiro professor antes de acessar o sistema.

![Tela de cadastro de professor](../assets/screenshots/screenshot5.png)

### Início

Apresenta os atalhos para professores, alunos, notas e matérias, além do nome do professor logado.

![Página inicial do sistema](../assets/screenshots/screenshot6.png)

### Professores

Reúne formulário de cadastro e tabela para editar ou excluir professores.

![Página de professores](../assets/screenshots/screenshot7.png)

### Alunos

Permite cadastrar alunos e visualizar a matrícula gerada para cada registro.

![Página de alunos](../assets/screenshots/screenshot8.png)

### Notas

Recebe as quatro notas, a matrícula do aluno e o ID do professor. A média é calculada pela API.

![Página de notas](../assets/screenshots/screenshot9.png)

### Matérias

Lista as matérias aceitas no cadastro de professores.

![Página de matérias](../assets/screenshots/screenshot10.png)

## Fluxo de acesso

1. Abra `login.html`.
2. Se ainda não houver professor cadastrado, acesse `cadastro.html` pelo botão **Cadastrar professor**.
3. Depois do login válido, o sistema salva os dados básicos da sessão no navegador e abre `home.html`.
4. As páginas internas redirecionam para o login caso não exista sessão.
5. O nome do professor aparece no menu; **Sair** encerra a sessão.

> O controle de acesso atual é feito no navegador com `sessionStorage`. A API ainda não usa token para proteger as rotas.

## Páginas

| Página | Função |
| --- | --- |
| `login.html` | Entrada do professor no sistema |
| `cadastro.html` | Cadastro inicial de professor |
| `home.html` | Página inicial com atalhos |
| `professores.html` | Cadastro, listagem, edição e exclusão de professores |
| `alunos.html` | Cadastro, listagem, edição e exclusão de alunos |
| `notas.html` | Cadastro, listagem, edição e exclusão de notas |
| `materias.html` | Consulta das matérias aceitas |

## Cadastro e edição

As páginas de professores, alunos e notas usam o mesmo formulário para cadastrar e editar. Ao clicar em **Editar**, os campos são preenchidos e o botão passa a salvar a alteração. **Cancelar** limpa o formulário e volta ao modo de cadastro.

Para cadastrar uma nota, informe a matrícula do aluno, o ID do professor e os quatro bimestres. A média final é calculada pela API.

Um professor ou aluno com notas vinculadas não pode ser excluído antes das notas. O sistema informa essa situação para evitar erro no banco.

Se o professor excluir o próprio cadastro, a sessão é apagada e a tela de login é aberta novamente.

## Estrutura

```text
web/
├── home.html
├── login.html
├── cadastro.html
├── professores.html
├── alunos.html
├── notas.html
├── materias.html
├── style.css
└── script.js
```

- `style.css`: aparência e paleta roxa/azul-escura.
- `script.js`: sessão, chamadas à API, cadastro, edição, exclusão e listagens.
