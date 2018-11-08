'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 5000;

_app2.default.listen(PORT, function () {
  console.log('app started on port ' + PORT);
});

exports.default = _app2.default;
//# sourceMappingURL=server.js.map