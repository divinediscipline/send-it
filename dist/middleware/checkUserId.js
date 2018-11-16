'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkUserId = function checkUserId(req, res, next) {
  var data = {
    parcelId: req.params.userId
  };

  var rules = {
    parcelId: 'required|integer'
  };

  var validation = new _validatorjs2.default(data, rules);

  if (validation.fails()) {
    res.status(400).json({
      message: validation.errors.all()
    });
  } else {
    next();
  }
};

exports.default = checkUserId;