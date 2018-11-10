import orderData from '../models/db/orderData';

const cancelParcelDeliveryOrder = (req, res) => {
  const { parcelId } = req.params;

  if (!isNaN(parcelId)) {
    const foundOrder = orderData.filter(singleOrder => singleOrder.parcelId == parcelId);
    if (foundOrder.length >= 1) {
      foundOrder.status = 'cancelled';
      res.status(200).json({
        message: 'Cancelled successfully',
        'cancelled order': foundOrder,
      });
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
};

export default cancelParcelDeliveryOrder;
