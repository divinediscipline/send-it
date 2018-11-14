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
    const { parcelId } = req.params;
    if (!isNaN(parcelId)) {
      const foundOrder = allParcelDeliveryOrders.find(singleOrder => singleOrder.parcelId == parcelId);

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
    } else {
      res.status(400).json({
        message: 'ParcelId must be a number',
      });
    }
  }

  static getUserOrders(req, res) {
    const { userId } = req.params;
    if (!isNaN(userId)) {
      const foundOrders = allParcelDeliveryOrders.filter((singleOrder) => {
        return singleOrder.userId == userId;
      });

      if (foundOrders.length >= 1) {
        res.status(200).json(
          {
            message: 'successful',
            foundOrders,
          },
        );
      } else {
        res.status(404).json({
          message: 'Order not found',
        });
      }
    } else {
      res.status(400).json({
        message: 'Bad ID request format',
      });
    }
  }

  static createParcelDeliveryOrder(req, res) {
    allParcelDeliveryOrders.push(req.body);
    res.status(201).json({
      message: 'order created successfully',
      newOrder: req.body,
    });
  }

  static cancelParcelDeliveryOrder(req, res) {
    const { parcelId } = req.params;

    if (!isNaN(parcelId)) {
      const foundOrder = allParcelDeliveryOrders.filter(singleOrder => singleOrder.parcelId == parcelId);
      if (foundOrder.length >= 1) {
        switch (foundOrder[0].status) {
          case 'Pending':
            foundOrder[0].status = 'Cancelled';
            res.status(200).json({
              message: 'Cancelled successfully',
              cancelledOrder: foundOrder,
            });
            break;
          case 'In transit':
            res.status(400).json({
              message: 'Cannot cancel a parcel order already in transit',
            });
            break;
          case 'Delivered':
            res.status(400).json({
              message: 'Cannot cancel a parcel order already delivered',
            });
            break;
          case 'Cancelled':
            res.status(400).json({
              message: 'Parcel order is already cancelled',
            });
            break;
          default:
            res.status(400).json({
              message: 'Order not found',
            });
        }
      } else {
        res.status(404).json({
          message: 'Order not found',
        });
      }
    } else {
      res.status(400).json({
        message: 'ParcelId must be a number',
      });
    }
  }
}

export default Orders;
