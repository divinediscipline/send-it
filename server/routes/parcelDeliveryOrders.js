import express from 'express';

import getParcelDeliveryOrders from '../controllers/getParcelDeliveryOrders';
import getParcelDeliveryOrder from '../controllers/getParcelDeliveryOrder';
import getUserOrders from '../controllers/getUserOrders';
import cancelParcelDeliveryOrder from '../controllers/cancelParcelDeliveryOrder';

const router = express.Router();

// Api routes
router.get('/parcels', getParcelDeliveryOrders);
router.get('/parcels/:parcelId', getParcelDeliveryOrder);
router.get('/users/:userId/parcels', getUserOrders);
router.put('/parcels/:parcelId/cancel', cancelParcelDeliveryOrder);

export default router;
