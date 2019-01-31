module.exports = function(admin) {
    let serviceAccount = require("./admin.js");
  
    let adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://uwell-ecd0e.firebaseio.com"
    });
    return adminApp;
  };