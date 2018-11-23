import express from 'express';

import parcelValidator from '../middleware/parcelValidator';
import userAuth from '../middleware/userAuth';
import orderController from '../controllers/orderController';
import userController from '../controllers/userController';
import checkParcelDetails from '../middleware/checkParcelDetails';
import checkUserId from '../middleware/checkUserId';

const router = express.Router();

// Api routes
router.post('/auth/signup', parcelValidator.validateSignup, userController.signup);
router.post('/auth/signup/admin', parcelValidator.validateSignup, userController.signupAdmin);
router.post('/auth/login', parcelValidator.validateLogin, userController.login);
router.post('/auth/login/admin', parcelValidator.validateLogin, userController.loginAdmin);
router.post('/parcels', userAuth.authenticate, parcelValidator.validateParcelOrder, orderController.createParcelDeliveryOrder);
router.get('/parcels', userAuth.authenticate, userAuth.authenticateAdmin, orderController.getAllOrders);
router.get('/parcels/:parcelId', userAuth.authenticate, userAuth.authenticateAdmin, orderController.getOneOrder);
router.get('/users/:userId/parcels', userAuth.authenticate, checkUserId, orderController.getUserOrders);
router.put('/parcels/:parcelId/cancel', userAuth.authenticate, checkParcelDetails, userAuth.verifyId, parcelValidator.validateCancel, orderController.cancelOrder);
router.put('/parcels/:parcelId/destination', userAuth.authenticate, userAuth.verifyId, parcelValidator.validateDestination, orderController.changeParcelDestination);
router.put('/parcels/:parcelId/status', userAuth.authenticate, userAuth.authenticateAdmin, parcelValidator.validateStatusChange, orderController.changeOrderStatus);
router.put('/parcels/:parcelId/presentLocation', userAuth.authenticate, userAuth.authenticateAdmin, orderController.changeLocation);

export default router;
