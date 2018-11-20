import allParcelDeliveryOrders from '../models/db/orderData';
import client from '../models/db/dbconnect';


class OrderController {
  static getAllOrders(req, res) {
    const sql = 'SELECT * FROM parcels';
    return client.query(sql).then((result) => {
      res.status(200).json(
        {
          message: 'All parcel delivery orders',
          data: [result.rows[0]],
        },
      );
    }).catch((error) => {
      res.status(422).json({
        message: 'Error processing your request',
        error,
      });
    });
  }

  static getOneOrder(req, res) {
    const { parcelId } = req.params;
    const sql = 'SELECT * FROM parcels WHERE parcel_id = $1';
    const params = [parcelId];
    return client.query(sql, params).then((result) => {
      if (result.rows[0]) {
        res.status(200).json(
          {
            message: 'Your delivery order',
            data: [result.rows[0]],
          },
        );
      } else {
        res.status(404).json({
          message: 'Order not found',
        });
      }
    }).catch((error) => {
      res.status(422).json({
        message: 'Error processing your request',
        error,
      });
    });
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
    const parcelsTable = `CREATE TABLE IF NOT EXISTS parcels
    (
      parcel_id SERIAL PRIMARY KEY,
      parcelDescription VARCHAR(255) NOT NULL,
      weight float NOT NULL,
      weightMetric VARCHAR(255) NOT NULL,
      sentOn TIMESTAMPTZ DEFAULT now() NOT NULL,
      deliveredOn TIMESTAMPTZ DEFAULT now() NOT NULL,
      present_location VARCHAR(255) DEFAULT 'Not available' NOT NULL,
      status VARCHAR(20) DEFAULT 'Placed' NOT NULL,
      pickupLocation VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      receiversEmail VARCHAR(100) NOT NULL
    );`;
    return client.query(parcelsTable).then(() => {
      const sql = 'INSERT INTO parcels (parcelDescription, weight, weightMetric, pickUpLocation, destination, receiversEmail) VALUES ($1, $2, $3, $4, $5, $6) RETURNING parcel_id';
      const params = [req.body.parcelDescription, req.body.weight, req.body.weightMetric, req.body.pickUpLocation, req.body.destination, req.body.receiversEmail];
      return client.query(sql, params);
    }).then((parcel_id) => {
      const data = [{
        parcel_id: parcel_id.rows[0].parcel_id,
        message: 'order created',
      }];
      res.status(201).json({
        data,
      });
    }).catch((error) => {
      res.status(422).json({
        message: 'Error processing your request',
        error,
      });
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

  static changeParcelDestination(req, res) {
    const { destination } = req.body;
    const { parcelId } = req.params;
    const sql = 'UPDATE parcels SET destination = $1 WHERE parcel_id = $2 RETURNING parcel_id, destination';
    const params = [destination, parcelId];
    return client.query(sql, params).then((result) => {
      console.log('result', result);
      const data = [{
        parcel_id: result.rows[0].parcel_id,
        destination: result.rows[0].destination,
        message: 'Parcel destination updated',
      }];
      res.status(200).json({
        data,
      });
    }).catch((error) => {
      res.status(422).json({
        message: 'Error processing your request',
        error,
      });
    });
  }

  static changeOrderStatus(req, res) {
    const { parcelId } = req.params;
    const { status } = req.body;
    const sql = 'UPDATE parcels SET status = $1 WHERE parcel_id = $2 RETURNING parcel_id, status';
    const params = [status, parcelId];
    return client.query(sql, params).then((result) => {
      const data = [{
        parcel_id: result.rows[0].parcel_id,
        status: result.rows[0].status,
        message: 'Parcel status updated',
      }];
      res.status(200).json({
        data,
      });
    }).catch((error) => {
      res.status(422).json({
        message: 'Error processing your request',
        error,
      });
    });
  }

  static changeLocation(req, res) {
    const { parcelId } = req.params;
    const { present_location } = req.body;
    const sql = 'UPDATE parcels SET present_location = $1 WHERE parcel_id = $2 RETURNING parcel_id, present_location';
    const params = [present_location, parcelId];
    return client.query(sql, params).then((result) => {
      const data = [{
        parcel_id: result.rows[0].parcel_id,
        status: result.rows[0].present_location,
        message: 'Parcel location updated',
      }];
      res.status(200).json({
        data,
      });
    }).catch((error) => {
      res.status(422).json({
        message: 'Error processing your request',
        error,
      });
    });
  }
}

export default OrderController;
