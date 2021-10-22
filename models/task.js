
module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
  
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
      repeats: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }, 
  
      repeated_days: {
        type: DataTypes.STRING,
        allowNull: true
      },
    
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    });
    Task.associate = function (models) {
     
      Task.belongsTo(models.Team, {
          foreignKey: {
              allowNull: false
          }
      });
      
      Task.hasMany(models.Repetition, {
        onDelete: "cascade"
      });
  };
    return Task;
  };