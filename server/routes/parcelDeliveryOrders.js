import express from 'express';

import getParcelDeliveryOrders from '../controllers/getParcelDeliveryOrders';

const router = express.Router();

// Api routes
router.get('/parcels', getParcelDeliveryOrders);

export default router;
