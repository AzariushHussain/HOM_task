const { responseMessages, constants }  = require('./constants')
const { formatMessage } = require('./messageFormatter')

const paginate = async (Model, query = {}, page = 1, limit = 5, projection = {}, sort = {}) => {
    if (page < 1 || limit < 1) {
        const message = formatMessage(responseMessages.error.invalidInput, {key: 'pagination'});
        throw new Error(message );
    }

    const skip = (page - 1) * limit;

    const data = await Model.find(query, projection)
        .skip(skip)
        .limit(limit)
        .sort(sort);

    const totalDocuments = await Model.countDocuments(query);

    return {
        data,
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments,
    };
};

module.exports = paginate