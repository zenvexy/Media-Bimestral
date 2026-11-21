require("dotenv").config();

const prisma = require("../src/data/prisma");
const { hashSenha } = require("../src/models/login");

async function main() {
    await prisma.nota.deleteMany();
    await prisma.aluno.deleteMany();
    await prisma.professor.deleteMany();

    const senha = await hashSenha("senha123");

    const ana = await prisma.professor.create({
        data: {
            nome: "Ana Silva",
            email: "ana@escola.com",
            materia: "MATEMATICA", 
            senha
        }
    });

    const bruno = await prisma.professor.create({
        data: {
            nome: "Bruno Costa",
            email: "bruno@escola.com",
            materia: "PORTUGUES",
            senha
        }
    });

    const carla = await prisma.professor.create({
        data: {
            nome: "Carla Souza",
            email: "carla@escola.com",
            materia: "HISTORIA",
            senha
        }
    });

    const diego = await prisma.professor.create({
        data: {
            nome: "Diego Lima",
            email: "diego@escola.com",
            materia: "GEOGRAFIA",
            senha
        }
    });

    const professores = [ana, bruno, carla, diego];

    const alunos = [
        { nome: "Aluno um", notas: [8, 7.5, 9, 8.5] },
        { nome: "Aluno dois", notas: [7, 8, 7.5, 9] },
        { nome: "Aluno três", notas: [9, 8.5, 8, 9.5] },
        { nome: "Aluno quatro", notas: [6.5, 7, 8, 7.5] },
        { nome: "Aluno cinco", notas: [8.5, 9, 8, 7] }
    ];

    for (let i = 0; i < alunos.length; i++) {
        const [b1, b2, b3, b4] = alunos[i].notas;

        const aluno = await prisma.aluno.create({
            data: {
                nome: alunos[i].nome
            }
        });

        await prisma.nota.create({
            data: {
                alunoMatricula: aluno.matricula,
                professorId: professores[i % 4].id,
                bimestre1: b1,
                bimestre2: b2,
                bimestre3: b3,
                bimestre4: b4,
                mediaFinal: (b1 + b2 + b3 + b4) / 4
            }
        });
    }

    console.log("Seed concluído");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());