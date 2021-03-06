const User = require("../model/user");

const listUsers = async ({ sortBy, sortByDesc, filter, skip = 0 }) => {
  let sortCriteria = null;
  let result = User.find();
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split("|").join(" "));
  }
  result = await result.skip(Number(skip)).sort(sortCriteria);
  return { users: result };
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const removeUser = async (userId) => {
  const result = await User.findOneAndRemove({ _id: userId });
  return result;
};

const addUser = async (body) => {
  const result = await User.create(body);
  return result;
};

const updateUser = async (userId, body) => {
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listUsers,
  removeUser,
  addUser,
  updateUser,
  findByEmail,
};
