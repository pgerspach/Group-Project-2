const firebase = require("firebase");
const firebase_admin = require("firebase-admin");
const admin = require("./admin/admin.js")(firebase_admin);

firebase.initializeApp(require("./config.js"));

const Firebase = {firebaseMain:firebase,admin:admin};

module.exports = Firebase;