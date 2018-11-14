import Validator from 'validatorjs';

const validateParcelOrder = (req, res, next) => {
  const data = {
    parcelId: req.body.parcelId,
    userId: req.body.userId,
    sendersFirstName: req.body.sendersFirstName,
    sendersLastName: req.body.sendersLastName,
    sendersPhone: req.body.sendersPhone,
    parcelDescription: req.body.parcelDescription,
    weightCategory: req.body.weightCategory,
    price: req.body.price,
    createdAt: req.body.createdAt,
    pickUpLocation: req.body.pickUpLocation,
    destination: req.body.destination,
    packageTransitTime: req.body.packageTransitTime,
    receiversFirstName: req.body.receiversFirstName,
    receiversLastName: req.body.receiversLastName,
    receiversEmail: req.body.receiversEmail,
    receiversPhone: req.body.receiversPhone,
    status: req.body.status,
  };

  const rules = {
    parcelId: 'required|numeric',
    userId: 'required|numeric',
    sendersFirstName: 'required|min:3|string|max:20',
    sendersLastName: 'required|min:3|string|max:20',
    sendersPhone: 'required|numeric',
    parcelDescription: 'required|min:3|string|max:100',
    weightCategory: 'required|min:3|string',
    price: 'required|numeric',
    createdAt: 'required|numeric',
    pickUpLocation: 'required|min:3|string|max:20',
    destination: 'required|min:3|string|max:20',
    packageTransitTime: 'required|min:3|string|max:20',
    receiversFirstName: 'required|min:3|string|max:20',
    receiversLastName: 'required|min:3|string|max:20',
    receiversEmail: 'required|email',
    receiversPhone: 'required|numeric',
    status: 'required|min:3|string|max:20',
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
