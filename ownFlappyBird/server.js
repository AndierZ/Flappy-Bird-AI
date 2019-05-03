var express = require('express');
var app = express();

var cors = require('cors')
app.use(cors());

app.use('/images', express.static('images'));

var server = app.listen(5000);