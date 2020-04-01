const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Insta = require('../lib/models/Insta');
const Comment = require('../lib/models/Comment');

module.exports = async({ usersToCreate = 5, instaToCreate = 50,  commentsToCreate = 150 } = {}) => {
  const loggedInUser = await User.create({
    username: 'jimmy',
    password: 'jimmywashere',
    profilePhotoUrl: 'www.url.com'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.word(),
    profilePhotoUrl: chance.url()
  })));

  const insta = await Insta.create([...Array(instaToCreate)].map(() => ({
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    photoUrl: chance.url(),
    caption: chance.sentence(),
    tags: [...Array(10)].map(() => (chance.hashtag()))
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    commentBy: chance.pickone(users),
    post: chance.pickone(insta),
    comment: chance.sentence()
  })));
};
