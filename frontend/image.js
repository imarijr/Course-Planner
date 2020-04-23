// will be in the "routes" folder

const express = require('express'); 
const bodyParser = require('body-parser'); 
const router = express.Router(); 
const jsonParser = bodyParser.json(); 

// requires controller modules
const SizeController = require('./size.controller');
const ColorController = require('./color.controller');

// security (CORS) - when you try to access image on front end from another domain 
// next - middleware 
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");     // header - what your browser receives before it receives something 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    next(); 
});

// image endpoints 
// size, color, filters, etc. 
router.get('/size', SizeController.read);   // reads size of image in px, inches, etc. width x height
router.post('/color/grayscale', jsonParser, ColorController.grayscale);    // takes image url and runs grayscale function 

module.exports = router;    // putting all the routes on the router object 

