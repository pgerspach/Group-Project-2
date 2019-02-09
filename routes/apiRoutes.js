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
  });

  app.post("/profile/edit", (req, res)=>{
    db.users.update({
      firstName: req.body.userName.split(" ")[0],
      lastName:req.body.userName.split(" ")[1]||null,
      proPic:req.body.proPic,
      bio:req.body.bio
    },
    {
      where:{
        id:Firebase.firebaseMain.auth().currentUser.uid
      }
    }).then((result)=>{
      res.send("Success");
    }).catch(()=>{
      res.send("Failure");
    })
  })
};
