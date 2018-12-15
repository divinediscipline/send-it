import Validator from 'validatorjs';

const checkParcelDetails = (req, res, next) => {
  const data = {
    parcelId: req.params.parcelId,
    // status: req.body.status,
  };

  const rules = {
    parcelId: 'required|integer',
    // status: 'required|min:5|string|max:6',
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
