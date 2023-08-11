const jwt = require('jsonwebtoken');


const authenticateUser =  (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Authentication required');
    }
  
    try {
      const generatetoken = jwt.verify(token, 'secretkey');
      req.userId =  generatetoken.userId;
      
      next();
    } catch (error) {
      return res.status(401).send(error.message);      
    }
  };

  module.exports = authenticateUser;