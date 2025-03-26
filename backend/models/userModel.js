const { UserModel } = require('./schemaLoader');

const createUser = async (data) => {
    const user = new UserModel(data);
    return await user.save();
}


const getUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
}

const deleteUser = async (email) =>{
    return await UserModel.findOneAndDelete({email});
}

module.exports = {
    createUser,
    getUserByEmail,
    deleteUser
}