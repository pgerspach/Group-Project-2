const db = require("../models");

module.exports = function(app, Firebase) {
  app.post("/efforts/create", (req,res)=>{
    console.log("here")
    db.efforts.create({
      userId:Firebase.firebaseMain.auth().currentUser.uid,
      header:req.body.header,
      description:req.body.description,
      eventURL:null||req.body.eventURL,
      supports:0,
      category:req.body.category
    }).then(()=>{
      res.send("Success");
    }).catch((err)=>{
      console.log(err);
      res.send(err.errorCode);
    })
  })
};
