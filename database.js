async function connect(){

    if(global.connection)
        return global.connection.connect()


    const {Pool}=require("pg");
    const pool= new Pool({
        connectionString:process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("conectado")

    const res= await client.query("SELECT NOW()");
    console.log(res.rows)
    client.release()

    global.connection=pool;
    return pool.connect()
}

connect()

async function select_all_usuario(){
    const user = await connect()
    const res = await user.query("SELECT * FROM usuario")
    return res.rows
}
async function select_usuario_by_cod_usuario(cod_usuario) {
    const user= await connect()
    const res= await user.query("SELECT * FROM usuario WHERE cod_usuario=$1",[cod_usuario])
    return res.rows
}

// async function insert_into_usuario(ususario){
//     const user= await connect()
//     const cod_sql= await user.query("INSERT INTO usuario(nome,email,password) VALUES ($1,$2,$3)",[ususario.nome,ususario.email,ususario.password] )
// }
async function insert_into_usuario(usuario){
    const user = await connect();
    return await user.query('INSERT INTO usuario(nome,email,password) VALUES ($1,$2,$3);', [usuario.nome, usuario.email, usuario.password]);
}

async function update_usuario_by_cod_usuario(cod_usuario,usuario) {
    const user= await connect();
    await user.query("UPDATE usuario SET nome=$1, email=$2, password=$3 WHERE cod_usuario=$4",[usuario.nome,usuario.email,usuario.password,cod_usuario])
}

async function remove_usuario_by_cod_usuario(cod_usuario){
    const user=await connect();
    await user.query("DELETE FROM usuario WHERE cod_usuario=$1",[cod_usuario])
}
module.exports={
    select_all_usuario,
    select_usuario_by_cod_usuario,
    insert_into_usuario,
    update_usuario_by_cod_usuario,
    remove_usuario_by_cod_usuario

}