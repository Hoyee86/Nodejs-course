const express = require('express');
const router = express.Router();
const registerControllers = require("../../controller/registerController")


router.post('/', registerControllers.handleNewUser);

module.exports = router;