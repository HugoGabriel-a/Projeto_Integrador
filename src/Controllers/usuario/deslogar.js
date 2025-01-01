async function deslogar(req,res) {
    res.Clearcookies('token')
    res.redirect('/')
}

module.exports= deslogar