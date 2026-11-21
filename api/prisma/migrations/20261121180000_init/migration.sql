-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Materia" AS ENUM ('MATEMATICA', 'PORTUGUES', 'HISTORIA', 'GEOGRAFIA');

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "materia" "Materia" NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "matricula" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" SERIAL NOT NULL,
    "alunoMatricula" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "bimestre1" DOUBLE PRECISION,
    "bimestre2" DOUBLE PRECISION,
    "bimestre3" DOUBLE PRECISION,
    "bimestre4" DOUBLE PRECISION,
    "mediaFinal" DOUBLE PRECISION,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_alunoMatricula_fkey" FOREIGN KEY ("alunoMatricula") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
