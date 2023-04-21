import Hapi from '@hapi/hapi';
import routes from './routes';
import {db} from './database';

let server;

const start = async() =>{
    // setting up the Hapi server
    server = Hapi.server({
        // set up the port on which the server should start on
        // Aka passing in the configuration objectt
        port: 8000,
        host:'localhost',
    });

    // it is a callback function which will get called whenever the server the correct type of request on the endpoint specified
    // req: contains details about the requests received
    // h: response toolkit
    // anything returned from handler will be sent back to the clients as a response
    //handler: (req, h) => {}

    routes.forEach(route => server.route(route));

    db.connect();

    await server.start();
    console.log(`Server is listening on port ${server.info.uri}`); // gives basic path to access the server from
}

// listens for unhandeled rejections on node server
process.on('unhandledRejection', err =>{
    console.log(err);
    process.traceDeprecation(1);
});

process.on('SIGINT', async () =>{
    console.log('Stopping server...');
    await server.stop({ timeout: 10000 });
    db.end();
    console.log('Server stopped');
    process.exit(0);
})

// call function to start up the server
start();