const displayOrderDetails = (dataObject) => {
  const mainElem = document.getElementById('main-section');
  mainElem.insertAdjacentHTML('beforeend', `<div class="form-page">
  <h3 class="form-page__heading">Parcel details</h3>
    <div class="parcel form-page__box">
      <h4 class="parcel__heading">Parcel</h4>
      <p class="parcel__field-group">
        <span class="parcel__label">ID</span>
        <span class="parcel__field">${dataObject.parcel_id}</span>
      </p>
      <p class="parcel__field-group">
        <span class="parcel__label">Weight</span>
        <span class="parcel__field">${dataObject.weightmetric}</span>
      </p>
      <p class="parcel__field-group">
        <span class="parcel__label">Pick-up time</span>
        <span class="parcel__field">${dataObject.pickuptime}</span>
      </p>
    </div>

    <div class="pickup-location form-page__box">
      <h4 class="pickup-location__heading">Pickup location</h4>
      <p class="pickup-location__field-group">
        <span class="pickup-location__label">Pick up at:</span>
        <span class="pickup-location__field">${dataObject.pickuplocation}</span>
      </p>
    </div>

    <div class="delivery-address form-page__box">
      <h4 class="delivery-address__heading">Delivery address</h4>
      <p class="delivery-address__field-group">
        <span class="delivery-address__label">Send to:</span>
        <span class="delivery-address__field">${dataObject.destination}</span>
      </p>
      <p class="delivery-address__field-group">
        <span class="delivery-address__label">Receivers phone</span>
        <span class="delivery-address__field">${dataObject.receiversphonenumber}</span>
      </p>
      <p class="delivery-address__field-group">
        <span class="delivery-address__label">Receivers email</span>
        <span class="delivery-address__field">${dataObject.receiversemail}</span>
      </p>
    </div>
    <div class="form-page__btns">
        <a href="./dashboard.html" class="form-page__view-btn ">View all orders</a>
        <a href="#" class="form-page__cancel-btn">Cancel order</a>
    </div>
    
</div>`);
};

const getOrderDetails = async () => {
  const token = localStorage.getItem('token');
  const urlParams = new URLSearchParams(window.location.search);
  const parcelId = urlParams.get('parcelid');
  const response = await fetch(`/api/v1/parcels/${parcelId}`, {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  });
  const body = await response.json();
  console.log('body', body);

  if (response.status === 200) {
    displayOrderDetails(body.data);
  }
};
getOrderDetails();