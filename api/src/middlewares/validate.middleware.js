const Joi = require("joi");

const passwordRules = Joi.string()
  .min(8)
  .max(128)
  .pattern(/[A-Z]/, "uppercase letter")
  .pattern(/[0-9]/, "number")
  .messages({
    "string.pattern.name": "Password must contain at least one {#name}",
    "string.min": "Password must be at least 8 characters",
  });

const schemas = {
  createUser: Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: passwordRules.required(),
  }),

  updateUser: Joi.object({
    name: Joi.string().trim().min(2).max(100),
    email: Joi.string().trim().email().lowercase(),
    password: passwordRules,
  }).min(1).messages({
    "object.min": "At least one field must be provided for update",
  }),

  listUsers: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().trim().max(100).allow(""),
  }),
};

/**
 * Middleware factory — validates req.body or req.query against a Joi schema.
 * @param {"createUser"|"updateUser"|"listUsers"} schemaName
 * @param {"body"|"query"} target
 */
const validate = (schemaName, target = "body") => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) return next();

    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message.replace(/['"]/g, ""));
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: details,
      });
    }

    req[target] = value; // replace with sanitized/defaults applied value
    next();
  };
};

module.exports = validate;
