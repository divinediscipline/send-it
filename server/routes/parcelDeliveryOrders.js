import express from 'express';

import getParcelDeliveryOrders from '../controllers/getParcelDeliveryOrders';
import getParcelDeliveryOrder from '../controllers/getParcelDeliveryOrder';
import getUserOrders from '../controllers/getUserOrders';
import cancelParcelDeliveryOrder from '../controllers/cancelParcelDeliveryOrder';
import createParcelDeliveryOrder from '../controllers/createParcelDeliveryOrder';

const router = express.Router();

// Api routes
router.get('/parcels', getParcelDeliveryOrders);
router.get('/parcels/:parcelId', getParcelDeliveryOrder);
router.get('/users/:userId/parcels', getUserOrders);
router.put('/parcels/:parcelId/cancel', cancelParcelDeliveryOrder);
router.post('/parcels', createParcelDeliveryOrder);

export default router;
