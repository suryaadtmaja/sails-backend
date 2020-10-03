/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require("jsonwebtoken");
module.exports = {
  /**
   * `UserController.login()`
   */
  me: async function (req, res) {
    try {
      return res.ok({
        email: req.user.email,
        fullName: req.user.fullName,
      });
    } catch (e) {
      return res.negotiate(e);
    }
  },
  login: async function (req, res) {
    var userRecord = await User.findOne({
      email: req.param("email"),
    });
    if (!userRecord) {
      return res.status(422).send({
        messages: "Email or password is incorrect",
      });
    } else {
      await sails.helpers.passwords
        .checkPassword(req.param("password"), userRecord.password)
        .intercept("incorrect", () => {
          return res.status(422).send({
            messages: "Email or password is incorrect",
          });
        });
      var token = jwt.sign({ user: userRecord.id }, sails.config.jwtSecret, {
        expiresIn: sails.config.jwtExpires,
      });
      return res.ok({
        email: userRecord.email,
        token: token,
      });
    }
  },

  /**
   * `UserController.logout()`
   */
  logout: async function (req, res) {
    return res.json({
      todo: "logout() is not implemented yet!",
    });
  },

  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    var newEmailAddress = req.param("email");
    try {
      const user = await User.create({
        email: newEmailAddress,
        password: await sails.helpers.passwords.hashPassword(
          req.param("password")
        ),
        fullName: req.param("fullName"),
        tosAcceptedByIp: req.ip,
      }).fetch();
      var token = jwt.sign({ user: user.id }, sails.config.jwtSecret, {
        expiresIn: sails.config.jwtExpires,
      });
      return res.ok({
        email: user.email,
        messages: "account successfully created",
        token: token,
      });
    } catch (e) {
      return res.negotiate(e);
    }
  },
};
