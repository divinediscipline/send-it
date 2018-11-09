import express from 'express';

import getParcelDeliveryOrders from '../controllers/getParcelDeliveryOrders';
import getParcelDeliveryOrder from '../controllers/getParcelDeliveryOrder';
import getUserOrders from '../controllers/getUserOrders';

const router = express.Router();

// Api routes
router.get('/parcels', getParcelDeliveryOrders);
router.get('/parcels/:parcelId', getParcelDeliveryOrder);
router.get('/users/:userId/parcels', getUserOrders);

export default router;
