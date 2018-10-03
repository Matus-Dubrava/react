const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const router = require('./router');
const User = require('./models'); 

// app setup
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', router);

// server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
