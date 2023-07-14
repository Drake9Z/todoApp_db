const {Router} = require('express');
const {getUserById} = require('../controllers/users.controllers');

const router = Router();

router.get('/users/:id', getUserById);

module.exports = router;