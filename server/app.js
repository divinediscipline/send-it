import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import parcelDeliveryOrders from './routes/parcelDeliveryOrders';

const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('UI'));
app.use('/api/v1', parcelDeliveryOrders);


app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the send-it API',
  v1: '/api/v1',
}));

// Setup a default catch-all route
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome, Please kindly check your URL again to access the appropriate resource.',
}));

export default app;
