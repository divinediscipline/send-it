/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

const myFunction = () => {
  document.getElementById('myDropdown').classList.toggle('show');
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = (event) => {
  if (!event.target.matches('.profile-caret')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

const setParcelId = (event) => {
  let parcelIdElem = event.target.parentElement.parentElement.getElementsByClassName('order-cards__parcelID-text')[0];
  window.location.href = `./order-details.html?parcelid=${parcelIdElem.innerHTML}`;
};
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
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let output = '<p style="display:none;">Placeholder text</p>';
  body.data.forEach((order) => {
    const dateObject = new Date(order.senton);
    const month = months[dateObject.getMonth()];
    const date = dateObject.getDate();
    const year = dateObject.getFullYear();
    const displayedDate = `${month} ${date}, ${year}.`;
    output += `
      <div class="order-cards__card">
        <p class="order-cards__date">${displayedDate}</p>
        <div class="order-cards__field-group">
          <h5 class="order-cards__destination-heading">Parcel ID</h5>
          <p class="order-cards__parcelID-text">${order.parcel_id}</p>
        </div>
        <div class="order-cards__field-group">
          <h5 class="order-cards__status-heading">Status</h5>
          <p class=${order.status}>${order.status}</p>
        </div>
        <div class="order-cards__field-group">
          <h5 class="order-cards__desc-heading">Parcel description</h5>
          <p class="order-cards__desc">${order.parceldescription}</p>
        </div>
        <p class="order-cards__btn" onclick="setParcelId(event)"><button>View details</button></p>
      </div>
    `;
  });
  document.getElementById('cards-container').innerHTML = output;
};
const firstName = localStorage.getItem('firstname');
document.getElementById('firstname').innerHTML = firstName;
getAllUserOrders();
