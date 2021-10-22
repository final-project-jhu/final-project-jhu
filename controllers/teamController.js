
const db = require("../models");

module.exports = {

  getInfo(req, res) {
    if (!req.user) {
      return res.status(401).end();
    }


  
    db.Team.findOne({
      where: { id: req.user.TeamId },
      include: db.User,
    })
      .then(team => {
        
        return res.json({
          name: team.name,
          invite_code: team.invite_code,
          members: team.Users.map(user => ({ id: user.id, name: user.name, color: user.color }))
        });
      })

      .catch(err => {
        console.log(err);
        res.status(500).end();
      });
  },

  findMembers(req, res) {
    
    
    db.User.findAll({ where: { teamId: req.user.TeamId } })
      .then(data => res.json(
        data.map((row) => ({
          id: row.dataValues.id,
          name: row.dataValues.name,
          color: row.dataValues.color,
        }))
      ))
      .catch(err => {
        console.log(err);
        res.status(500).end();
      });
  },


  getInviteCode(req, res) {
    db.Team.findOne({ where: { id: req.query.id } })
      .then(data => res.json(data.invite_code))
      .catch(err => {
        console.log(err);
        res.status(500).end();
      });
  },

  joinTeam(req, res) {
      if (!req.user) {
        return res.status(401).end(); 
      }
      
      db.Team.findOne({ where: { invite_code: req.query.invite } })
        .then(team => {
          if (!team) {
            res.status(403).end(); 
          } else {
            db.User.update({
              TeamId: team.id,
            }, {
              where: { id: req.user.id }
            })
              .then(() => {
                res.status(200).end(); 
              })
              .catch(err => {
                console.log(err);
                res.status(500).end(); 
              });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).end(); 
        });
  }
}