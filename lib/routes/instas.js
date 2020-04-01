const { Router } = require('express');
const Insta = require('../models/Insta');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Insta
      .create({ ...req.body, user: req.user._id })
      .then(insta => res.send(insta))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Insta
      .find()
      .then(instas => res.send(instas))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    Insta
      .findOne({
        _id: req.params.id,
        user: req.user._id
      })
      .populate('user')
      .then(insta => res.send(insta))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Insta
      .findOneAndUpdate({
        _id: req.params.id,
        user: req.user._id
      }, req.body, { new: true })
      .then(insta => res.send(insta))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Insta
      .findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      })
      .then(insta => res.send(insta))
      .catch(next);
  });
