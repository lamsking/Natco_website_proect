// Import variables
var { app, port, mongoose } = require('./app');
var http = require('http').createServer( app);

// Configuring the database
const config = require('./config/database.js');

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connexion a la base de donnees effectuee avec succes !");
}).catch(err => {
    console.log('Erreur de connexion a la base de donnees', err.message);
    process.exit();
});

var server = http.listen(port, () => {
  console.log('Server is running on port', server.address().port);
});
