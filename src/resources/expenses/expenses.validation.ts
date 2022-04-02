import Joi from "joi";

export const createExpenseSchema = (req: any, res: any, next: any) => {
  const createExpenseSchema = Joi.object({
    merchant: Joi.string(),
    date: Joi.date(),
    token: Joi.string().required(),
    account: Joi.number().required(),
    userId: Joi.number(),
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
    allowUnknown: false,
  };

  const { error, value } = createExpenseSchema.validate(req.body, options);

  if (error) {
    res.status(400).json({
      error: "Validation error",
      messages: error.details.map((x) => x.message),
    });
  } else {
    next();
  }
};

export const updateExpenseValidation = (req: any, res: any, next: any) => {
  const updateExpenseSchema = Joi.object({
    merchant: Joi.string(),
    date: Joi.date(),
    token: Joi.string().required(),
    account: Joi.number().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: false,
  };

  const { error, value } = updateExpenseSchema.validate(req.body, options);

  if (error) {
    res.status(400).json({
      error: "Validation error",
      messages: error.details.map((x) => x.message),
    });
  } else {
    next();
  }
};
