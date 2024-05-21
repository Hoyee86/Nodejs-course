const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };

  const fspromises = require('fs').promises;
  const path = require('path');
  
  const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(
      (person) => person.refreshToken === refreshToken
    );
    if (!foundUser) {
        res.clearCookies('jwt', {httpOnly: true})
      return res.sendStatus(204);
    }
  
    // evaluate jwt

    const otherUser = usersDB.users.filter(person => person.refreshToken === refreshToken)
    const currentUser = {...foundUser, refreshToken: ""}
    usersDB.setUsers([...otherUser, currentUser])

    await fspromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users, null, 2)

    )

    res.clearCookie("jwt", {httpOnly: true})
    return res.sendStatus(204);
  


  };
  
  module.exports = { handleLogout };
  