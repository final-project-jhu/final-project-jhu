
const db = require("../models")

module.exports = {
    signup(req, res) {
        console.log(req.body)
        db.Team.create({
            name: req.body.name + "'s Team"
        })

            .then(newTeam => {
                return db.User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    TeamId: newTeam.id,
                    color: req.body.color
                });
            })

            .then(() => {
                res.redirect(307, "/api/users/login");
            })
            .catch(err => {
                console.log(err);
                res.status(401).send(err.name);
            });
    },

    login(req, res) {

        if (req.user) {
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    },
    logout(req, res) {
        req.logout();
        res.redirect("/");
    },


    getUserData(req, res) {
        if (req.user) {
            db.User.findOne({ where: { id: req.user.id } })
                .then(user => {
                    res.json({
                        name: user.name,
                        id: user.id
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json("");
                });
        } else {
            res.json("");
        }
    },

    updateColor(req, res) {
        if (!req.user) {
            return res.status(401).end();
        }

        db.User.update({
            color: req.query.color
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
}