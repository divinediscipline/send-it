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
      sendersFirstName: req.body.sendersFirstName,
      sendersLastName: req.body.sendersLastName,
      sendersPhone: req.body.sendersPhone,
      parcelDescription: req.body.parcelDescription,
      weightCategory: req.body.weightCategory,
      price: req.body.price,
      pickUpLocation: req.body.pickUpLocation,
      destination: req.body.destination,
      packageTransitTime: req.body.packageTransitTime,
      receiversFirstName: req.body.receiversFirstName,
      receiversLastName: req.body.receiversLastName,
      receiversEmail: req.body.receiversEmail,
      receiversPhone: req.body.receiversPhone,
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
      } else {
        res.status(400).json({
          message: 'Cannot cancel order',
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
