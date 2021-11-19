let express = require('express');   //REQUERIMOS EL MODULO EXPRESS
let app = express();                //EJECUTAMOS EXPRESS
const PORT = 3000;                  //DEFINIMOS EL PUERTO 
let path = require('path')          //USAMOS EL METODO PATH


app.use(express.static("public"))   //PARA LOS ARCHIVOS DE CSS E IMAGENES.

app.set('view engine','ejs')    // INDICAMOS QUE USAREMOS EJS
app.set('views',path.join(__dirname,'views')) //INDICA LA UBICACION DE LA CARPETA DE VIEWS

// Enrutadores
let indexRouter = require('./routes/index') 

// Rutas
app.use('/', indexRouter)


//RUTAS
app.get('/productDetail', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/productDetail.html"))
})

app.get('/productCart', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/productCart.html"))
})

app.get('/register', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/register.html"))
})

app.get('/login', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/login.html"))
})


//PARA LEVANTAR EL SERVIDOR

app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}     
http://localhost:${PORT} 
`))