const Categories = require("../api/models/Categories");
/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const Courses = require("../api/models/Courses");

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  await sails.models.categories.createEach([
    {
      categories: "backend",
    },
    {
      categories: "frontend",
    },
    {
      categories: "css",
    },
    {
      categories: "computer science",
    },
  ]);
  await sails.models.courses.createEach([
    {
      title:
        "SQL, Models and Migrations - Lecture 4 - CS50's Web Programming with Python and JavaScript 2020",
      description:
        "This course picks up where Harvard University's CS50 leaves off, diving more deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap. Topics include database design, scalability, security, and user experience. Through hands-on projects	",
      youtubeId: "YzP164YANAU",
      url:
        "https://www.youtube.com/watch?v=YzP164YANAU&t=5394s&ab_channel=CS50",
      category: 1,
    },
    {
      title: "Create Rest Api in minutes with sails",
      description:
        "Here we will create a fully functional REST API using NodeJS and Sails",
      youtubeId: "WTlSCTiJAXM",
      url:
        "https://www.youtube.com/watch?v=WTlSCTiJAXM&t=183s&ab_channel=TraversyMedia",
      category: 3,
    },
  ]);
};
