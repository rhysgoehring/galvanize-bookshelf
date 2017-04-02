'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const humps = require('humps');
// const cookieSession = require('cookie-session');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
  console.log("LOOK AT ME __________", req.cookie);
   if (!req.cookie) {
     res.status(200).json(false);
   } else {
     res.status(200).json(true);
   }
});

module.exports = router;
