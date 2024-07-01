require("dotenv").config();
const { TOKEN_LIFESPAN, TOKEN_LIFESPAN_UNIT, KEY } = process.env;
const jwt = require("jsonwebtoken");

const convertToMilliseconds = (value, unit) => {
    switch (unit) {
        case "seconds":
            return value * 1000;
        case "minutes":
            return value * 1000 * 60;
        case "hours":
            return value * 1000 * 60 * 60;
        case "days":
            return value * 1000 * 60 * 60 * 24
        default:
            return value;
    }
}

const createJwt = (userId) => {
    const expiration = new Date(Date.now() + convertToMilliseconds(TOKEN_LIFESPAN, TOKEN_LIFESPAN_UNIT)).toISOString();
    return jwt.sign({ userId, expiration }, KEY);
}

module.exports = {
    createJwt
};