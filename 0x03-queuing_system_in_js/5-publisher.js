/**
 * @module 5-publisher
 */
import { createClient } from 'redis';

// Instantiate a redis client object
const client = createClient();

// Capture an error event and log an error message to console
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Log connection succes to the console
client.on('ready', () => {
  console.log('Redis client connected to the server');
});

/**
 * @function publishMessage
 * @summary DON'T FORGET TO WRITE THIS
 * @param {string} message Display a message
 * @param {number} time Time in milli seconds
 */
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    // Publish to specified channel (pub/sub in effect)
    client.publish('Holberton school channel', message);
  }, time);
}

// Call `publishMessage` with arguments
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
