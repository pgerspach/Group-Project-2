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
  app.post("/signout", (req,res)=>{
    fborm.signOutAccount(Firebase.firebaseMain).then((result)=>{
      res.send("Success");
    })
  })
  app.post("/auth/google", (req, res) => {
    console.log("Here in auth/google post request");
    fborm
      .signInGoogle(Firebase.firebaseMain, req.body.token)
      .then(result => {
        // Firebase.firebaseMain = result.firebase;
        // let userId = fborm.currentUser(Firebase.firebaseMain).uid;
        // console.log(userId);
        fborm.addUserToMySQL(Firebase.firebaseMain).then((result) => {
          console.log(result);
          res.send("Success");
        });
      })
      .catch(result => {
        res.send(result.errorCode);
      });
  });

  app.post("/auth/email", (req, res) => {
    console.log("Here in auth/email post request");
    //fborm.signInEmail(Firebase.firebaseMain)...
    if (fborm.currentUser(Firebase.firebaseMain) !== null) {
      fborm.signOutAccount(Firebase.firebaseMain).then(() => {
        fborm
          .signInEmail(Firebase.firebaseMain, req)
          .then(result => {
            Firebase.firebaseMain = result.firebase;
            let userId = fborm.currentUser(Firebase.firebaseMain).uid;
            res.send("Success");
          })
          .catch(result => {
            if (result.errorCode == "auth/user-not-found") {
              res.send("Create user");
            } else {
              res.send(result.errorCode);
            }
          });
      });
    } else {
      fborm
        .signInEmail(Firebase.firebaseMain, req)
        .then(result => {
          Firebase.firebaseMain = result.firebase;
          let userId = fborm.currentUser(Firebase.firebaseMain).uid;
          res.send("Success");
        })
        .catch(result => {
          res.send(result.errorCode);
        });
    }
  });

  app.post("/auth/email/create", (req, res) => {

    if (fborm.currentUser(Firebase.firebaseMain) !== null) {
      fborm.signOutAccount(Firebase.firebaseMain).then(() => {
        fborm
          .signUpEmail(Firebase.firebaseMain, req)
          .then(result => {
            fborm.addUserToMySQL(Firebase.firebaseMain).then((result) => {
              console.log(result);
              res.send("Success");
            });
          })
          .catch(result => {
            console.log("hello");
            res.send(result.errorCode);
          });
      });
    } else {
      fborm
        .signUpEmail(Firebase.firebaseMain, req)
        .then(result => {
          fborm.addUserToMySQL(Firebase.firebaseMain).then((result) => {
            console.log(result);
            res.send("Success");
          });
        })
        .catch(result => {
          res.send(result.errorCode);
        });
    }
  });
};
