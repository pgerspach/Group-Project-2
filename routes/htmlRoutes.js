var db = require("../models");
var fborm = require("../firebase/orm/orm.js");
const axios = require("axios");

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
    if (Firebase.firebaseMain.auth().currentUser === null) {
      res.render("home");
    } else {
      let uid = Firebase.firebaseMain.auth().currentUser.uid;
      fetchUserData(uid, res);
    }
  });

  app.post("/search", (req, res) => {
    console.log("keyword: " + req.body.keyword);
    if (req.body.keyword === "Search user") {
      db.users
        .findAll({
          where: {
            firstName: req.body.city.split(" ")[0].trim(),
            lastName: req.body.city.split(" ")[1].trim()
          }
        })
        .then(result => {
          if (result.length > 0) {
            fetchUserData(result[0].id, res);
          } else {
            res.sendStatus(404);
          }
        });
    } else {
      req.body.city = req.body.city.replace(/ /g, "+");
      axios
        .get(
          `http://www.eventbriteapi.com/v3/events/search/?q=${
            req.body.keyword
          }&location.address=${req.body.city}&token=${
            process.env.EVENTBRITE_OAUTH_TOKEN
          }`
        )
        .then(resp => {
          const events = resp.data.events.map(e => {
            e.description.text = `${e.description &&
              e.description.text &&
              e.description.text.substring(0, 200)}...`;
            return e;
          });
          res.render("events", { events });
        })
        .catch(err => {
          console.log("errrrrrrr", err);
          res.send(err);
        });
    }
  });

  app.get("/events", (req, res) => {
    res.render("events");
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  /*app.post('/search', (req, res) => {
    const searchTerm = req.body.search;
    console.log('req.bodyyyyyy', req.body, 'req sessssooooonnnn', req.session.efforts.length);
    req.session.efforts = req.session.efforts.filter(effort => effort.header.includes(searchTerm) || effort.description.includes(searchTerm));
    console.log('after filter', req.session.efforts.length);
  });*/

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
              },
              order: [["updatedAt", "DESC"]]
            })
            .then(data => {
              //console.log('efffortsssssss', data.map(e => console.log('eachhhhhh efffff', e.category)))
              req.session.efforts = data;
              res.render("home", {
                efforts: data,
                proPic: fborm.currentUser(Firebase.firebaseMain).photoURL,
                user: fborm.currentUser(Firebase.firebaseMain).displayName
              });
            })
            .catch(err => {
              throw err;
            });
        });
    }
  }

  function fetchUserData(currentUserId, res) {
    db.users
      .findAll({
        where: {
          id: currentUserId
        }
      })
      .then(userData => {
        db.efforts
          .findAll({
            where: {
              userId: currentUserId
            }
          })
          .then(data => {
            console.log(userData);
            res.render("profile", {
              efforts: data,
              proPic: userData[0].proPic,
              bio: userData[0].bio,
              userName: userData[0].firstName + " " + userData[0].lastName
            });
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  }
};
