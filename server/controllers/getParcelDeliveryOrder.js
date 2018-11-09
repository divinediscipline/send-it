import orderData from '../models/db/orderData';

const getParceDeliveryOrder = (req, res) => {
  const { parcelId } = req.params;
  if (!isNaN(parcelId)) {
    const foundOrder = orderData.find((singleOrder) => {
      return singleOrder.parcelId == parcelId;
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
