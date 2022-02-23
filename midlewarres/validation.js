const Joi = require("joi");
const pkg = require("mongoose");
const { Types } = pkg;

const createSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  dateOfBirthday: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  surname: Joi.string().optional(),
  dateOfBirthday: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});

const validationCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type !== "any.required") {
      return res
        .status(400)
        .json({ message: `${err.message.replace(/"/g, "")}` });
    }
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

const validationUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type !== "object.missing") {
      return res.status(400).json({ message: "missing fields" });
    }

    return res
      .status(400)
      .json({ message: `${err.message.replace(/"/g, "")}` });
  }
  next();
};

const validationId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};

module.exports = { validationCreate, validationUpdate, validationId };
