const responseMessages = {
    success: {
        Created: "{key} created successfully.",
        Deleted: "{key} deleted successfully.",
        Fetched: "{key} fetched successfully.",
        operationSuccessful: "{key} completed successfully.",
    },
    error: {
        NotFound: "{key} not found.",
        invalidInput: "Invalid {key} provided.",
        internalServerError: "An internal server error occurred. Please try again later.",
        limitReached: "Limit reached for {key}.",
        Timeout: "Timeout reached for {key}.",
        alreadyExists: "{key} already exists.",
        somethingWentWrong: "Something went wrong. Please try again later.",
    },
};


const constants = {
    bool:{
        TRUE: true,
        FALSE: false
    },
    operation:{
        status:{
            SUCCESS: 'success',
            FAILED: 'failed',
        }
    },
    user: {
        status: {
            ONLINE: 'online',
            OFFLINE: 'offline'
        },
        role:{
            admin: 'Admin',
            standard: 'Standard',
            custom: 'Custom'
        }
    }
};


module.exports = {responseMessages, constants};
