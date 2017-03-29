'use strict';

const express = require('express');
const app = express();
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps')

router.get('/books', (req, res, next) => {
  knex('books').orderBy('title', 'asc').then((books) => {
    res.send(humps.camelizeKeys(books));
  })
  .catch((err) => {
    next(err);
  })

});

router.get('/books/:id', (req, res, next) => {
  knex("books").where('id', req.params.id).then((book) => {
    res.send(humps.camelizeKeys(book[0]));
  })
  .catch((err) => {
    next(err);
  })
});

router.post('/')



module.exports = router;
