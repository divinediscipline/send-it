import Validator from 'validatorjs';

const checkParcelDetails = (req, res, next) => {
  const data = {
    parcelId: req.params.parcelId,
  };

  const rules = {
    parcelId: 'required|integer',
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

export default checkParcelDetails;
