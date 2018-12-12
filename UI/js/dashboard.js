/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {

  document.getElementById('myDropdown').style.display = 'block';
}

const getAllUserOrders = async () => {
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');

  const response = await fetch(`/api/v1/users/${userid}/parcels`, {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status !== 200) return;
  let output = '<p style="display:none;">Placeholder text</p>';
  body.data.forEach((order) => {
    output += `
      <div class="order-cards__card">
        <p class="order-cards__date">${order.senton}</p>
        <div class="order-cards__field-group">
          <h5 class="order-cards__destination-heading">Parcel ID</h5>
          <p class="order-cards__destination-text">${order.parcel_id}</p>
        </div>
        <div class="order-cards__field-group">
          <h5 class="order-cards__status-heading">Status</h5>
          <p class="order-cards__status1">${order.status}</p>
        </div>
        <div class="order-cards__field-group">
          <h5 class="order-cards__desc-heading">Parcel description</h5>
          <p class="order-cards__desc">${order.parceldescription}</p>
        </div>
        <p class="order-cards__btn"> <a href="./order-details.html"> <button>View details</button></a></p>
      </div>
    `;
  });
  document.getElementById('cards-container').innerHTML = output;
};

getAllUserOrders();
