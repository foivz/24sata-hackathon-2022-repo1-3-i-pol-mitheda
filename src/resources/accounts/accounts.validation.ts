import Joi from "joi";

export const createAccountValidation = (req: any, res: any, next: any) => {
  const createAccountSchema = Joi.object({
    name: Joi.string().required().min(2).max(255),
    balance: Joi.number().required(),
    user_id: Joi.number().required(),
    token: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: false,
  };

  const { error, value } = createAccountSchema.validate(req.body, options);

  if (error) {
    res.status(400).json({
      error: "Validation error",
      messages: error.details.map((x) => x.message),
    });
  } else {
    next();
  }
};

export const updateAccountValidation = (req: any, res: any, next: any) => {
  const updateAccountSchema = Joi.object({
    name: Joi.string().min(2).max(255),
    balance: Joi.number(),
    token: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: false,
  };

  const { error, value } = updateAccountSchema.validate(req.body, options);

  if (error) {
    res.status(400).json({
      error: "Validation error",
      messages: error.details.map((x) => x.message),
    });
  } else {
    next();
  }
};
