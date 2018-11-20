import Validator from 'validatorjs';

const validateLogin = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const rules = {
    email: 'required|email',
    password: 'required|min:4|max:20',
  };

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    res.status(400).json({
      message: validation.errors.all(),
    });
  } else {
    next();
  }
};

export default validateLogin;
