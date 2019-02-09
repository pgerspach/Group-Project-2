const faker = require("faker");
const db = require("../models");

const numUsers = 10;
const numEfforts = 3;
const effortsCategories = [
  "Body",
  "Charity",
  "Culture",
  "Education",
  "Friendship",
  "Spirit",
  "Volunteering"
];

module.exports = function() {
  createUsers(numUsers);

  function createUsers(numLeft) {
    db.users
      .create({
        id: faker.random.alphaNumeric(28),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        proPic: faker.image.imageUrl(300, 300),
        coverPic: faker.image.imageUrl(800, 400),
        bio:faker.lorem.paragraph(3)
      })
      .then(() => {
        if (numLeft - 1 === 0) {
          db.users
            .findAll({
              attributes: ["id", "firstName", "lastName"]
            })
            .then(data => {
              createEfforts(data, numUsers, numEfforts);
              return;
            });
        } else {
          createUsers(numLeft - 1);
        }
      });
  }

  function createEfforts(data, numUsersLeft, numEffortsLeft) {
    console.log(data[0]);
    db.efforts
      .create({
        userId: data[numUsersLeft - 1].id,
        name:data[numUsersLeft - 1].firstName +" "+ data[numUsersLeft - 1].lastName,
        header: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        supports: faker.random.number(0, 15),
        category: effortsCategories[Math.floor(Math.random()*7)]
      })
      .then(() => {
        if (numUsersLeft - 1 === 0) {
          return;
        } else {
          if (numEffortsLeft - 1 === 0) {
            createEfforts(data, numUsersLeft - 1, numEfforts);
          } else {
            createEfforts(data, numUsersLeft, numEffortsLeft - 1);
          }
        }
      });
  }
};
