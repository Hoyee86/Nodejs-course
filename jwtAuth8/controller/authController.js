// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");
// require('dotenv').config();
// const fspromises= require('fs').promises;
// const path = require('path');

// const handleLogin = async (req, res) => {
//      const { user, pwd } = req.body;
//       if (!user || !pwd)
//       return res
//       .status(400).json({ mesage: "Username and password are required" });

//       const foundUser = usersDB.users.find(person => person.username === user);

//       if(!foundUser) return sendStatus(401);  // unauthorised

//       const match = await bcrypt.compare(pwd, foundUser.password)

//       if(match) {

//         //create JWTS
//         const accessToken = jwt.sign(
//           {"username": foundUser.username},
//           process.env.ACCESS_TOKEN_SECRET,
//           {expiresIn: '60S'}
//         );

//         const refreshToken = jwt.sign(
//           {"username": foundUser.username},
//           process.env.REFRESH_TOKEN_SECRET,
//           {expiresIn: '1d'}
//         )


//         const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)

//         const currentUser = {...foundUser, refreshToken};
//         usersDB.setUsers([...otherUsers, currentUser]);
//         await fspromises.writeFile(
//           path.join(__dirname, "..", "model", "users.json"),
//           JSON.stringify(usersDB.users)
//         )

//         res.cookie('jwt', refreshToken, {httpOnly:  true, maxAge: 24* 60* 60* 1000})

//         res.json(accessToken)


//         res.json({"success": `user ${user} is logged in`})
//       } else {
//         res.sendStatus(401); // unauthorised
//       }
// };




// module.exports = {handleLogin}
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fspromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
  
  const { user, pwd } = req.body;
  
  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const foundUser = usersDB.users.find(person => person.username === user);
  
  if (!foundUser) {
    return res.sendStatus(401);  // unauthorized
  }

  const match = await bcrypt.compare(pwd, foundUser.password);
  
  if (match) {
    // Create JWTs
    const accessToken = jwt.sign(
      { "user": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );

    const refreshToken = jwt.sign(
      { "user": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

    await fspromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json({ accessToken });
  } else {
    return res.sendStatus(401); // unauthorized
  }
};

module.exports = { handleLogin };
