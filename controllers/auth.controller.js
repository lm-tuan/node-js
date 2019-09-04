
const db = require('./../db');
const md5 = require('md5')



module.exports.index = (req, res, next) => {
    if(req.signedCookies.userID){
        res.redirect("/user"); 
    }
    res.render("./auths/login",{
        errors:[]
    });
  }

module.exports.loginPost = (req, res, next) => {
    var errors = [];
    var username = req.body.username;
    var password = md5(req.body.password);

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
    res.cookie('userID',user.id,{
        signed:true
    })
    res.redirect("/user");
  }

module.exports.logout = (req, res, next) => {
    if(!req.signedCookies.userID){
        res.redirect('/login');
        return;
    }
    res.clearCookie("userID");
    res.redirect('/login');

}  

