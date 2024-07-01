const getErrorMessage = (err) => {
    if (err.status === 500 || err.status === undefined) {
        return "An unkown error has occured.";
    }
    return err.message;
}

export default getErrorMessage;