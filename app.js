// requirements

const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const path = require('path');

// Initialize the app

const app = express();

// handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Public
app.use(express.static('./public'));

// Routes
app.get ('/', ()=> res.render('index'))

const port = 3001

app.listen(port, () => console.log(`server on port ${port}`))

