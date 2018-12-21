import client from '../models/db/dbconnect';


class OrderController {
  static getAllOrders(req, res) {
    const sql = 'SELECT * FROM parcels';
    return client.query(sql).then((result) => {
      res.status(200).json(
        {
          message: 'All parcel delivery orders',
          data: result.rows,
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
            data: result.rows[0],
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
            data: result.rows,
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
    const sql = 'INSERT INTO parcels (userid, parceldescription, weightmetric, presentlocation, pickuplocation, destination, receiversphonenumber, receiversemail, pickuptime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const params = [req.body.decoded.id, req.body.parceldescription, req.body.weightmetric, req.body.presentlocation, req.body.pickuplocation, req.body.destination, req.body.receiversphonenumber, req.body.receiversemail, req.body.pickuptime];
    return client.query(sql, params).then((parcel) => {
      const data = {
        message: 'order created successfully',
        parcelId: parcel.rows[0].parcel_id,
        userId: parcel.rows[0].userid,
        parcelDescription: parcel.rows[0].parceldescription,
        weightMetric: parcel.rows[0].weightmetric,
        sentOn: parcel.rows[0].senton,
        status: parcel.rows[0].status,
        pickUpLocation: parcel.rows[0].pickuplocation,
        destination: parcel.rows[0].destination,
        presentLocation: parcel.rows[0].presentlocation,
        receiversPhonenumber: parcel.rows[0].receiversphonenumber,
        receiversEmail: parcel.rows[0].receiversemail,
        pickUpTime: parcel.rows[0].pickuptime,
      };
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
    // const { status } = req.body;
    const sql = 'UPDATE parcels SET status = $1 WHERE parcel_id = $2 RETURNING parcel_id, status';
    const params = ['Cancelled', parcelId];
    return client.query(sql, params).then((result) => {
      const data = {
        parcel_id: result.rows[0].parcel_id,
        status: result.rows[0].status,
        message: 'Order cancelled successfully',
      };
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
      const data = {
        parcel_id: result.rows[0].parcel_id,
        destination: result.rows[0].destination,
        message: 'Parcel destination updated',
      };
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
      const data = {
        parcel_id: result.rows[0].parcel_id,
        status: result.rows[0].status,
        message: 'Parcel status updated',
      };
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
    const { presentlocation } = req.body;
    const sql = 'UPDATE parcels SET presentlocation = $1 WHERE parcel_id = $2 RETURNING parcel_id, presentlocation';
    const params = [presentlocation, parcelId];
    return client.query(sql, params).then((result) => {
      const data = {
        parcel_id: result.rows[0].parcel_id,
        presentLocation: result.rows[0].presentlocation,
        message: 'Parcel location updated',
      };
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
