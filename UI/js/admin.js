let parcelId;
let parcelStatusElem;
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
  body.data.forEach((order) => {
    tableHeadingElem.insertAdjacentHTML('afterend', `<tr>
    <td class="parcel-id">${order.parcel_id}</td>
    <td>${order.userid}</td>
    <td>${order.senton}</td>
    <td>${order.parceldescription}</td>
    <td>${order.pickuplocation}</td>
    <td>${order.destination}</td>
    <td>${order.senton}</td>
    <td class="old-status">${order.status}</td>
    <td class="action-box"><button onclick="setParcelId(event)" id="change-status" class="change-status-btn" >Change status</button><button class="change-present-location-btn" >Change present location</button></td>
  </tr>
  
  <!-- change status modal -->
  <div id="myModal" class="change-status__modal">
  
    <!-- Modal content -->
    <div class=" change-status__modal-content">
      <span class=" change-status__close-btn">&times;</span>
      <form id="new-status-form" class="modal-form-group">
        <div id="error-element" style="visibility:hidden;">error placeholder</div>
        <h2>Set new status</h2>
        <select id="status-change" name="statusOptions">
          <option value="placed">Placed</option>
          <option value="transiting">Transiting</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button id="submit-status" type="submit" class=" change-status__change-status-btn">Submit</button>
      </form>
      
    </div>
  
  </div>`);
  });

  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('change-status__close-btn')[0];
  span.onclick = () => {
    modal.style.display = 'none';
  };
};

getAllOrders();

// display change status modal and set parcel id
const setParcelId = (event) => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  const newStatusForm = document.getElementById('submit-status');
  console.log(newStatusForm);
  newStatusForm.onclick = (e) => {
    e.preventDefault();
    submitNewDetails();
  };
  parcelStatusElem = event.target.parentElement.parentElement.getElementsByClassName('old-status')[0];
  const parcelIdElem = event.target.parentElement.parentElement.getElementsByClassName('parcel-id')[0];
  parcelId = parcelIdElem.innerHTML;
};


