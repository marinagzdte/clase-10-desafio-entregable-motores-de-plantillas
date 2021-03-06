import express from 'express';
import { engine } from 'express-handlebars';
import Container from './Container.js';

const app = express();
const productContainer = new Container();

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials"
}));
app.set('view engine', 'hbs');
app.set('views', "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('', (req, res) => {
    res.render('form');
});

app.get('/productos', (req, res) => {
    res.render("products", { products: productContainer.getAllItems() });
});

app.post('/productos', (req, res) => {
    const newProduct = req.body;
    productContainer.add(newProduct);
    res.redirect('..');
});

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on('error', error => console.log(`Error en servidor ${error}`));