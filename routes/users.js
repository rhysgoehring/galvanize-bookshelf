'use strict';

const express = require('express');
const app = express();
const knex = require('../knex');
const router = express.Router();
const humps = require('humps');
const bcrypt = require('bcryptjs');
const ev = require('express-validation');
const validations = require('../validations/users');
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.post('/', ev(validations.post), (req, res, next) => {
  const token = jwt.sign(req.body, process.env.JWT_KEY)

  knex("users").returning(["id", "first_name", "last_name", "email"]).insert({
    "first_name": req.body.firstName,
    "last_name": req.body.lastName,
    "email": req.body.email,
    "hashed_password": bcrypt.hashSync(req.body.password, 8)
  }).then((user) => {
    res.cookie('token', token, {httpOnly: true});
    res.send(humps.camelizeKeys(user[0]))
  });
});


module.exports = router;
