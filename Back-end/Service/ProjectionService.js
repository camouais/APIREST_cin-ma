const Access_Projection = require('../Data Access/Access_Projection.js');

exports.createProjection = async (projection) => {
    return await Access_Projection.createProjection(projection);
};