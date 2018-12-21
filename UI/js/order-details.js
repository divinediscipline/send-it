const token = localStorage.getItem('token');
const urlParams = new URLSearchParams(window.location.search);
const parcelId = urlParams.get('parcelid');
let cancelButton;
let changeDestination;

const displayError1 = (bodyObject) => {
  const errorElem = document.getElementById('error-element');
  errorElem.style.visibility = 'visible';
  errorElem.innerHTML = '';
  errorElem.insertAdjacentHTML('beforeend', `<p style="background-color:#E53A40;font-size:1.5rem;color:#222;margin-bottom:5px;padding-left:8px;">${bodyObject.message}</p>`);
};

const submitNewDetails = async (form) => {
  const data = JSON.stringify({
    destination: form.destination.value,
  });
  const response = await fetch(`/api/v1/parcels/${parcelId}/destination`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: data,
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status !== 200) {
    displayError1(body);
    return;
  }
  if (response.status === 200) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    const oldDestinationElem = document.getElementById('old-destination');
    oldDestinationElem.innerHTML = body.data.destination;
  }
};

const displayOrderDetails = (dataObject) => {
  if (dataObject.status === 'Cancelled') {
    cancelButton = '<a style="display:none;" id="cancel-btn" class="form-page__cancel-btn">Cancel order</a>';
    changeDestination = '<button style="display:none;" id="change-destination" class="delivery-address__change-destination-btn" >Change destination</button>';
  } else {
    cancelButton = '<a id="cancel-btn" class="form-page__cancel-btn">Cancel order</a>';
    changeDestination = '<button id="change-destination" class="delivery-address__change-destination-btn" >Change destination</button>';
  }
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
      <p class="parcel__field-group">
        <span class="parcel__label">Status</span>
        <span id="status" class="parcel__field">${dataObject.status}</span>
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
        <span id="old-destination" class="delivery-address__field">${dataObject.destination}</span>
      </p>
      <p class="delivery-address__field-group">
        <span class="delivery-address__label">Receivers phone</span>
        <span class="delivery-address__field">${dataObject.receiversphonenumber}</span>
      </p>
      <p class="delivery-address__field-group">
        <span class="delivery-address__label">Receivers email</span>
        <span class="delivery-address__field">${dataObject.receiversemail}</span>
      </p>
      ${changeDestination}
    </div>
    <div class="form-page__btns">
        <a href="./dashboard.html" class="form-page__view-btn ">View all orders</a>
        ${cancelButton}
    </div>
    
    <!-- change destination modal -->
    <div id="myModal" class="delivery-address__modal">
    
      <!-- Modal content -->
      <div class="delivery-address__modal-content">
        <span class="delivery-address__close-btn">&times;</span>
        <form id="new-destination-form" class="modal-form-group">
          <div id="error-element" style="visibility:hidden;">error placeholder</div>
          <label for="p">Enter your new destination details</label>
          <input class="delivery-address__new-destination" type="text" name="destination" placeholder="New destination" required>
          <button id="submit-destination" type="submit" class="delivery-address__change-destination-btn">Submit</button>
        </form>
        
      </div>
    
    </div>
</div>`);

  const cancelBtnElem = document.getElementById('cancel-btn');
  cancelBtnElem.addEventListener('click', async () => {
    const response = await fetch(`/api/v1/parcels/${parcelId}/cancel`, {
      method: 'PUT',
      headers: {
        'x-auth': token,
      },
    });
    const body = await response.json();
    console.log('body', body);
    if (response.status === 200) {
      const statusElem = document.getElementById('status');
      statusElem.innerHTML = body.data.status;
      cancelBtnElem.style.display = 'none';
    }
  });

  // display the modal
  const modal = document.getElementById('myModal');
  const btn = document.getElementById('change-destination');
  const span = document.getElementsByClassName('delivery-address__close-btn')[0];
  btn.onclick = () => {
    modal.style.display = 'block';
  };
  span.onclick = () => {
    modal.style.display = 'none';
  };

  // update destination
  const newDestinationForm = document.getElementById('new-destination-form');
  newDestinationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitNewDetails(newDestinationForm);
  });
};

const getOrderDetails = async () => {
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
