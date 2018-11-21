import jwt from 'jsonwebtoken';

class Helpers {
  static generateAuthToken(id, email, isadmin) {
    const token = jwt.sign({ id, email, isadmin }, 'abc123');
    console.log('1***', token);
    return token;
  }
}

export default Helpers;
