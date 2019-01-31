module.exports = function(app, Firebase) {
  const fborm = require("../firebase/orm/orm.js");
  app.post("/auth/google", (req, res) => {
    console.log("Here");

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

    fborm.signIn(Firebase.firebaseMain, req.body.token).then(resolve => {
      let userId = fborm.currentUser(Firebase.firebaseMain).uid;
      console.log(userId);
      Firebase.firebaseMain
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("Sign-out successful!");
          res.send("Success");
        })
        .catch(function(error) {
          // An error happened.
          console.log("There was an error");
          res.send("Failure: "+error);
          // if (error) throw error;
        });
    });
  });
};
