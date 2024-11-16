require("dotenv").config();


const db = require("./database")

const port=process.env.PORT;

const express= require("express");

const app=express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.json({
        message:"funcionando"
    })
})
app.get("/usuarios", async (req,res)=>{
    const usuarios= await db.select_all_usuario()
    res.json(usuarios)
})

app.get("/usuarios/:cod_usuario", async(req,res)=>{
    const usuario= await db.select_usuario_by_cod_usuario(req.params.cod_usuario)
    res.json(usuario)
})
app.post("/usuarios", async(req,res)=>{
    await db.insert_into_usuario(req.body)
    res.sendStatus(201)
})

app.patch("/usuarios/:cod_usuario", async(req,res)=>{
    await db.update_usuario_by_cod_usuario(req.params.cod_usuario, req.body)
    res.sendStatus(200);
})

app.delete("/usuarios/:cod_usuarios", async(req,res)=>{
    await db.remove_usuario_by_cod_usuario(req.params.cod_usuarios)
    res.sendStatus(204)
})
app.listen(port);

console.log("backend rodando");

