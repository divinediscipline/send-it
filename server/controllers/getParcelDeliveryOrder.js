import orderData from '../models/db/orderData';

const getParceDeliveryOrder = (req, res) => {
  const { id } = req.params;
  if (!isNaN(id)) {
    const foundOrder = orderData.find((singleOrder) => {
      return singleOrder.id == id;
    });

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
      message: 'Bad ID request format',
    });
  }
};

export default getParceDeliveryOrder;
