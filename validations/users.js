'use strict';

const Joi = require('joi')

module.exports.post = {
  body: {
    firstName: Joi.string().label('First Name').required().trim().min(3).max(12),
    lastName: Joi.string().label('Last Name').required().trim().min(3).max(15),
    email: Joi.string().label('Email').required().email().trim(),
    password: Joi.string().label('Password').strip().trim().required().min(5).max(25)
  }
};
