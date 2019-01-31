module.exports = function(app, Firebase) {
  app.post("/auth/google", (req, res) => {
    Firebase.firebase.auth().onAuthStateChanged(function(user) {
      // Listen for change in auth status...
      if (user) {
        // User is signed in.
        console.log("User in");
      } else {
        // No user is signed in.
        console.log("User Not");
      }
    });
  });

  fborm.signIn(Firebase.firebase_main, req.body.token).then(resolve =>{
      let userId = fborm.currentUser(Firebase.firebase_main).uid;
      console.log(userId);
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Sign-out successful!")
      }).catch(function(error) {
        // An error happened.
        if(error) throw error;
      });
  })
};
