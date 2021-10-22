
const inviteCodeChars = "BCDFGHJKLMNPQRSTVWXYZ0123456789";
const inviteCodeLength = 8;


module.exports = function(sequelize, DataTypes) {
    
    const Team = sequelize.define("Team", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        invite_code: {
            type: DataTypes.STRING
        },
    });
    
    Team.associate = function (models) {
        Team.hasMany(models.User);
        Team.hasMany(models.Chore, {
          onDelete: "cascade"
        });
    };
    
    Team.addHook("beforeCreate", function(team) {
        let invite_code = "";

        for (let i = 0; i < inviteCodeLength; i++) {
            const randomIndex = Math.floor(Math.random() * inviteCodeChars.length);
            invite_code += inviteCodeChars[randomIndex];
        }

        team.invite_code = invite_code;
    });


    return Team
};