import express from 'express';

import orderController from '../controllers/orderController';
import userController from '../controllers/userController';
import validateSignup from '../middleware/validateSignup';
import validateLogin from '../middleware/validateLogin';
import checkParcelId from '../middleware/checkParcelId';
import checkUserId from '../middleware/checkUserId';

const router = express.Router();

// Api routes
router.post('/auth/signup', validateSignup, userController.signup);
router.post('/auth/login', validateLogin, userController.login);
router.get('/parcels', orderController.getAllOrders);
router.get('/parcels/:parcelId', checkParcelId, orderController.getOneOrder);
router.get('/users/:userId/parcels', checkUserId, orderController.getUserOrders);
// router.get('/users/:userId/:parcelId', checkUserId, checkParcelId, orderController.getUserSingleOrder);
router.put('/parcels/:parcelId/cancel', checkParcelId, orderController.cancelOrder);
router.post('/parcels', orderController.createParcelDeliveryOrder);
router.put('/parcels/:parcelId/destination', orderController.changeParcelDestination);
router.put('/parcels/:parcelId/status', orderController.changeOrderStatus);
router.put('/parcels/:parcelId/presentLocation', orderController.changeLocation);

export default router;
