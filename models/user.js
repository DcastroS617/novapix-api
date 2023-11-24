const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'debe introducir un nombre de usuario'],
        maxlength: 25,
        minlength: 6,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Debes introducir tu email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'debes proveer un email valido',],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Debes introducir tu contraseña'],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'user'],
        default: 'user'
    }
}, {timestamps: true})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = function (candidatePass) {
    const isPass = bcrypt.compare(candidatePass, this.password)
    return isPass
}

module.exports = mongoose.model('User', UserSchema)