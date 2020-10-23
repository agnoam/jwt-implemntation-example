console.log('import jwt.routes');

var express = require('express');
var router = express.Router();

var JWT_Ctrl = require('../controllers/jwt.controller');

router.post('/createNewUser', JWT_Ctrl.createNewJWT);
router.post('/verify', JWT_Ctrl.verify);

module.exports = router;