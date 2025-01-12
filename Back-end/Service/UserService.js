const Access_User = require('../Data Access/userDataAccess');

exports.getUserById = async (userId) => {
    return await Access_User.getUserById(userId);
};
