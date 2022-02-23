const repositoryUsers = require("../repository/users");

const alreadyUserExist = async (email) => {
  const user = await repositoryUsers.findByEmail(email);
  return !!user;
};

module.exports = alreadyUserExist;
