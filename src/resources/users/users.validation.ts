import Joi from "joi";

export const createUserValidation = (req: any, res: any, next: any) => {
  const createUserSchema = Joi.object({
    username: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    cognito_id: Joi.string().required(),
    token: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: false,
  };

  const { error, value } = createUserSchema.validate(req.body, options);

  if (error) {
    res.status(400).json({
      error: "Validation error",
      messages: error.details.map((x) => x.message),
    });
  } else {
    next();
  }
};
