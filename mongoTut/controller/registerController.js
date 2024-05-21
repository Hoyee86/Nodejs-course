const User = require("../model/User"); // repalace the code below

// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// commented code below

// const fspromises = require("fs").promises;
// const path = require("path");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  // Check for missing username or password
  if (!user || !pwd) {
    return res
      .status(400) // 400 Bad Request is more appropriate for validation errors
      .json({ message: "Username and password are required" });
  }

  // Check for duplicate user
  const duplicate = await User.findOne({ username: user }).exec(); // replaces the code below
  // const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409); // 409 Conflict
  }

  try {
    // Encrypting the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user

    const result = await User.create({
      "username": user,
      "password": hashedPwd
    })
    console.log(result)

    // Storing the new user
    // const newUser = { username: user,  roles: {User: 2001},
    //   password: hashedPwd };
    // // const updatedUsers = [...usersDB.users, newUser];

    // usersDB.setUsers(updatedUsers);

    // // Write updated users to file
    // await fspromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users, null, 2) // Pretty-print JSON with 2-space indentation
    // );

    // // Log updated users (for debugging purposes, can be removed in production)
    // console.log(usersDB.users);

    res.status(201).json({ success: `New User ${user} created!` }); // 201 Created
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 Internal Server Error
  }
};

module.exports = {
  handleNewUser,
};
