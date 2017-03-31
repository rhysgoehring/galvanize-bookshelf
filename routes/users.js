'use strict';

const express = require('express');
const app = express();
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps');
const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
knex("users").returning(["id", "first_name", "last_name", "email"]).insert({"first_name": req.body.firstName,
  "last_name": req.body.lastName,
  "email": req.body.email,
  "hashed_password": bcrypt.hashSync(req.body.password, 8)
}).then((user) => {
  res.send(humps.camelizeKeys(user[0]))
});

});


module.exports = router;
