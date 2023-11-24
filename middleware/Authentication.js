const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError');
const { isTokenValid, attachCookiesToResponse } = require('../utils/JWT');

const AuthenticateUser = async (req, res, next) => {
  const { accessToken } = req.signedCookies;
  try {
    if(accessToken){
      const payload = isTokenValid(accessToken)
      req.user = payload.user
      return next()
    }

    const payload = isTokenValid(accessToken)
    if(!payload){
      throw new UnauthorizedError('credenciales invalidas')
    }
    attachCookiesToResponse({
      res,
      user: payload.user,
    })

    req.user = payload.user
    //console.log(req.user);
    next()

  } catch (error) {
    throw new UnauthorizedError('credenciales invalidas')
  }
}

const AuthorizePermissions = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      throw new UnauthorizedError('no tienes acceso a esta ruta, contacta al administrador')
    }
    next()
  }
}

module.exports = {AuthenticateUser, AuthorizePermissions}