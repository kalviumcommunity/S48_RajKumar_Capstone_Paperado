const mongoose = require("mongoose");
const Joi = require("joi");

const SignSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });

  const addSignup = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  
const SignupModel = mongoose.model("Signup", SignSchema);

const LoginSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const addLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  
const LoginModel = mongoose.model("Login", LoginSchema);

module.exports = {
    SignupModel,
    addSignup,
    LoginModel,
    addLogin,
    LoginSchema
};