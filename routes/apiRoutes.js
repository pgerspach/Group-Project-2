const db = require("../models");

module.exports = function(app, Firebase) {
  app.post("/efforts/create", (req, res) => {
    console.log("here");
    db.efforts
      .create({
        userId: Firebase.firebaseMain.auth().currentUser.uid,
        name:Firebase.firebaseMain.auth().currentUser.displayName,
        header: req.body.header,
        description: req.body.description,
        eventURL: null || req.body.eventURL,
        supports: 0,
        category: req.body.category
      })
      .then(() => {
        res.send("Success");
      })
      .catch(err => {
        console.log(err);
        res.send(err.errorCode);
      });
  });

  app.post("/profile/edit", (req, res) => {
    db.users
      .update(
        {
          firstName: req.body.userName.split(" ")[0],
          lastName: req.body.userName.split(" ")[1] || null,
          proPic: req.body.proPic,
          bio: req.body.bio
        },
        {
          where: {
            id: Firebase.firebaseMain.auth().currentUser.uid
          }
        }
      )
      .then(result => {
        res.send("Success");
      })
      .catch(() => {
        res.send("Failure");
      });
  });
  app.post("/profile/addfriend", (req, res) => {
    db.users
      .findAll({
        where: {
          firstName: req.body.user.split(" ")[0].trim(),
          lastName: req.body.user.split(" ")[1].trim() || null
        }
      })
      .then(friendToAdd => {
        db.friendships
          .findAll({
            where: {
              $or: [
                {
                  uuid_1: friendToAdd[0].id,
                  uuid_2: Firebase.firebaseMain.auth().currentUser.uid
                },
                {
                  uuid_1: Firebase.firebaseMain.auth().currentUser.uid,
                  uuid_2: friendToAdd[0].id
                }
              ]
            }
          })
          .then(isFriend => {
            if (isFriend.length < 1) {
              db.friendships.create({
                uuid_1: Firebase.firebaseMain.auth().currentUser.uid,
                uuid_2: friendToAdd[0].id
              }).then((friendAddResult)=>{
                res.send("Success");
              });
            } else {
              res.send("Friends already");
            }
          });
      }).catch(()=>{
        res.send("Throw error");
      });
  });
};
