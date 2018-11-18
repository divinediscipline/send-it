import Validator from 'validatorjs';

const validateSignup = (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  const rules = {
    firstName: 'required|min:3|string|alpha|max:20',
    lastName: 'required|min:3|string|alpha|max:20',
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

export default validateSignup;
