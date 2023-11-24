const mongoose = require('mongoose')

//metodo que se encarga de conectarse a la base de datos basado en el url
//que esta en el archivo .env (MONGO_URI)
const connectDB = (url) => {
  return mongoose.connect(url, {
  })
}

module.exports = connectDB