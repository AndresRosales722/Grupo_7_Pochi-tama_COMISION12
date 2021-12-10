let express = require('express');   //REQUERIMOS EL MODULO EXPRESS
let app = express();                //EJECUTAMOS EXPRESS
const PORT = 3000;                  //DEFINIMOS EL PUERTO 
let path = require('path')          //USAMOS EL METODO PATH


app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())


//PARA LOS ARCHIVOS DE CSS E IMAGENES.
app.set('view engine','ejs')    // INDICAMOS QUE USAREMOS EJS
app.set('views',path.join(__dirname,'views')) //INDICA LA UBICACION DE LA CARPETA DE VIEWS




// Enrutadores
let indexRouter = require('./routes/index') 
let productsRouter = require('./routes/products')
let adminRouter = require('./routes/admin')
let usersRouter = require('./routes/users')



// Middlewares de rutas
app.use('/', indexRouter)
app.use('/admin',adminRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)





//PARA LEVANTAR EL SERVIDOR

app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}     
http://localhost:${PORT} 
`))