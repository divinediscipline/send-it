import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkUserId = (req, res, next) => {
  const data = {
    parcelId: req.params.userId,
  };

  const rules = {
    parcelId: 'required|integer',
  };

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    return res.status(400).json({
      message: validation.errors.all().parcelId[0],
    });
  }
  const token = req.header('x-auth');
  const { userId } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    if (+userId === decoded.id) {
      return next();
    }
    return res.status(401).json({
      message: 'Token is invalid for the requested resource. Please sign up or log in',
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Token is invalid. Please sign up or log in',
    });
  }
};

export default checkUserId;
