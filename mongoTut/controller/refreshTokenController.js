const User = require("../model/User");
const jwt = require("jsonwebtoken");




const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized if no token provided
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken}).exec();



  // const foundUser = usersDB.users.find(
  //   person => person.refreshToken === refreshToken
  // ); //The code finds a user in the database whose refresh token matches the provided token.

  if (!foundUser) return res.sendStatus(403); // Forbidden if no token provided

  // Evaluate JWT

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.user)
      return res.sendStatus(403);

     const roles = Object.values(foundUser.roles)

   const accessToken = jwt.sign(
    { "UserInfo": {
           "username": decoded.username,
           "roles": roles
    }  
  },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "60s" }

   )
   res.json({accessToken})
  }
);
};

module.exports = {handleRefreshToken}