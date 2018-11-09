import orderData from '../models/db/orderData';

const getUserOrders = (req, res) => {
  const { userId } = req.params;
  if (!isNaN(userId)) {
    const foundOrders = orderData.filter((singleOrder) => {
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
};

export default getUserOrders;
