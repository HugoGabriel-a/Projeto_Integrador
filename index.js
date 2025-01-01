require("dotenv").config();

const db = require("./src/database")

const port=process.env.PORT;

const express= require("express");

const app=express();

app.use(express.json())

//              -----------CONTROLLERS----------
// const logar = require('./Controllers/usuario/logar');
// const logado = require('./Controllers/usuario/logado');
// const deslogar=require('./Controllers/usuario/deslogar')


//              -----------ROTAS CRUD USUARIO----------

// APARECER A MENSAGEM "FUNCIONANDO"
app.get("/",(req,res)=>{
    res.json({
        message:"funcionando"
    })
})
// APARECER TODOS OS USUARIO
app.get("/usuarios", async (req,res)=>{
    const usuarios= await db.select_all_usuario()
    res.json(usuarios)
})
// BUSCAR USUARIO PELO CODIGO
app.get("/usuarios/:cod_usuario", async(req,res)=>{
    const usuario= await db.select_usuario_by_cod_usuario(req.params.cod_usuario)
    res.json(usuario)
})

// INSERIOR USUARIO
app.post("/usuarios", async(req,res)=>{
    await db.insert_into_usuario(req.body)
    res.sendStatus(201)
})
// ATUALIZAR USUARIO PELO CODIGO
app.patch("/usuarios/:cod_usuario", async(req,res)=>{
    await db.update_usuario_by_cod_usuario(req.params.cod_usuario, req.body)
    res.sendStatus(200);
})
// DELETAR USUARIO
app.delete("/usuarios/:cod_usuario", async(req,res)=>{
    await db.remove_usuario_by_cod_usuario(req.params.cod_usuario)
    res.sendStatus(204)
})



//              -----------ROTAS LOGIN----------

app.get('/login', (req, res) => res.sendFile(__dirname + '/frontend/index.html'));

app.get('/privado',(req,res)=>res.send('Somente Usuarios logados podem ver isso'))


app.post('/api/usuario/logar',async(req,res)=>{
    res.send(await logar(req.body));
})

app.get('/api/usuario/deslogar', async(req,res)=>{
    res.send(await deslogar())
})

//              -----------ATUALIZAR----------
app.listen(port);
console.log("backend rodando");
