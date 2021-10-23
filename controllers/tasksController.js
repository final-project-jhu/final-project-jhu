
const db = require("../models")
function generateReps(task, year, month, startDate = 1) {

    const selectedDays = JSON.parse(task.repeated_days);


    let date = new Date(year, month, startDate);
    date.setUTCHours(8);

    while (date.getMonth() === month) {

        if (selectedDays[date.getDay()]) {

            db.Attempt.create({
                due_date: date,
                TaskId: task.id,
                UserId: task.UserId,
            });
        }


        date = new Date(year, month, date.getDate() + 1);
        date.setUTCHours(8);
    }
}

module.exports = {

    findAll(req, res) {
        db.Task.findAll({
            include: [db.Attempt],
            where: {
                TeamId: req.user.TeamId,
                active: true,
            }
        })
            .then(data => res.json(
                data.map(row => ({
                    ...(row.dataValues),
                    repeated_days: JSON.parse(row.dataValues.repeated_days)
                }))
            ))
            .catch(err => {
                console.log(err);
                res.status(500).end();
            });
    },

    create(req, res) {
        console.log('body', req.body);
        console.log('user', req.user);

        db.Task.create({
            task: req.body.task,
            repeats: req.body.repeats,
            repeated_days: req.body.repeats ? JSON.stringify(req.body.repeated_days) : null,
            TeamId: req.user.TeamId,
            UserId: req.body.UserId,
        })
            .then(task => {

                if (!req.body.repeats) {
                    return db.Attempt.create({
                        due_date: req.body.dueDate,
                        TaskId: task.id,
                        UserId: task.UserId,
                    });
                }

                else {
                    const today = new Date();
                    generateReps(task, today.getFullYear(), today.getMonth(), today.getDate());
                    generateReps(task, today.getFullYear(), today.getMonth() + 1);
                    return;
                }
            })
            .then(() => {
                res.status(200).end();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json(err);
            });
    },


    update(req, res) {
        db.Task.update({
            task: req.body.task,
            repeats: req.body.repeats,
            repeated_days: req.body.repeated_days,
            UserId: req.body.UserId,
        }, {
            where: { id: req.query.id }
        })

            .then(() => res.status(200).end())
            .catch(err => {
                console.log(err);
                res.status(500).end();
            });
    },

    deactivate(req, res) {
        db.Task.update({
            active: false
        }, {
            where: { id: req.query.id }
        })
            .then(() => {
                res.status(200).end()
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            });
    },


    remove(req, res) {
        db.Task.destroy({
            where: { id: req.query.id }
        })
            .then(() => {
                res.status(200).end()
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            });


    }
}