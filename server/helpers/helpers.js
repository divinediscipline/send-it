import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Helpers {
  static generateAuthToken(id, email, isadmin) {
    const token = jwt.sign({ id, email, isadmin }, process.env.SECRET);
    return token;
  }
}

export default Helpers;
