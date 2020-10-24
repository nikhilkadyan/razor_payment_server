require('dotenv').config();
// Import Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

// Inject Dependencies
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
require('./modules/routes')(app)

// Start Server
app.set('port', process.env.PORT || 4000);
const http = require("http");
let server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("Server started on port " + app.get('port'));
});