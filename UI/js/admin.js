let parcelId;
let parcelStatusElem;
let presentLocationElem;
const token = localStorage.getItem('token');

const submitNewDetails = async () => {
  const selectElem = document.getElementById('status-change');
  const selectedOption = selectElem.options[selectElem.selectedIndex].text;
  const data = JSON.stringify({
    status: selectedOption,
  });
  const response = await fetch(`/api/v1/parcels/${parcelId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: data,
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status !== 200) return;
  if (response.status === 200) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    parcelStatusElem.innerHTML = body.data.status;
  }
};

const submitNewLocationDetails = async () => {
  const newlocation = document.getElementById('change-present-location__input').value;
  const data = JSON.stringify({
    presentlocation: newlocation,
  });
  const response = await fetch(`/api/v1/parcels/${parcelId}/presentLocation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: data,
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status !== 200) return;
  if (response.status === 200) {
    const locationModal = document.getElementById('presentLocationModal');
    locationModal.style.display = 'none';
    presentLocationElem.innerHTML = body.data.presentLocation;
  }
};

const getAllOrders = async () => {
  const response = await fetch('/api/v1/parcels', {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status !== 200) return;
  const tableHeadingElem = document.getElementById('table-heading');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  body.data.forEach((order) => {
    const dateObject = new Date(order.senton);
    const orderCreatedDate = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}.`;
    tableHeadingElem.insertAdjacentHTML('afterend', `<tr>
    <td class="parcel-id">${order.parcel_id}</td>
    <td>${order.userid}</td>
    <td>${orderCreatedDate}</td>
    <td>${order.parceldescription}</td>
    <td>${order.pickuplocation}</td>
    <td>${order.destination}</td>
    <td>${order.pickuptime}</td>
    <td class="old-location">${order.presentlocation}</td>
    <td class="old-status ${order.status}">${order.status}</td>
    <td class="action-box"><button onclick="setParcelId(event)" id="change-status" class="change-status-btn" >Change status</button><button onclick="setPresentLocationId(event)" class="change-present-location-btn" >Change present location</button></td>
  </tr>
  
  <!-- change status modal -->
  <div id="myModal" class="change-status__modal">
    <!-- Modal content -->
    <div class=" change-status__modal-content">
      <span class=" change-status__close-btn">&times;</span>
      <form id="new-status-form" class="modal-form-group">
        <div id="error-element" style="visibility:hidden;">error placeholder</div>
        <h2 class="change-status__modal-heading">Set new status</h2>
        <select class="change-status__status-options" id="status-change" name="statusOptions">
          <option value="placed">Placed</option>
          <option value="transiting">Transiting</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button id="submit-status" type="submit" class=" change-status__change-status-btn">Submit</button>
      </form>   
    </div>
  </div>
  
  <!-- change present location modal -->
  <div id="presentLocationModal" class="change-present-location__modal">
    <!-- Modal content -->
    <div class=" change-present-location__modal-content">
      <span class=" change-present-location__close-btn">&times;</span>
      <form id="new-location-form" class="modal-form-group">
        <div id="error-element" style="visibility:hidden;">error placeholder</div>
        <label class="change-present-location__modal-heading" for="modal">Set new destination</label>
        <input id="change-present-location__input" class="change-present-location__input" type="text" name="location" placeholder="New location" required>
        <button id="submit-new-location" type="submit" class=" change-present-location__btn">Submit</button>
      </form> 
    </div>
  </div>`);
  });

  // close change status modal
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('change-status__close-btn')[0];
  span.onclick = () => {
    modal.style.display = 'none';
  };

  // close present location modal
  const locationModal = document.getElementById('presentLocationModal');
  const locationSpan = document.getElementsByClassName('change-present-location__close-btn')[0];
  locationSpan.onclick = () => {
    locationModal.style.display = 'none';
  };
};

getAllOrders();

// display change status modal and set parcel id
const setParcelId = (event) => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  const newStatusForm = document.getElementById('submit-status');
  newStatusForm.onclick = (e) => {
    e.preventDefault();
    submitNewDetails();
  };
  parcelStatusElem = event.target.parentElement.parentElement.getElementsByClassName('old-status')[0];
  const parcelIdElem = event.target.parentElement.parentElement.getElementsByClassName('parcel-id')[0];
  parcelId = parcelIdElem.innerHTML;
};

// display change present location modal, submit new location details and get parcel id
const setPresentLocationId = (event) => {
  const locationModal = document.getElementById('presentLocationModal');
  locationModal.style.display = 'block';
  const newLocationForm = document.getElementById('submit-new-location');
  newLocationForm.onclick = (e) => {
    e.preventDefault();
    submitNewLocationDetails();
  };
  presentLocationElem = event.target.parentElement.parentElement.getElementsByClassName('old-location')[0];
  const parcelIdElem = event.target.parentElement.parentElement.getElementsByClassName('parcel-id')[0];
  parcelId = parcelIdElem.innerHTML;
};
