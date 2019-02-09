require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const session = require('express-session');

var db = require("./models");

var app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(express.static("public"));
const oneDay = 60000 * 60 * 24;
app.use(session({
  key: 'user_sid',
  secret: 'anything',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: oneDay }
}));

//Firebase
const Firebase = require("./firebase/firebase.js");

// Routes
require("./routes/apiRoutes")(app, Firebase);
require("./routes/htmlRoutes")(app, Firebase);
require("./routes/authRoutes")(app, Firebase);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
var PORT = process.env.PORT || 3000;


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    require("./seeds/seeds.js")();

    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
