module.exports = function (sequelize, DataTypes) {

    var Attempt = sequelize.define("Attempt", {

        attempt: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        repeats: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });


    attempt.associate = function (models) {

        Attempt.belongsTo(models.Task, {
            foreignKey: {
                allowNull: false
            }
        });

        Task.hasMany(models.User, {
            onDelete: "cascade"
        });
    };
    return Attempt;
};