import Validator from 'validatorjs';

const validateParcelOrder = (req, res, next) => {
  const data = {
    parcelDescription: req.body.parcelDescription,
    pickUpLocation: req.body.pickUpLocation,
    destination: req.body.destination,
    receiversFirstName: req.body.receiversFirstName,
    receiversLastName: req.body.receiversLastName,
    receiversEmail: req.body.receiversEmail,
    receiversPhoneNumber: req.body.receiversPhoneNumber,
  };

  const rules = {
    parcelDescription: 'required|min:3|string|max:100',
    pickUpLocation: 'required|min:3|string|max:20',
    destination: 'required|min:3|string|max:20',
    receiversFirstName: 'required|min:3|string|alpha|max:20',
    receiversLastName: 'required|min:3|string|alpha|max:20',
    receiversEmail: 'required|email',
    receiversPhoneNumber: 'required|numeric',
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

export default validateParcelOrder;
