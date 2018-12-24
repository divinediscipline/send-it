import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

class Helpers {
  static generateAuthToken(id, email, isadmin) {
    const token = jwt.sign({ id, email, isadmin }, process.env.SECRET);
    return token;
  }

  static sendMail(subject, html, receiver) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: receiver,
      from: 'divinediscipline4real@gmail.com',
      subject,
      html,
    };
    sgMail
      .send(msg)
      .then(() => console.log('mail successfully sent'))
      .catch(error => console.log(error));
  }

  static messageHTML(mailMessage) {
    return `<div style="font-family: 'Verdana';">
      <header style="text-align: center; background: #51BB7B; padding: 5px;"><h1 style="color: #205334; margin-bottom:0;">SEND-IT</h1><small style="color: white; margin-top:0;"><i>world class courier services</i></small></header>
      <section style="font-size: 13px; background-color: white; padding: 10px; margin: 20px auto; border: 10px solid #F2F2F2;"> 
      ${mailMessage}
      </section>
      </div>`;
  }

  static prepareChangeStatusMail(status, id, name) {
    const message = `<p> Dear <b><i>${name}</i></b>, <br><br> Your parcel with parcel id: <b>${id}</b> is <b>${status}</b></p>
    <p>You can track your parcel here, if it is yet to be delivered</p>`;
    return {
      subject: 'Update on your parcel delivery order',
      html: Helpers.messageHTML(message),
    };
  }

  static prepareSignUpMail(name) {
    const message = `<p>Dear <b><i>${name}</i></b>. Welcome to SEND-IT. We are glad to have you. We offer world class courier services to any location.
    Create an order today and start experiencing the best.
    </p>`;
    return {
      subject: 'Welcome To SEND-IT !',
      html: Helpers.messageHTML(message),
    };
  }

  static prepareNewOrderMail(parcel, name) {
    const message = `<p>Dear <b><i>${name}</i></b>. Your order has been placed. 
    One of our representatives would call you soon to find out more about your order before coming to get your parcel for delivery. Below are details of your order:</p>
    <ul>
    <li> <b>Parcel id:</b> ${parcel.parcelId}.</li>
    <li> <b>Pickup location:</b> <address>${parcel.pickUpLocation}.</address></li>
    <li> <b>Destination:</b> <address>${parcel.destination}.</address></li>
    <li> <b>Pickup Time:</b> ${parcel.pickUpTime}.</li>
    <li> <b>Parcel description:</b> ${parcel.parcelDescription}.</li>
    <li> <b>Parcel Weight:</b> ${parcel.weightMetric}.</li>
    </ul>
    <p>Please note that you can change the destination of your parcel or cancel your parcel delivery order HERE</p>`;

    return {
      subject: 'Order successfully created',
      html: Helpers.messageHTML(message),
    };
  }

  static prepareChangeLocationMail(location, id, name) {
    const message = `<p>Dear <b><i>${name}</i></b>. Your parcel with parcel id <b>${id}</b> is presently at <address><b>${location}.</b></address></p>
    <p>You can track your parcel while it is in transit</p>`;
    return {
      subject: 'Update on your parcel delivery order',
      html: Helpers.messageHTML(message),
    };
  }
}

export default Helpers;
