import jwt from 'jsonwebtoken';

class Helpers {
  static generateAuthToken(req, res) {
    const token = jwt.sign({ email: req.body.email }, 'abc123');
    console.log('1***', token);
    return token;
  }
}

export default Helpers;
