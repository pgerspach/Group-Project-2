const db = require("../../models");

module.exports = {
  signInGoogle: function(firebase, token) {
    var credential = firebase.auth.GoogleAuthProvider.credential(token);
    return new Promise((resolve, reject) => {
      firebase
        .app()
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(data => {
          resolve({
            statusCode: 200,
            firebase: firebase
          });
        })
        .catch(function(error) {
          reject({
            statusCode: 404,
            errorCODE: error.code
          });
        });
    });
  },
  signInEmail: function(firebase, req) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(data => {
          resolve({
            statusCode: 200,
            firebase: firebase
          });
        })
        .catch(function(error) {
          reject({
            statusCode: 404,
            errorCode: error.code
          });
        });
    });
  },
  signOutAccount: function(firebase, req) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(function() {
          resolve({
            statusCode: 200,
            firebase: firebase
          });
        })
        .catch(function(error) {
          reject({
            statusCode: 404,
            error: errorCode
          });
        });
    });
  },
  signUpEmail: function(firebase, req) {
    return new Promise((resolve, reject) => {
      console.log(req.body);
      firebase
        .auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(data => {
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: req.body.first_name + " " + req.body.last_name,
              photoURL: null
            })
            .then(function() {
              resolve({
                statusCode: 200,
                firebase: firebase
              });
            });
        })
        .catch(function(error) {
          console.log(error.code);
          reject({
            statusCode: 404,
            errorCode: error.code
          });
        });
    });
  },
  currentUser: function(firebase) {
    return firebase.auth().currentUser;
  },
  addUserToMySQL: function(firebase) {
    let userId = firebase.auth().currentUser.uid;

    return new Promise((resolve, reject) => {
      db.users
        .findAll({
          where: {
            id: userId
          }
        })
        .then(result => {
          if (result.length < 1) {
            let userInfo = {
              id: userId,
              firstName: firebase.auth()
                .currentUser
                .displayName.split(" ")[0],
              lastName:
              firebase.auth()
              .currentUser
                  .displayName.split(" ")[1] || null,
              proPic: firebase.auth()
              .currentUser.photoURL || null,
              coverPic: null
            };
            db.users
              .create({
                id: userInfo.id,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                proPic: userInfo.proPic,
                coverPic: userInfo.coverPic
              })
              .then(newUser => {
                db.users
                  .findAll({
                    where: {
                      id: {
                        [db.Sequelize.Op.ne]: newUser.id
                      }
                    }
                  })
                  .then(data => {
                    makeFriends(data);
                    function makeFriends(data) {
                      db.friendships
                        .create({
                          uuid_1: newUser.id,
                          uuid_2: data[data.length - 1].id,
                          status: 2
                        })
                        .then(result => {
                          data.pop();
                          data.pop();
                          if (data.length > 0) {
                            makeFriends(data);
                          } else {
                            resolve("Success");
                            return;
                          }
                        });
                    }
                  });
              });
          } else {
            resolve("User exists");
          }
        });
    });
  }
};
