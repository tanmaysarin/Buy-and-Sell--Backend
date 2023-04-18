import Hapi from '@hapi/hapi';

const start = async() =>{
    // setting up the Hapi server
    const server = Hapi.server({
        // set up the port on which the server should start on
        // Aka passing in the configuration objectt
        port: 8000,
        host:'localhost',
    });

    server.route({
        method: 'GET', // endpoint
        path: '/hello',
        // it is a callback function which will get called whenever the server the correct type of request on the endpoint specified
        // req: contains details about the requests received
        // h: response toolkit
        // anything returned from handler will be sent back to the clients as a response
        handler: (req, h) => {
            return 'Hello!';
        }
    });

    await server.start();
    console.log(`Server is listening on port ${server.info.uri}`); // gives basic path to access the server from
}

// listens for unhandeled rejections on node server
process.on('unhandledRejection', err =>{
    console.log(err);
    process.traceDeprecation(1);
});

// call function to start up the server
start();