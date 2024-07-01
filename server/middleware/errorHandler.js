const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.status) {
        return res.status(err.status).json(err.message || 'Unknown Error');
    }
    res.status(500).send('Internal Server Error');
};

module.exports = {
    errorHandler
};