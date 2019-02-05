module.exports = function(app, Firebase) {
  const fborm = require("../firebase/orm/orm.js");
  const db = require("../models");
  Firebase.firebaseMain.auth().onAuthStateChanged(function(user) {
    // Listen for change in auth status...
    if (user) {
      // User is signed in.
      console.log("User in");
    } else {
      // No user is signed in.
      console.log("User Not");
    }
  });

  app.post("/auth/google", (req, res) => {
    console.log("Here in auth/google post request");
    fborm
      .signInGoogle(Firebase.firebaseMain, req.body.token)
      .then(result => {
        Firebase.firebaseMain = result.firebase;
        let userId = fborm.currentUser(Firebase.firebaseMain).uid;
        console.log(userId);

        db.users
          .findAll({
            where: {
              id: userId
            }
          })
          .then(result => {
            if (result.length < 1) {
              console.log("user id: " + userId);
              let userInfo = {
                id: userId,
                firstName: fborm
                  .currentUser(Firebase.firebaseMain)
                  .displayName.split(" ")[0],
                lastName:
                  fborm
                    .currentUser(Firebase.firebaseMain)
                    .displayName.split(" ")[1] || null,
                proPic:
                  fborm.currentUser(Firebase.firebaseMain).photoURL || null,
                coverPic: null
              };
              fborm.addUserToMySQL(userInfo).then(() => {
                console.log("here in successful addition to sql");
                res.send("Success");
              });
            } else {
              res.send("Success");
            }
          });
      })
      .catch(result => {
        res.status(result.statusCode).send(result.errorCode);
      });

      
  });

  app.post("/auth/email", (req, res) => {
    console.log("Here in auth/email post request");
    //fborm.signInEmail(Firebase.firebaseMain)...
    fborm
      .signInEmail(Firebase.firebaseMain, req)
      .then(result => {
        Firebase.firebaseMain = result.firebase;
        let userId = fborm.currentUser(Firebase.firebaseMain).uid;
        console.log(userId);
        res.send("Success");
      })
      .catch(result => {
        res.status(result.statusCode).send(result.errorCode);
      });
  });

  app.post("/auth/email/create", (req, res) => {
    fborm
      .signUpEmail(Firebase.firebaseMain, req)
      .then(result => {
        Firebase.firebaseMain = result.firebase;
        let userId = fborm.currentUser(Firebase.firebaseMain).uid;
        console.log(userId);
        res.send("user created!");
        console.log(req);
        res.send("Success");
      })
      .catch(result => {
        res.status(result.statusCode).send(result.errorCode);
      });
  });
};