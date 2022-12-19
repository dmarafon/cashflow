require('dotenv').config();
import { app } from '.';

export const initializeServer = (port) =>
    new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            console.log(`Server listening on port ${port}`);

            resolve(undefined);
        });

        server.on('error', (error: any) => {
            console.log('Error on server');
            if (error.code === 'EADDRINUSE') {
                console.log('EADDRINUSE');

                reject();
            }
        });
    });
