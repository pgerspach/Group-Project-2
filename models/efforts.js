module.exports = function(sequelize, DataTypes) {

  const efforts = sequelize.define("efforts", {
    header:DataTypes.STRING,
    name:DataTypes.STRING,
    description: DataTypes.STRING,
    eventURL:{
      type: DataTypes.STRING,
      default:null
    },
    supports:{ //likes
      type: DataTypes.INTEGER,
      default:0
    },
    category:{
      type:DataTypes.STRING,
      default:"General Wellness"
    }
  });

  efforts.associate = function(models) {
    efforts.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return efforts;
};
