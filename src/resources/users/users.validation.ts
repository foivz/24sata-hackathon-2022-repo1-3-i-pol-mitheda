import Joi from "joi";

export const createUserSchema = (req: any, res: any, next: any) => {
  const createUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    date: Joi.date(),
    token: Joi.string().required(),
    user_id: Joi.number(),
    items: Joi.array().items(
      Joi.object({
        title: Joi.string(),
        price: Joi.number().required(),
        amount: Joi.number().required(),
      })
    ),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
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
