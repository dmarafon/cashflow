import { initializeServer } from './server/initializeServer';
require('dotenv').config();

const port = process.env.PORT ?? 3333;

(async () => {
    try {
        await initializeServer(port);
    } catch {
        process.exit(1);
    }
})();
