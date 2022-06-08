/**
 * @module 9-stock.js
 */
import express from 'express';
import { createClient, print } from 'redis';
import { promisify } from 'util';

// Instantiate a redis client object
const client = createClient();
// Create products list
const listProducts = [
  {
    id: 1, name: 'Suitcase 250', price: 50, stock: 4,
  },
  {
    id: 2, name: 'Suitcase 450', price: 100, stock: 10,
  },
  {
    id: 3, name: 'Suitcase 650', price: 350, stock: 2,
  },
  {
    id: 4, name: 'Suitcase 1050', price: 550, stock: 5,
  },
];

/**
 * @function getItemById
 * @summary blah blah blah
 * @param {string} id id of product
 * @returns {object} object from listProducts
 */
function getItemById(id) {
  let product = null;
  listProducts.forEach((p) => {
    if (p.id === parseInt(id, 10)) product = p;
  });
  return product;
}

/**
 * @function reserveStockById
 * @summary blah blah blah
 * @param {string} itemId id of product
 * @param {number} stock size of stock
 */
function reserveStockById(itemId, stock) {
  client.SET(`item.${itemId}`, stock, print);
}

// Promisify get method of redis client
const getAsync = promisify(client.GET).bind(client);
/**
 * @function getCurrentReservedStockById
 * @summary blah blah blah
 * @param {string} itemId id of product
 * @returns {string} stock size of `itemId`
 */
async function getCurrentReservedStockById(itemId) {
  const response = await getAsync(`item.${itemId}`);
  return response;
}

// Instantiate an express app
const app = express();
const host = '127.0.0.1';
const port = 1245;

// Routes
app.get('/list_products', (_, res) => {
  res.send(JSON.stringify(
    listProducts.map((product) => ({
      itemId: product.id,
      itemName: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock,
    })),
  ));
});

app.get('/list_products/:itemId', (req, res) => {
  const item = getItemById(req.params.itemId);
  if (item !== null) {
    getCurrentReservedStockById(req.params.itemId)
      .then((data) => {
        res.send(JSON.stringify({
          itemId: req.params.itemId,
          itemName: item.name,
          price: item.price,
          initialAvailableQuantity: item.stock,
          currentQuantity: parseInt(data, 10),
        }));
      });
  } else res.send('Item not found');
});

app.get('/reserve_product/:itemId', (req, res) => {
  const item = getItemById(req.params.itemId);
  if (item === null) {
    res.send(JSON.stringify({ status: 'Product not found' }));
  } else if (item.stock < 1) {
    res.send(JSON.stringify(
      {
        status: 'Not enough stock available',
        itemId: req.params.itemId,
      },
    ));
  } else {
    reserveStockById(req.params.itemId, 1);
    res.send(JSON.stringify(
      {
        status: 'Reservation confirmed',
        itemId: req.params.itemId,
      },
    ));
  }
});

// Listen on socket
app.listen(port, host);
