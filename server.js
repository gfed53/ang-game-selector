var express = require('express');
var bodyParser = require('body-parser');
var config = require('./server/config');
var igdb_api = require('./server/routes/igdb-api');

var app = express();

//****** Middleware

app.use(bodyParser.json());
app.use('/igdb-api', igdb_api);


// ******* You can toggle between serving 'src' and 'dist' directories if need be.
app.use(express.static('src'));


// Remove this...
app.get('/access', function(req, res){
    res.json(config.KEYS);
});

var runServer = function(callback) {
    
    app.listen(config.PORT, function() {
        if (callback) {
            callback();
        }
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}