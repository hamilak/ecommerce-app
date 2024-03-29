const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const route = require('../server/routes/router');
require('./database/connect');
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);
app.use(cors());
const port = 3000;

app.use('/', route);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
