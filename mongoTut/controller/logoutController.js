const User = require("../model/User");

// const usersDB = {
//     users: require("../model/users.json"),
//     setUsers: function (data) {
//       this.users = data;
//     },
//   };

  // const fspromises = require('fs').promises;
  // const path = require('path');
  
  const handleLogout = async (req, res) => {

    // on client, also delete the accesstoken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No Content
    const refreshToken = cookies.jwt;
     
    
    // const foundUser = usersDB.users.find(
    //   (person) => person.refreshToken === refreshToken
    // );

        //Is refereshToken in db?
    const foundUser = await User.findOne({refreshToken}).exec();

    if (!foundUser) {
        res.clearCookies('jwt', {httpOnly: true, sameSite: "none", secure: true});
      return res.sendStatus(204);
    }
  
    // evaluate jwt

    // const otherUser = usersDB.users.filter(person => person.refreshToken === refreshToken)
    // const currentUser = {...foundUser, refreshToken: ""}
    // usersDB.setUsers([...otherUser, currentUser])

    // await fspromises.writeFile(
    //     path.join(__dirname, "..", "model", "users.json"),
    //     JSON.stringify(usersDB.users, null, 2)

    // )

    //Delete refereshToken in Database

    foundUser.refreshToken = "";  // This one is meant for deleting in the Database
    const result = await foundUser.save();
    console.log(result)

    res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true}); // secure: true- only serves on https
    return res.sendStatus(204);
  


  };
  
  module.exports = { handleLogout };
  