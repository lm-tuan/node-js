const shortid = require("shortid");
const db = require("./../db");
const User = require("./../models/user.model");

module.exports.index = (req, res, next) => {
  User.find({}).exec((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render("./users/index", {
        users
      });
    }
  });
  //var users = db.get("users").value();
  // res.render("./users/index", {
  //   users
  // });
};

module.exports.searchUser = (req, res, next) => {
  // var users = db.get("users").value();
  var name = req.query.q;
  //var users = [];
  User.find({}).exec((err, users) => {
    if (err) {
      console.log(err);
    } else {
      var newUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      });
      res.render("./users/search", {
        users: newUsers,
        matchValue: name
      });
    }
  });
};

module.exports.createUser = (req, res, next) => {
  res.render("./users/create");
};

module.exports.detailUser = (req, res, next) => {
  var id = req.params.id;
  console.log(id);
  User.find({ _id: id }).exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      res.render("./users/detail", {
        user:user[0]
      });
    }
  });

  // var user = db
  //   .get("users")
  //   .find({ id })
  //   .value();
  // res.render("./users/detail", {
  //   user
  // });
};
module.exports.editUser = (req, res, next) => {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id })
    .value();
  res.render("./users/edit", {
    user
  });
};

module.exports.deleteUser = (req, res, next) => {
  var id = req.params.id;
  User.remove({_id:id}, (err) =>{
    if(err) {
      console.log(err);
    }else{
      res.redirect("/user");
    }
  })
  // db.get("users")
  //   .remove({ id })
  //   .write();
  // res.redirect("/user");
};

module.exports.createPost = (req, res, next) => {
  let user = {
    id: shortid.generate(),
    name: req.body.name,
    phone: req.body.phone
  };
  db.get("users")
    .push(user)
    .write();
  res.redirect("/user");
};

module.exports.UpdatePost = (req, res, next) => {
  let user = {
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone
  };
  console.log(req.body.id);
  db.get("users")
    .find({ id: req.body.id })
    .assign(user)
    .write();
  res.redirect("/user");
};
