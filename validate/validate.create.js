const shortid = require('shortid');
const db = require('./../db');

module.exports.validateCreate = (req, res, next) => {
    var errors = [];
    var username = req.body.name;
    var password = req.body.phone;

    if(!req.body.name){
        errors.push('Name is required !');
    }
    if(!req.body.phone){
        errors.push('Phone is required !');
    }

    if(errors.length > 0 ) {
        console.log(errors);
        res.render("./users/create",{
            errors
        });
        return;
    }
    next();
  }