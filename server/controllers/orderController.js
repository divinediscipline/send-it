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
      res.status(500).json({
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
            message: 'Order retrieved successfully',
            data: [result.rows[0]],
          },
        );
      } else {
        res.status(404).json({
          message: 'Order not found',
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: 'Error processing your request',
        error,
      });
    });
  }

  static getUserOrders(req, res) {
    const { userId } = req.params;
    const sql = 'SELECT * FROM parcels WHERE userid = $1';
    const params = [userId];
    return client.query(sql, params).then((result) => {
      if (result.rows[0]) {
        res.status(200).json(
          {
            message: 'All your parcel delivery orders',
            data: [result.rows[0]],
          },
        );
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: 'Error processing your request',
        error,
      });
    });
  }


  static createParcelDeliveryOrder(req, res) {
    const sql = 'INSERT INTO parcels (userid, parceldescription, weightmetric, pickuplocation, destination, receiversphonenumber, receiversemail, pickuptime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING parcel_id';
    const params = [req.body.decoded.id, req.body.parceldescription, req.body.weightmetric, req.body.pickuplocation, req.body.destination, req.body.receiversphonenumber, req.body.receiversemail, req.body.pickuptime];
    return client.query(sql, params).then((parcel_id) => {
      const data = [{
        parcel_id: parcel_id.rows[0].parcel_id,
        message: 'order created',
      }];
      res.status(201).json({
        data,
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Error processing your request',
        error,
      });
    });
  }


  static cancelOrder(req, res) {
    const { parcelId } = req.params;
    const { status } = req.body;
    const sql = 'UPDATE parcels SET status = $1 WHERE parcel_id = $2 RETURNING parcel_id, status';
    const params = [status, parcelId];
    return client.query(sql, params).then((result) => {
      const data = [{
        parcel_id: result.rows[0].parcel_id,
        status: result.rows[0].status,
        message: 'Order cancelled',
      }];
      return res.status(200).json({
        data,
      });
    }).catch((error) => {
      return res.status(500).json({
        message: 'Error processing your request',
        error,
      });
    });
  }

  static changeParcelDestination(req, res) {
    const { destination } = req.body;
    const { parcelId } = req.params;
    const sql = 'UPDATE parcels SET destination = $1 WHERE parcel_id = $2 RETURNING parcel_id, destination';
    const params = [destination, parcelId];
    return client.query(sql, params).then((result) => {
      const data = [{
        parcel_id: result.rows[0].parcel_id,
        destination: result.rows[0].destination,
        message: 'Parcel destination updated',
      }];
      res.status(200).json({
        data,
      });
    }).catch((error) => {
      res.status(500).json({
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
      res.status(500).json({
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
      res.status(500).json({
        message: 'Error processing your request',
        error,
      });
    });
  }
}

export default OrderController;
