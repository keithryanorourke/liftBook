const getErrorMessage = (err) => {
    if (err.response.status === 500 || err.response.status === undefined) {
        return "An unkown error has occured.";
    }
    return err.response.data;
}

export default getErrorMessage;