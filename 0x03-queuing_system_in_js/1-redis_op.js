/**
 * @module 0-redis_client
 */
import { createClient, print } from 'redis';

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
 * @function setNewSchool
 * @summary Save a key value in a redis instance
 * @params {string} schoolName the key to store in
 * @params {string} value the value to store
 */
function setNewSchool(schoolName, value) {
  client.SET(schoolName, value, print);
}

/**
 * @function displaySchoolValue
 * @summary Log value of passed key to the console
 * @params {string} schoolName the key to to get value from
 */
function displaySchoolValue(schoolName) {
  client.GET(schoolName, (err, reply) => {
    if (err) console.error(err);
    else console.log(reply);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
