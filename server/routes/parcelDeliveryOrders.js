import express from 'express';

import getParcelDeliveryOrders from '../controllers/getParcelDeliveryOrders';
import getParcelDeliveryOrder from '../controllers/getParcelDeliveryOrder';

const router = express.Router();

// Api routes
router.get('/parcels', getParcelDeliveryOrders);
router.get('/parcels/:id', getParcelDeliveryOrder);

export default router;
