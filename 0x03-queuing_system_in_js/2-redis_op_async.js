/**
 * @module 0-redis_client
 */
import { createClient } from 'redis';
import { promisify } from 'util';

// Instantiate a redis client object
const client = createClient();

// Capture an error event and log an error message to console
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Log connection succes to the console
console.log('Redis client connected to the server');

/**
 * @function setNewSchool
 * @summary Save a key value in a redis instance
 * @params {string} schoolName the key to store in
 * @params {string} value the value to store
 */
function setNewSchool(schoolName, value) {
  client.SET(schoolName, value, (err, reply) => {
    if (err) console.error(`Reply: ${err}`);
    else console.log(`Reply: ${reply}`);
  });
}

// Promisify get method of redis client
const getAsync = promisify(client.GET).bind(client);

/**
 * @function displaySchoolValue
 * @summary Log value of passed key to the console
 * @params {string} schoolName the key to to get value from
 */
async function displaySchoolValue(schoolName) {
  const response = await getAsync(schoolName);
  console.log(response);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
