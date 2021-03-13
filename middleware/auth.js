const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");

const auth = async (request, response, next) => {
    try {
        const token = request.cookies.token;
        if (!token) {
            throw new Error('Unauthenticated');
        }

        const { username } = jwt.verify(token, "uodyiodyoqudihjjdnalnd8098098093787234");

        const user = await User.findOne({ username: username });

        response.locals.user = user;
        return next();
        
    } catch (error) {
        console.log(error);
        return response.status(401).send({message: "Unautheticated"});
    }
}

module.exports = auth;