import allParcelDeliveryOrders from '../models/db/orderData';


class Orders {
  static getParcelDeliveryOrders(req, res) {
    res.status(200).json(
      {
        allParcelDeliveryOrders,
      },
    );
  }

  static getParcelDeliveryOrder(req, res) {
    const receivedParcelId = req.params.parcelId;
    const foundOrder = allParcelDeliveryOrders.find(singleOrder => singleOrder.parcelId === +receivedParcelId);
    if (foundOrder) {
      res.status(200).json(
        {
          message: 'successful',
          foundOrder,
        },
      );
    } else {
      res.status(404).json({
        message: 'Order not found',
      });
    }
  }

  static getUserSingleOrder(req, res) {
    const receivedParcelId = req.params.parcelId;
    const { userId } = req.params;
    const allUserOrders = allParcelDeliveryOrders.filter(singleOrder => singleOrder.userId === +userId);
    const foundOrder = allUserOrders.find(singleOrder => singleOrder.parcelId === +receivedParcelId);
    if (foundOrder) {
      res.status(200).json(
        {
          message: 'successful',
          foundOrder,
        },
      );
    } else {
      res.status(404).json({
        message: 'Order not found',
      });
    }
  }

  static getUserOrders(req, res) {
    const { userId } = req.params;
    const foundOrders = allParcelDeliveryOrders.filter(singleOrder => singleOrder.userId === +userId);
    if (foundOrders.length >= 1) {
      res.status(200).json(
        {
          message: 'successful',
          foundOrders,
        },
      );
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  }

  static createParcelDeliveryOrder(req, res) {
    const parcelId = allParcelDeliveryOrders[allParcelDeliveryOrders.length - 1].parcelId + 1;
    const userId = allParcelDeliveryOrders[allParcelDeliveryOrders.length - 1].userId + 1;
    const newOrder = {
      parcelId,
      userId,
      parcelDescription: req.body.parcelDescription,
      pickUpLocation: req.body.pickUpLocation,
      destination: req.body.destination,
      receiversFirstName: req.body.receiversFirstName,
      receiversLastName: req.body.receiversLastName,
      receiversEmail: req.body.receiversEmail,
      receiversPhoneNumber: req.body.receiversPhoneNumber,
      status: 'Pending',
    };
    allParcelDeliveryOrders.push({
      newOrder,
    });
    res.status(201).json({
      message: 'order created successfully',
      newOrder,
    });
  }

  static cancelParcelDeliveryOrder(req, res) {
    const { parcelId } = req.params;
    const foundOrder = allParcelDeliveryOrders.filter(singleOrder => singleOrder.parcelId === +parcelId);
    if (foundOrder.length >= 1) {
      if (foundOrder[0].status !== 'Cancelled' && foundOrder[0].status !== 'Delivered') {
        foundOrder[0].status = 'Cancelled';
        res.status(200).json({
          message: 'Cancelled successfully',
          cancelledOrder: foundOrder,
        });
      } else if (foundOrder[0].status === 'Cancelled') {
        res.status(400).json({
          message: 'Order is already cancelled, cannot cancel again.',
        });
      } else {
        res.status(400).json({
          message: 'Cannot cancel  an already delivered order',
        });
      }
    } else {
      res.status(404).json({
        message: 'Order not found',
      });
    }
  }
}

export default Orders;
