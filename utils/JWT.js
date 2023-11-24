const jwt = require('jsonwebtoken')

const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({res, user, }) => {

    //se crea un token con el usuario
    const accessTokenJWT = createJWT({payload: {user}})
    console.log(accessTokenJWT);
    const oneDay = 1000 * 60* 60 *24
    
    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + oneDay),
    })
    console.log(user.userId.toString())
    res.cookie('userID', user.userId.toString(), {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
    })
}

const createTokenUser = (user) => {
    return({
        username: user.username,
        userId: user._id,
        role: user.role
    })
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
}