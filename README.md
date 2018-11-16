# send-it

[![Build Status](https://travis-ci.org/divinediscipline/send-it.svg?branch=develop)](https://travis-ci.org/divinediscipline/send-it)
[![Coverage Status](https://coveralls.io/repos/github/divinediscipline/send-it/badge.svg)](https://coveralls.io/github/divinediscipline/send-it)
[![Maintainability](https://api.codeclimate.com/v1/badges/5cca71df07e5907535eb/maintainability)](https://codeclimate.com/github/divinediscipline/send-it/maintainability)

Lives at: https://divinediscipline.github.io/send-it/UI/

SendIT is a courier service that helps users deliver parcels to different destinations. Prices are based on weight categories.

## Features
* Users can Sign up and Sign in.
* Users can create a parcel delivery order
* Users can change the destination of a parcel delivery order.
* Users can cancel a parcel delivery order.
* Users can see the details of a delivery order
* Admin can change the status and present location of a parcel delivery order.

## Technologies used

 **User Interface**

* HTML
* CSS
* Javascript

**Server-side API**
NodeJS 
ExpressJS
Babel

**Testing tools**
Supertest
Mocha

## Api information

<table>
   <tr>
    <th>Method</th>
    <th>Description</th>
    <th>Endpoint</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>GET all orders</td>
    <td>GET /api/v1/parcels/</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>GET a particular order</td>
    <td>GET /api/v1/parcels/<parcelId></td>
  </tr>  
  <tr>
    <td>POST</td>
    <td>Create an order</td>
    <td>POST /api/v1/parcels</td>
  </tr> 
  <tr>
    <td>GET</td>
    <td>GET all orders by a user</td>
    <td>GET /api/v1/users/<userId>/parcels</td>
  </tr> 
   <tr>
    <td>PUT</td>
    <td>Cancel an order</td>
    <td>PUT /api/v1/parcels/<parcelId></td>
  </tr> 
  
</table>
