import express from 'express';

import orders from '../controllers/orders';
import validateParcelOrder from '../middleware/validateParcelOrder';

const router = express.Router();

// Api routes
router.get('/parcels', orders.getParcelDeliveryOrders);
router.get('/parcels/:parcelId', orders.getParcelDeliveryOrder);
router.get('/users/:userId/parcels', orders.getUserOrders);
router.put('/parcels/:parcelId/cancel', orders.cancelParcelDeliveryOrder);
router.post('/parcels', validateParcelOrder, orders.createParcelDeliveryOrder);

export default router;
