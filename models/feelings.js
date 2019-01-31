module.exports = function(sequelize, DataTypes) {

    const feelings = sequelize.define("feelings", {
      feeling:{ //likes
        type: DataTypes.INTEGER,
        default:10
      }
    });
    feelings.associate = function(models) {
        feelings.belongsTo(models.users, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  };