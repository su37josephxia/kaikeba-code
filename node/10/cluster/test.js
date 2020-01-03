var request = require('request');
setInterval(() => {
    request('http://localhost:3000', function (error, response, body) {
        console.log('body:', body); // Print the HTML for the Google homepage.
    })
}, 1000
)
