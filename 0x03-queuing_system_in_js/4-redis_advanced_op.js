/**
 * @module 4-redis_advanced_op
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

// Set key value to `HolbertonSchools` hash table one by one
client.hset('HolbertonSchools', 'Portland', 50, print);
client.hset('HolbertonSchools', 'Seattle', 80, print);
client.hset('HolbertonSchools', 'New York', 20, print);
client.hset('HolbertonSchools', 'Bogota', 20, print);
client.hset('HolbertonSchools', 'Cali', 40, print);
client.hset('HolbertonSchools', 'Paris', 2, print);

// Get key value pairs of `HolbertonSchools` hash
client.hgetall('HolbertonSchools', (err, val) => {
  if (err) console.error(err);
  else console.log(val);
});
