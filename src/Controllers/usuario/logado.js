const jsonwbtoken= require("jsonwebtoken")
const { tokenToString } = require("typescript")


async function logado(req,res,next) {
    
    auth=req.cookie.token ||null

    if(typeof(auth)=='undefined' || auth==''||auth==null){
        return res.send({erro:{login:'não autorizado'}})
    }else{
        try{
            token =await jsonwbtoken.verify(auth,'passwordParaProtegerOToken')
            next()
        }catch(err){
            return res.send({erro:{ }})
        }
    }
}

module.exports=logado