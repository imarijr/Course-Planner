/*const express = require('express'); 

// 3rd party libraries 

// custom routes
const image = require('./routes/image'); 

// instantiate express instance
const app = express(); 

// base route
app.get('/', (req, res) => {
    res.status(200).send('....idk')
})

// register custom routes
app.use('/image', image); 

// define port
const port = process.env.PORT || 1337

// create server instance
const httpServer = require('http').createServer(app); 

// server listen
httpServer.listen(port, () => {
    console.log('my express server is running on port ' + port + '.')
});*/