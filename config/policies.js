/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,

  UserController: {
    // By default, require requests to come from a logged-in user
    // (runs the policy in api/policies/isLoggedIn.js)
    "*": "isLoggedIn",
    me: "checkForUser",

    // Only allow admin users to delete other users
    // (runs the policy in api/policies/isAdmin.js)
    // delete: "isAdmin",
    login: true,
    signup: true,
  },
  // CategoriesController: {
  // By default, require requests to come from a logged-in user
  // (runs the policy in api/policies/isLoggedIn.js)
  // "*": "isLoggedIn",

  // Only allow admin users to delete other users
  // (runs the policy in api/policies/isAdmin.js)
  // delete: "isAdmin",
  // },
  // CoursesController: {
  // By default, require requests to come from a logged-in user
  // (runs the policy in api/policies/isLoggedIn.js)
  // "*": "isLoggedIn",

  // Only allow admin users to delete other users
  // (runs the policy in api/policies/isAdmin.js)
  // delete: "isAdmin",
  // },
};
