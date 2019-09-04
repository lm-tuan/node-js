const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    name:String,
    phone:String
});

const User = mongooose.model('users',userSchema);
module.exports = User;