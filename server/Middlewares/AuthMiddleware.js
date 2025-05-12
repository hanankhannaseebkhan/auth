const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token; // Retrieve the token from cookies
  
  if (!token) {
    return res.status(401).json({ 
      status: false, 
      message: "Token is missing" 
    });
  }

  // Verify the token
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ 
        status: false, 
        message: "Invalid token" 
      });
    }

    // If token is valid, try to find the user using the decoded ID
    try {
      const user = await User.findById(data.id);
      if (!user) {
        return res.status(404).json({ 
          status: false, 
          message: "User not found" 
        });
      }

      // Attach user info to the request object for further use in route handlers
      req.user = user;
      
      // Call the next middleware/route handler
      next();
    } catch (err) {
      return res.status(500).json({ 
        status: false, 
        message: "Error fetching user" 
      });
    }
  });
};
