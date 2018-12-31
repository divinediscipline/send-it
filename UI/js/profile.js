const token = localStorage.getItem('token');
const userId = localStorage.getItem('userid');

const displayProfileDetails = (dataObject) => {
  const editProfileElem = document.getElementById('edit-profile-btn');
  editProfileElem.insertAdjacentHTML('afterend', ` <div class="personal-details">
  <h3 class="personal-details__heading"><i class="fas fa-user-circle personal-details__icon"></i> &nbsp;
    Personal
    details</h3>
  <div class="personal-details__content">
    <p class="personl-details__field-group">
      <span class="personal-details__label">First name</span>
      <span class="personal-details__field">${dataObject.firstName}</span>
    </p>
    <p class="personl-details__field-group">
      <span class="personal-details__label">Last name</span>
      <span class="personal-details__field">${dataObject.lastName}</span>
    </p>
    <p class="personl-details__field-group">
      <span class="personal-details__label">Email</span>
      <span class="personal-details__field">${dataObject.email}</span>
    </p>
    <p class="personl-details__field-group">
      <span class="personal-details__label">Phone number</span>
      <span class="personal-details__field">${dataObject.phoneNumber}</span>
    </p>
  </div>

</div>
<div class="statistics">
  <h3 class="statistics__heading"><i class="fas fa-chart-line personal-details__icon"></i> &nbsp; Statistics</h3>
  <div class="statistics__content">
    <p class="statistics__field-group">
      <span class="statistics__label">Number of delivery orders placed</span>
      <span class="statistics__field">${dataObject.noOfdeliveryOrdersPlaced}</span>
    </p>
    <p class="statistics__field-group">
      <span class="statistics__label">Number of delivery orders transiting</span>
      <span class="statistics__field">${dataObject.noOfdeliveryOrdersTransiting}</span>
    </p>
    <p class="statistics__field-group">
      <span class="statistics__label">Number of delivery orders delivered</span>
      <span class="statistics__field">${dataObject.noOfdeliveryOrdersDelivered}</span>
    </p>
    <p class="statistics__field-group">
      <span class="statistics__label">Number of delivery orders cancelled</span>
      <span class="statistics__field">${dataObject.noOfdeliveryOrdersCancelled}</span>
    </p>
    <p class="statistics__field-group">
      <span class="statistics__label">All parcel delivery orders</span>
      <span class="statistics__field">${dataObject.allDeliveryOrders}</span>
    </p>
  </div>
</div>`);
};
const getProfileDetails = async () => {
  const response = await fetch(`/api/v1/users/${userId}/profile`, {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  });
  const body = await response.json();
  console.log('body', body);

  if (response.status === 200) {
    displayProfileDetails(body.data);
  }
};
getProfileDetails();
