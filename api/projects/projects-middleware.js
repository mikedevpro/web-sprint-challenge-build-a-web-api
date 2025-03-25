// add middlewares here related to projects
const Project = require('./projects-model');

const validateBody = async (req, res, next) => {
    if(req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json({ message: 'need and a name and description in the body of the request' })
    }
}

module.exports = {
    validateBody
}