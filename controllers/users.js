const repositoryUsers = require("../repository/users");
const { HttpCode } = require("../lib/constants");
const alreadyUserExist = require("../service/index");

class UserControllers {
  async addUser(req, res, _next) {
    try {
      const { email } = req.body;
      const isUserExist = await alreadyUserExist(email);
      if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({
          status: "error",
          code: HttpCode.CONFLICT,
          message: "User is already exist!",
        });
      }
      const newUser = await repositoryUsers.addUser(req.body);

      res.status(HttpCode.CREATED).json({
        status: "success",
        code: HttpCode.CREATED,
        data: { newUser },
      });
    } catch (err) {
      next(err);
    }
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

    const deleteUser = await repositoryUsers.removeUser(id);

    if (deleteUser) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { deleteUser },
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
