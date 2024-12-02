-- CreateTable
CREATE TABLE "usuario" (
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cod_usuario" SERIAL NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("cod_usuario")
);

-- CreateTable
CREATE TABLE "disciplina" (
    "cod_disc" SERIAL NOT NULL,
    "nome_disc" TEXT NOT NULL,

    CONSTRAINT "disciplina_pkey" PRIMARY KEY ("cod_disc")
);

-- CreateTable
CREATE TABLE "assunto" (
    "cod_assunto" SERIAL NOT NULL,
    "nome_assunto" TEXT NOT NULL,
    "cod_disc" INTEGER NOT NULL,

    CONSTRAINT "assunto_pkey" PRIMARY KEY ("cod_assunto")
);

-- CreateTable
CREATE TABLE "questao" (
    "cod_questao" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "resposta_esperada" TEXT NOT NULL,
    "cod_usuario" INTEGER NOT NULL,
    "cod_assunto" INTEGER NOT NULL,

    CONSTRAINT "questao_pkey" PRIMARY KEY ("cod_questao")
);

-- CreateTable
CREATE TABLE "prova" (
    "cod_prova" SERIAL NOT NULL,
    "nome_prova" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prova_pkey" PRIMARY KEY ("cod_prova")
);

-- CreateTable
CREATE TABLE "cabecalho" (
    "cod_cabecalho" SERIAL NOT NULL,
    "cod_prova" INTEGER NOT NULL,
    "nome_cabecalho" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "data_prova" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imagem" TEXT,

    CONSTRAINT "cabecalho_pkey" PRIMARY KEY ("cod_cabecalho")
);

-- CreateTable
CREATE TABLE "_QuestaoAssunto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_QuestaoAssunto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProvaAssunto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProvaAssunto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_QuestaoProva" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_QuestaoProva_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cabecalho_cod_prova_key" ON "cabecalho"("cod_prova");

-- CreateIndex
CREATE INDEX "_QuestaoAssunto_B_index" ON "_QuestaoAssunto"("B");

-- CreateIndex
CREATE INDEX "_ProvaAssunto_B_index" ON "_ProvaAssunto"("B");

-- CreateIndex
CREATE INDEX "_QuestaoProva_B_index" ON "_QuestaoProva"("B");

-- AddForeignKey
ALTER TABLE "assunto" ADD CONSTRAINT "assunto_cod_disc_fkey" FOREIGN KEY ("cod_disc") REFERENCES "disciplina"("cod_disc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questao" ADD CONSTRAINT "questao_cod_usuario_fkey" FOREIGN KEY ("cod_usuario") REFERENCES "usuario"("cod_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cabecalho" ADD CONSTRAINT "cabecalho_cod_prova_fkey" FOREIGN KEY ("cod_prova") REFERENCES "prova"("cod_prova") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestaoAssunto" ADD CONSTRAINT "_QuestaoAssunto_A_fkey" FOREIGN KEY ("A") REFERENCES "assunto"("cod_assunto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestaoAssunto" ADD CONSTRAINT "_QuestaoAssunto_B_fkey" FOREIGN KEY ("B") REFERENCES "questao"("cod_questao") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProvaAssunto" ADD CONSTRAINT "_ProvaAssunto_A_fkey" FOREIGN KEY ("A") REFERENCES "assunto"("cod_assunto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProvaAssunto" ADD CONSTRAINT "_ProvaAssunto_B_fkey" FOREIGN KEY ("B") REFERENCES "prova"("cod_prova") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestaoProva" ADD CONSTRAINT "_QuestaoProva_A_fkey" FOREIGN KEY ("A") REFERENCES "prova"("cod_prova") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestaoProva" ADD CONSTRAINT "_QuestaoProva_B_fkey" FOREIGN KEY ("B") REFERENCES "questao"("cod_questao") ON DELETE CASCADE ON UPDATE CASCADE;
