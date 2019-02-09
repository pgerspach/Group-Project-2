var db = require("../models");
var fborm = require("../firebase/orm/orm.js");
module.exports = function(app, Firebase) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("login");
  });
  app.get("/login", function(req, res) {
    res.render("login");
  });
  app.get("/home", function(req, res) {
    fetchHomeData(req, res);
  });
  app.get("/profile", function(req, res) {
    fetchUserData(req, res);
  });

  function fetchHomeData(req, res) {
    if (fborm.currentUser(Firebase.firebaseMain) === null) {
      res.render("login", {});
    } else {
      let currentUserId = fborm.currentUser(Firebase.firebaseMain).uid;
      db.friendships
        .findAll({
          where: {
            $or: [
              {
                uuid_1: {
                  $eq: currentUserId
                }
              },
              {
                uuid_2: {
                  $eq: currentUserId
                }
              }
            ]
          }
        })
        .then(result => {
          let friends = [];
          if (result.length !== 0) {
            for (let friend of result) {
              if (friend.uuid_1 === currentUserId) {
                friends.push({ UserId: { $eq: friend.uuid_2 } });
              } else {
                friends.push({ UserId: { $eq: friend.uuid_1 } });
              }
            }
          }
          console.log(friends);
          db.efforts
            .findAll({
              where: {
                $or: friends
              }
            })
            .then(data => {
              res.render("home", {
                efforts: data,
                proPic: fborm.currentUser(Firebase.firebaseMain).photoURL
              });
            })
            .catch(err => {
              throw err;
            });
        });
    }
  }

  function fetchUserData(req, res) {
    if (fborm.currentUser(Firebase.firebaseMain) === null) {
      res.render("login");
    } else {
      let currentUserId = fborm.currentUser(Firebase.firebaseMain).uid;

      db.efforts
        .findAll({
          where: {
            usersId: currentUserId
          }
        })
        .then(data => {
          res.render("profile", {
            efforts: data,
            proPic: fborm.currentUser(Firebase.firebaseMain).photoURL
          });
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
