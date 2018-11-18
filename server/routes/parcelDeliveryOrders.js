import express from 'express';

import orders from '../controllers/orders';
import userController from '../controllers/userController';
import validateSignup from '../middleware/validateSignup';
import checkParcelId from '../middleware/checkParcelId';
import checkUserId from '../middleware/checkUserId';

const router = express.Router();

// Api routes
router.post('/auth/signup', validateSignup, userController.signup);
router.post('/auth/login', userController.login);
router.get('/parcels', orders.getParcelDeliveryOrders);
router.get('/parcels/:parcelId', checkParcelId, orders.getParcelDeliveryOrder);
router.get('/users/:userId/parcels', checkUserId, orders.getUserOrders);
router.get('/users/:userId/:parcelId', checkUserId, checkParcelId, orders.getUserSingleOrder);
router.put('/parcels/:parcelId/cancel', checkParcelId, orders.cancelParcelDeliveryOrder);


export default router;
