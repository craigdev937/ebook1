const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const strpe = require('stripe')('sk_test_sqRWr08xH3RuEiwCNZ69y1bP');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Login!' });
});

const port = process.env.PORT || 5000;  // For Heroku.
app.listen(port, () => console.log(`Server is running on port ${port}`));

