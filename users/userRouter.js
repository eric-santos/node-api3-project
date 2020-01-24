const express = require('express');
const db = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error adding the post'
      });
    });
});

// router.post('/:id/posts', (req, res) => {
//   const postInfo = { ...req.body, post_id: req.params.id };
//   db.insert(postInfo)
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch(err => res.status(500).json(err));
// });

router.get('/', (req, res) => {
  db.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'No Comments found for that post' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error', err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, Message: 'id not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const posts = req.body;

  db.update(id, posts)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: 'id not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
