'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const humps = require('humps');
// const cookieSession = require('cookie-session');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
router.get('/token', (req, res, next) => {
  console.log("in this GET");
   if (req.cookie) {
     res.status(200).send(false);
   } else {
     res.status(200).send(true);
   }
});

module.exports = router;
