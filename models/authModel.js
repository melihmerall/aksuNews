const {model, Schema} = require('mongoose')

const authSchema = new Schema({
    name: {
        type: String,
        required: true,
        message:"Ad Soyad alanı zorunludur."
    },
    email: {
        type: String,
        required: true,
        message:"E-posta alanı zorunludur."
    },
    password: {
        type: String,
        select: false,
        required: true,
        message:"Şifre alanı zorunludur."
    },
    role: {
        type: String,
        required: true,
        message:"Rol alanı zorunludur."
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: false
    },
},{ timestamps: true })

module.exports = model('authors',authSchema)