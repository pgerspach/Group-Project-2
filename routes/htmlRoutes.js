var db = require("../models");
var fborm = require("../firebase/orm/orm.js");
const axios = require('axios');

module.exports = function(app, Firebase) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("login");
  });
  app.get("/home", function(req, res) {
    fetchHomeData(req, res);
  });
  app.get("/profile", function(req, res) {
    fetchUserData(req, res);
  });

  app.post('/search', (req, res) => {
    req.body.city = req.body.city.replace(/ /g, "+");
    console.log('res bodieeeeeeee', req.body);
    axios.get(`http://www.eventbriteapi.com/v3/events/search/?q=${req.body.keyword}&location.address=${req.body.city}&token=${process.env.EVENTBRITE_OAUTH_TOKEN}`)
    .then(resp => {
      const events = resp.data.events.map(e => {
        e.description.text = `${e.description && e.description.text && e.description.text.substring(0, 200)}...`;
        return e;
      })
      res.render('events', {events});
    }).catch(err => {
      console.log('errrrrrrr', err)
      res.send(err);
    });
  });

  app.get('/events', (req, res) => {
    res.render('events');
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
              }
            })
            .then(data => {
              //console.log('efffortsssssss', data.map(e => console.log('eachhhhhh efffff', e.category)))
              req.session.efforts = data;
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
