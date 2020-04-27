// will also go in the routes folder 
// here it depends on what you're doing
/*
const thirdPartyLibrary = require('thirdPartyLibrary'); 

// credentials (API keys, oauth, etc)

const client = thirdPartyLibrary.connect({...})     // some json object w your credentials 

// class methods
const size = {
    'create': , 
    'read': readImage, 
    'update': , 
    'destroy': , 
}

function readImage(req, res) {
    // function that returns height and width of an image 
    // return {
        // height: height,
        // width: width
    // }; 
    client.image.getSize({}, (err, response) => {
        if (response.success) {
            res.status(200).send(); 
        } else {
            return res.status(400).send({
                code: response.errors.code, 
                message: response.errors.message
            })
        }
    }); 
}

module.exports = size; */