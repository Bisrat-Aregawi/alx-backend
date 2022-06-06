/**
 * @module 0-redis_client
 */
import { createClient } from 'redis';

// Instantiate a redis client object
const client = createClient();

// Capture an error event and log an error message to console
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Connect to server with default credentials
await client.connect();

// Log connection succes to the console
console.log('Redis client connected to the server');
