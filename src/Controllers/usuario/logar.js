const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const usuario = new PrismaClient();
const bcrypt = require('bcryptjs');  // Biblioteca para comparar passwords com hash

async function logar(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ erro: "Dados insuficientes" });
    }

    try {
        const find = await usuario.usuario.findUnique({
            where: { email: email },
        });

        if (!find) {
            return res.status(401).json({ erro: 'Email ou password incorretos' });
        }

        // Verificar se a password fornecida é correta (com bcrypt)
        const passwordCorreto = await bcrypt.compare(password, find.password);

        if (!passwordCorreto) {
            return res.status(401).json({ erro: 'Email ou password incorretos' });
        }

        // Criar o token JWT
        const token = jwt.sign(
            { id: find.id, nome: find.nome },
            'passwordParaProtegerOToken',
            { expiresIn: '1h' }
        );

        // Configurar o cookie com o token
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000, path: '/' });

        return res.status(200).json({ message: "Login realizado com sucesso" });
    } catch (erro) {
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = logar;
