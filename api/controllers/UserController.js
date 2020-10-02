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
  login: async function (req, res) {
    return res.json({
      todo: "login() is not implemented yet!",
    });
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
      return res.ok(token);
    } catch (e) {
      return res.negotiate(e);
    }
    // User.create({
    //   email: newEmailAddress,
    //   password: await sails.helpers.passwords.hashPassword(
    //     req.param("password")
    //   ),
    //   fullName: req.param("fullName"),
    //   tosAcceptedByIp: req.ip,
    // }).exec((err, user) => {
    //   if (err) {
    //     return res.negotiate(err);
    //   }
    //   req.login(user, (err) => {
    //     if (err) {
    //       return res.negotiate(err);
    //     }
    //     var token = jwt.sign({ user: user.id }, sails.config.jwtSecret, {
    //     expiresIn: sails.config.jwtExpires,
    //   });
    //     return res.ok(token);
    //   });
    // });
  },
};
