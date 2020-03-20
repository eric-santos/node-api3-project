const express = require("express");
const db = require("./userDb");
const router = express.Router();

router.get("/", (req, res) => {
  db.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

//validateUserId middleware
router.get("/:id", validateUserId, (req, res) => {
  db.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "No Comments found for that post" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error", err });
    });
});

//validateUser middleware
router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error adding the user"
      });
    });
});

router.post("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id;
  const posts = req.body;

  db.insert(id, posts)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding User's post" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const posts = req.body;

  db.update(id, posts)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, Message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  db.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        req.id = id;
        next();
      } else {
        res.status(400).json({ success: false, message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log("validateUserId error: ", err);
      res.status(500).json({ success: false, message: "Error", err });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ success: false, message: "missing user data" });
  } else if (req.body.name) {
    next();
  } else {
    res.status(400).json({ success: false, message: "missing required name" });
  }
}

module.exports = router;
