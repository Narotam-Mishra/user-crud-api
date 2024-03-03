// Route logic for APIs call

const express = require('express')
const router = express.Router();

const { registerUser, loginUser, updateUser, deleteUser, getUserById, getAllUsers } = require('../controllers/userContoller');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/getUsers').get(getAllUsers);
router.route('/:userId').get(getUserById);
router.route('/:userId').patch(updateUser);
router.route('/:userId').delete(deleteUser);

module.exports = router;