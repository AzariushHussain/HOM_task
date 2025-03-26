const { createUser, getUserByEmail, deleteUser } = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');
const generateToken = require('../utils/generateToken');


const registerUser = async (req, res) => {
    try {
        console.log('registerUser:',
            req.body);
        const { username, email, password } = req.body;
        const user = await getUserByEmail(email);
        if (user) {
            console.log('user:', user);
            const message = formatMessage(responseMessages.error.alreadyExists, { key: 'user' });
            return errorResponse(res, message);
        }
        const newUser = await createUser({ username, email, password });
        console.log('newUser:', newUser);
        const token = generateToken({ id: newUser._id, username: newUser.username, email: newUser.email });
        console.log('token:', token);
        const message = formatMessage(responseMessages.success.Created, { key: 'user' });
        return successResponse(res, message, { token, user: newUser });
    } catch (error) {
        console.log('errorregisterUser:', error);
        return errorResponse(res, responseMessages.error.internalServerError);
    }
}

const loginUser = async (req, res) => {
    try {
        console.log('loginUser:', req.body);
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            const message = formatMessage(responseMessages.error.NotFound, { key: 'user' });
            return errorResponse(res, message, 400);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            const message = formatMessage(responseMessages.error.invalidInput, { key: 'email or password' });
            return errorResponse(res, message, 400);
        }
        const token = generateToken({ id: user._id, username: user.username, email: user.email });
        const message = formatMessage(responseMessages.success.Fetched, { key: 'user' });
        return successResponse(res, message, { token, user: user });
    } catch (error) {
        return errorResponse(res, responseMessages.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    registerUser,
    loginUser
}