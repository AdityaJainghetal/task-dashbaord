const ImageKit = require('imagekit');

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({

    publicKey: "public_t7vS5/u4WNR/Uiufoy3CuNg0zwg=",   // Public API Key from your ImageKit dashboard
    urlEndpoint: " private_9Pbu6xg2EiEE1BQVj+dpZ8EEUeY=", // Your URL endpoint from the dashboard
    privateKey: "https://ik.imagekit.io/xsrqwtf74h/DelaFoods/", // Private API Key from your ImageKit dashboard

});

module.exports = imagekit;