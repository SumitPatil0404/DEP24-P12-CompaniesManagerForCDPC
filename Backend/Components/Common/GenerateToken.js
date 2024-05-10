const jwt = require('jsonwebtoken');

const generateToken = (email) => {
    const JWTKey = "Secret_Key_For_Website"
    const token = jwt.sign({ email }, JWTKey, { expiresIn: '3h' })
    return token
}

module.exports={generateToken}