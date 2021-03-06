module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      id:{
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
      },
      firstName: DataTypes.STRING,
      lastName:DataTypes.STRING,
      proPic:{
        type:DataTypes.STRING
      },
      coverPic:{
        type:DataTypes.STRING
      },
      bio:{
        type:DataTypes.TEXT
      }
    });
    users.associate = function(models) {

      users.hasMany(models.efforts, {
        onDelete: "cascade"
      });
    };
  
    return users;
  };