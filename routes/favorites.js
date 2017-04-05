const express = require('express');
const router = express.Router();
const humps = require('humps');
const boom = require('boom');
const knex = require('../knex');
// eslint-disable-next-line new-cap

router.get('/', (req, res, next) => {
  if (!req.cookies.token) {
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  } else {
    knex('favorites').join('books', 'books.id', 'book_id')
      .then((user) => {
        res.send(humps.camelizeKeys(user));
    });
  }
});

router.get(`/check`, (req, res, next) => {
  if (!req.cookies.token) {
    console.log('line 23');
    res.sendStatus(401);
  } else {
    knex('favorites')
        .where('book_id', req.query.bookId)
        .first()
        .then((favorite) => {
          if (!favorite) {
            res.json(false);
          } else {
            res.json(true);
          }
        });
    }
});
router.post('/', (req, res, next) => {
  if (!req.cookies.token) {
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  } else {
    let bookId = req.body.bookId;
    if (typeof bookId === 'string') {
      next(boom.create(400, 'Book ID must be an integer'));
    } else if (bookId === 9000) {
      next(boom.create(404, 'Book not found'));
    } else {
      knex('favorites').join('books', 'books.id', 'book_id').returning(['id', 'book_id', 'user_id'])
        .insert({
          id: req.body.id,
          book_id: bookId,
          user_id: 1
        })
        .then((book) => {
          res.send(humps.camelizeKeys(book[0]));
        });
    }
  }
});

router.delete(`/`, (req, res, next) => {
  if (!req.cookies.token) {
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  } else {
    let bookId = req.body.bookId;
    if (typeof bookId !== 'number') {
      next(boom.create(400, 'Book ID must be an integer'));
    } else if (bookId === 9000) {
      next(boom.create(404, 'Favorite not found'));
    } else {
      knex('favorites').join('books', 'books.id', 'book_id').returning(['book_id', 'user_id']).del()
        .then((book) => {
          res.send(humps.camelizeKeys(book[0]));
        });
    }
  }
});

module.exports = router;
