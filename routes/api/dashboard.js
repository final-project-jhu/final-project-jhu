const router = require("express").Router();
const withAuth = require("../utils/auth");
const {  Tasks, Users, Team, Attempts } = require("../models");

// brings up authorized user post
// successfully reloads new post
router.get("/", withAuth, async (req, res) => {
  console.log("**************************************************");
  Post.findAll({
    where: {
      user_id: req.session.email,
    },

    include: [User],
  })
    .then((dbTaskData) => {
      console.log(dbTaskData);
      const tasks = dbtaskData.map((post) => post.get({ plain: true }));
      console.log(tasks);
      res.render("dashboard", {
        tasks,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// tested and works
router.get("/add", withAuth, (req, res) => {
  res.render("addTask", {
    logged_in: req.session.logged_in,
  });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "text"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id"],
        include: { model: User, attributes: ["username"] },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found!" });
      }

      const post = postData.get({ plain: true });

      res.render("editPost", {
        post,
        username: req.session.username,
        loggedIn: true,
        title: "Edit Post"
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
