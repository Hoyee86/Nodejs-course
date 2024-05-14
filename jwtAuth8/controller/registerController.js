const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fspromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(404)
      .json({ message: "Username and password are required" });

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); // meaning conflict

  try {
    // encrypting the password
    const hashedpsw = await bcrypt.hash(pwd, 10);

    // storing the new user
    const newUser = { 'username': user, 'password': hashedpsw };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fspromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);

    res.status(201).json({'success': `New User ${user} created!`}) // meaning created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  handleNewUser
};
