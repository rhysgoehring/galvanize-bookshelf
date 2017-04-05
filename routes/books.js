'use strict';

const express = require('express');
const app = express();
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps')

router.get('/', (req, res, next) => {
  knex('books').orderBy('title', 'asc').then((books) => {
      res.send(humps.camelizeKeys(books));
    })
    .catch((err) => {
      next(err);
    })

});

router.get('/:id', (req, res, next) => {
  knex("books").where('id', req.params.id).then((book) => {
      res.send(humps.camelizeKeys(book[0]));
    })
    .catch((err) => {
      next(err);
    })
});

router.post('/', (req, res, next) => {
  var newBook = {
    'id': req.body.id,
    'title': req.body.title,
    'author': req.body.author,
    'genre': req.body.genre,
    'description': req.body.description,
    'cover_url': req.body.coverUrl
  };

  knex("books").insert(newBook).returning("*").then((results) => {
      res.send(humps.camelizeKeys(results[0]));
    })
    .catch((err) => {
      next(err);
    })
});

router.patch(':id', (req, res, next) => {
  var bookUpdate = {
    'id': req.body.id,
    'title': req.body.title,
    'author': req.body.author,
    'genre': req.body.genre,
    'description': req.body.description,
    'cover_url': req.body.coverUrl
  }
  knex("books").update(bookUpdate).returning("*").then((results) => {
      res.send(humps.camelizeKeys(results[0]));

    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {

  knex("books").del().where("id", req.params.id).returning("*").then((results) => {
      let book = results[0];
      delete book.id
      res.send(humps.camelizeKeys(book));
    })
    .catch((err) => {
      next(err);
    })
});

module.exports = router;
