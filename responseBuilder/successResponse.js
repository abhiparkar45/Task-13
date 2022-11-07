const getSuccessResponse = (message,data) =>{
    return {
            success:true,
            message,
            data
        }
}

module.exports = getSuccessResponse;