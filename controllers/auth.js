const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')
const UserModel = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { attachCookiesToResponse, createTokenUser } = require('../utils/JWT')

const register = async (req, res) => {
    const {email, username, password} = req.body

    const emailAlreadyExists = await UserModel.findOne({email});
    if(emailAlreadyExists)
        throw new BadRequestError('El email ya se encuentra registrado...')

    let role = ''
    if(((await UserModel.countDocuments({})) === 0)){
        role = 'admin'
    } else if(((await UserModel.countDocuments({})) <= 4)){
        role = 'moderator'
    }else{
        role = 'user'
    }
    //const role = ((await UserModel.countDocuments({})) === 0) ? 'admin' : 'user';

    const user = await UserModel.create({username, email, password, role})
    console.log(user);
    //const token = user.createJWT()
    return res.status(StatusCodes.CREATED).json({ username: user.username, })
}

const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password)
        throw new BadRequestError('Debe introducir sus credenciales para continuar...')

    const user = await UserModel.findOne({ email })
    if (!user)
        throw new NotFoundError(`el usuario es incorrecto...`)

    const isPass = user.comparePassword(password)
    if (!isPass)
        throw new UnauthorizedError('la contraseña es incorrecta...')

    const tokenUser = createTokenUser(user)

    attachCookiesToResponse({res, user: tokenUser})
    return res.status(StatusCodes.OK).json({ username: user.username, tokenUser })
}

const logout = async (req, res) => {
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.cookie('userID', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })

    return res.status(StatusCodes.OK).json({msg: 'se cerro la sesion'})
}

module.exports = {
    register,
    login,
    logout
}