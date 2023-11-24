require('express-async-errors')
require('dotenv').config()
const { StatusCodes } = require('http-status-codes')


//import del servicio principal
const express = require('express')
const app = express()

//import de servicios de seguridad
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//import de conexion a storage
const connectDB = require('./db/ConnectDB')
const ConnectFileStorage = require('./db/ConnectFileStorage')
const connectBraintree = require('./db/ConnectBraintree')

const AuthRouter = require('./routes/auth')
const ProductRouter = require('./routes/product')
const CartRouter = require('./routes/cart')
const OrderRouter = require('./routes/order')
const ReviewRouter = require('./routes/review')

//Handler middleware
const errorHandlerMiddleware = require('./middleware/ErrorHandler')
const fileUpload = require('express-fileupload')



//inyeccion dependencias seguridad

app.use(helmet())
app.use(cors({credentials: true, origin: true}))
app.use(xss())

//inyeccion de dependencias.
app.use(express.json())
app.use(fileUpload({useTempFiles: true}))
app.use(cookieParser(process.env.JWT_SECRET))

//ruta vacia de forma predeterminada
//app.get('/', (req, res) => res.status(StatusCodes.OK).send(`server listening on ${port}`))

app.use('/api', ProductRouter)
app.use('/api', AuthRouter)
app.use('/api', CartRouter)
app.use('/api', OrderRouter)
app.use('/api', ReviewRouter)

app.use(errorHandlerMiddleware)

//definicion del puerto
const port = process.env.PORT || 7077

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        connectBraintree(process.env.MERCHANT_ID_BT, process.env.PUBLIC_KEY_BT, process.env.PRIVATE_KEY_BT)
        ConnectFileStorage(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET)
        app.listen(port, () => {
            console.log(`server listening on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
    }

}

start()