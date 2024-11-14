module.exports = {
    estaAutenticado: (req, res, next) => {

        if(req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    },
    esAdmin: (req, res, next) => {

        if(req.session.user && req.session.user.perfil==='admin') {
            next();
        } else {
            res.redirect('/login');
        }
    },
    esComprador: (req, res, next) => {

        if(req.session.user && (req.session.user.perfil==='comprador' || req.session.user.perfil==='admin')) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}