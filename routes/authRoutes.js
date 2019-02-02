module.exports = function(app, Firebase) {
  const fborm = require("../firebase/orm/orm.js");
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

        fborm
          .signOutAccount(Firebase.firebaseMain, req)
          .then(result => {
            Firebase.firebaseMain = result.firebase;
            console.log("Sign-out successful!");
            res.send("Success");
          })
          .catch(result => {
            res.status(result.statusCode).send(result.errorCode);
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
        fborm
          .signOutAccount(Firebase.firebaseMain, req)
          .then(result => {
            Firebase.firebaseMain = result.firebase;
            console.log("Sign-out successful!");
            res.send("Success");
          })
          .catch(result => {
            res.status(result.statusCode).send(result.errorCode);
          });
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
        fborm
          .signOutAccount(Firebase.firebaseMain, req)
          .then(result => {
            Firebase.firebaseMain = result.firebase;
            console.log("Sign-out successful!");
            res.send("Success");
          })
          .catch(result => {
            res.status(result.statusCode).send(result.errorCode);
          });
      })
      .catch(result => {
        res.status(result.statusCode).send(result.errorCode);
      });
  });
};
