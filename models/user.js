module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      id:{
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
      },
      name: DataTypes.STRING,
      proPic:{
        type:DataTypes.STRING
      },
      coverPic:{
        type:DataTypes.STRING
      }
    });
    users.associate = function(models) {

      users.hasMany(models.efforts, {
        onDelete: "cascade"
      });
    };
  
    return users;
  };