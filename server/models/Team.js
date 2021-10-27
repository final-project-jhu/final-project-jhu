const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const inviteCodeChars = "BCDFGHJKLMNPQRSTVWXYZ0123456789";
const inviteCodeLength = 8;


const userSchema = new Schema({
        team: {
            type: STRING,
            allowNull: false,
        },
        invite_code: {
            type: DataTypes.STRING
        },

    });
    
// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


Team.associate = function (models) {
    Team.hasMany(models.User);
    Team.hasMany(models.Task, {
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


const User = mongoose.model('User', userSchema);

module.exports = User;
