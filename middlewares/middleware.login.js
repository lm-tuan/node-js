const db = require('./../db');

module.exports.middlewareLogin = (req, res, next) => {
    if(!req.signedCookies.userID){
        res.redirect('/login');
        return;
    }
    var user = db.get('userID').find({id:req.signedCookies.userID}).value();

    if(!user){
        res.redirect('/login');
        return;
    }
    res.locals.user = user;
    next();
  
}