const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const strpe = require('stripe')('sk_test_sqRWr08xH3RuEiwCNZ69y1bP');

const app = express();

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

// Catch 404 and forward to error handler.
app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

const port = process.env.PORT || 5000;  // For Heroku.
app.listen(port, () => console.log(`Server is running on port ${port}`));

