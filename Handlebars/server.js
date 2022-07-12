import express from 'express'
import { engine } from 'express-handlebars';
import Container from './Container.js'

const app = express()

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials"
}));
app.set('view engine', 'hbs')
app.set('views', "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productContainer = new Container()

app.get('', (req, res) => {
    res.render('form');
})

app.get('/productos', (req, res) => {
    console.log(productContainer.getAllItems().length)
    res.render("products", { products: productContainer.getAllItems(), why: true });
});

app.post('/productos', (req, res) => {
    const newProduct = req.body;
    productContainer.add(newProduct);
    console.log(newProduct)
    console.log(`se agrego un producto, cantidad total: ${productContainer.getAllItems().length}`)
    res.redirect('..');
})

app.use(express.static('public'))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))