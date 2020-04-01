  
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Comment = require('../models/Comment');

module.exports = Router();
module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment
      .create({ ...req.body, commentBy: req.user._id })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Comment
      .findOneAndUpdate({
        _id: req.params.id,
        author: req.user._id
      }, req.body, { new: true })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .findOneAndDelete({ _id: req.params.id })
      .then(comment => res.send(comment))
      .catch(next);
  });
