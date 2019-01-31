module.exports = {
    signIn: function(firebase, token) {
      var credential = firebase.auth.GoogleAuthProvider.credential(
        // get user credential from token provided by client
        token
      );
      console.log(credential);
      return new Promise((resolve, reject) => {
        firebase
          .app()
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(data => {
            resolve({
              statusCode: 200,
              data: data
            });
          })
          .catch(function(error) {
            console.log("Here in sign in failed");
            resolve({
              statusCode: 404,
              data: error
            });
          });
      });
  
    },
    currentUser:function(firebase){
      return firebase.auth().currentUser;
    }
  };