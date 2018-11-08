import allParcelDeliveryOrders from '../models/db/orderData';

const getParcelDeliveryOrders = (req, res) => {
  res.status(200).json(
    {
      allParcelDeliveryOrders,
    },
  );
};

export default getParcelDeliveryOrders;
