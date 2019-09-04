const shortid = require('shortid');
const db = require('./../db');

module.exports.validateLogin = (req, res, next) => {
    var errors = [];
    var username = req.body.username;
    var password = req.body.password;

    console.log(user);
    if(!req.body.username){
        errors.push('Username is required !');
    }
    if(!req.body.password){
        errors.push('Password is required !');
    }

    if(errors.length > 0 ) {
        console.log(errors);
        res.render("./auths/login",{
            errors
        });
        return;
    }

    var user = db.get('userID').find({username}).value();
    if(!user) {
        res.render("./auths/login",{
            errors:['User does not exist !']
        });
        return;
    }
    if(user.password !== password){
        res.render("./auths/login",{
            errors:['Wrong password !']
        });
        return;     
    }
    res.cookie('userID',user.id)
    next();
  }