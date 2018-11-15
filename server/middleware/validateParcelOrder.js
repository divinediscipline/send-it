import Validator from 'validatorjs';

const validateParcelOrder = (req, res, next) => {
  const data = {
    sendersFirstName: req.body.sendersFirstName,
    sendersLastName: req.body.sendersLastName,
    sendersPhone: req.body.sendersPhone,
    parcelDescription: req.body.parcelDescription,
    weightCategory: req.body.weightCategory,
    price: req.body.price,
    pickUpLocation: req.body.pickUpLocation,
    destination: req.body.destination,
    packageTransitTime: req.body.packageTransitTime,
    receiversFirstName: req.body.receiversFirstName,
    receiversLastName: req.body.receiversLastName,
    receiversEmail: req.body.receiversEmail,
    receiversPhone: req.body.receiversPhone,
  };

  const rules = {
    sendersFirstName: 'required|min:3|string|max:20',
    sendersLastName: 'required|min:3|string|max:20',
    sendersPhone: 'required|numeric',
    parcelDescription: 'required|min:3|string|max:100',
    weightCategory: 'required|min:3|string',
    price: 'required|numeric',
    pickUpLocation: 'required|min:3|string|max:20',
    destination: 'required|min:3|string|max:20',
    packageTransitTime: 'required|min:3|string|max:20',
    receiversFirstName: 'required|min:3|string|max:20',
    receiversLastName: 'required|min:3|string|max:20',
    receiversEmail: 'required|email',
    receiversPhone: 'required|numeric',
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
