const express = require('express');
const db = require('../posts/postDb');

const router = express.Router();

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

//unable to updated user_id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const posts = req.body;
  console.log('succesfully updated');

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

const checkFor = prop => (req, res, next) => {
  req.body[prop]
    ? next()
    : res.status(400).json({ errorMessage: `missing required text field` });
};

router.post('/', (req, res) => {
  console.log('succesfully posted');
  db.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error adding post' });
    });
});

// custom middleware

function validatePost(prop) {
  return function(req, res, next) {
    if (!req.body) {
      res.status(400).json({ success: false, message: 'missing post data' });
    } else if (req.body[prop]) {
      next();
    } else {
      res
        .status(400)
        .json({ success: false, message: 'missing required text field' });
    }
  };
}

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
