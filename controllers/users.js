const repositoryUsers = require("../repository/users");
const { HttpCode } = require("../lib/constants");

class UserControllers {
  async addUser(req, res, _next) {
    const newUser = await repositoryUsers.addUser(req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { newUser },
    });
  }

  async getUsers(req, res, _next) {
    const users = await repositoryUsers.listUsers(req.query);
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { ...users } });
  }

  async updateUser(req, res, _next) {
    const { id } = req.params;

    const user = await repositoryUsers.updateUser(id, req.body);
    if (user) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { user } });
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }

  async removeUser(req, res, _next) {
    const { id } = req.params;

    const user = await repositoryUsers.removeUser(id);
    if (user) {
      return res
        .status(HttpCode.OK)
        .json({
          status: "success",
          code: HttpCode.OK,
          massage: "User was deleted!",
        });
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }
}

module.exports = UserControllers;
