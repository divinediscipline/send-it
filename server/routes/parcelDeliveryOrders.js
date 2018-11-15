import express from 'express';

import orders from '../controllers/orders';
import validateParcelOrder from '../middleware/validateParcelOrder';
import checkParcelId from '../middleware/checkParcelId';
import checkUserId from '../middleware/checkUserId';

const router = express.Router();

// Api routes
router.get('/parcels', orders.getParcelDeliveryOrders);
router.get('/parcels/:parcelId', checkParcelId, orders.getParcelDeliveryOrder);
router.get('/users/:userId/parcels', checkUserId, orders.getUserOrders);
router.put('/parcels/:parcelId/cancel', checkParcelId, orders.cancelParcelDeliveryOrder);
router.post('/parcels', validateParcelOrder, orders.createParcelDeliveryOrder);

export default router;
