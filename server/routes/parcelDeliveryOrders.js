import express from 'express';

import parcelValidator from '../middleware/parcelValidator';
import orderController from '../controllers/orderController';
import userController from '../controllers/userController';
import checkParcelId from '../middleware/checkParcelId';
import checkUserId from '../middleware/checkUserId';

const router = express.Router();

// Api routes
router.post('/auth/signup', parcelValidator.validateSignup, userController.signup);
router.post('/auth/login', parcelValidator.validateLogin, userController.login);
router.get('/parcels', parcelValidator.authenticate, orderController.getAllOrders);
router.get('/parcels/:parcelId', checkParcelId, orderController.getOneOrder);
router.get('/users/:userId/parcels', checkUserId, orderController.getUserOrders);
router.put('/parcels/:parcelId/cancel', checkParcelId, orderController.cancelOrder);
router.post('/parcels', parcelValidator.validateParcelOrder, parcelValidator.authenticate, orderController.createParcelDeliveryOrder);
router.put('/parcels/:parcelId/destination', orderController.changeParcelDestination);
router.put('/parcels/:parcelId/status', orderController.changeOrderStatus);
router.put('/parcels/:parcelId/presentLocation', orderController.changeLocation);

export default router;
