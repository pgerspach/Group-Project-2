module.exports = function(app, Firebase) {
  const fborm = require("../firebase/orm/orm.js");
  app.post("/auth/google", (req, res) => {
    console.log("Here in auth/google post request");

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

  app.post("/auth/email", (req,res)=>{
    console.log("Here in auth/email post request");
    Firebase.firebaseMain.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(()=>{
      Firebase.firebaseMain.auth().signOut().then(function() {
        console.log("Sign out successful");
        // Sign-out successful.
        res.send("Sign out successful");
      }).catch(function(error) {
        console.log(error);
        res.sendStatus(404);
      });
    }).catch(function(error) {
      if(error.code === "auth/user-not-found"){
        Firebase.firebaseMain.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then((createUserResult)=>{
          res.send("user created!" +createUserResult);
          Firebase.firebaseMain.auth().signOut().then(function() {
            console.log("Sign out successful");
            // Sign-out successful.
          }).catch(function(error) {
            console.log(error);
            res.sendStatus(404);
          });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      }else if(error.code === "auth/invalid-email"){
        res.send("email must be in proper format");
      }
       //var errorCode = error.code;
      //var errorMessage = error.message;
      // ...
    });

  })
};
