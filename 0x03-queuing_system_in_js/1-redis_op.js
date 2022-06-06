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

/**
 * @function setNewSchool
 * @summary Save a key value in a redis instance
 * @params {string} schoolName the key to store in
 * @params {string} value the value to store
 */
function setNewSchool(schoolName, value) {
  client.SET(schoolName, value)
    .then((reply) => {
      console.log(`Reply: ${reply}`);
    });
}

/**
 * @function displaySchoolValue
 * @summary Log value of passed key to the console
 * @params {string} schoolName the key to to get value from
 */
function displaySchoolValue(schoolName) {
  client.GET(schoolName)
    .then((value) => {
      console.log(value);
    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
