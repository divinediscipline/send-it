const submitData = async (form) => {
  console.log('form', form);
  const data = JSON.stringify({
    parceldescription: form.parcelDescription.value,
    weightmetric: form.parcelWeight.value,
    pickuplocation: `${form.pickUpState.value}, ${form.pickUpLg.value}, ${form.pickUpAddress.value}`,
    destination: `${form.destinationState.value}, ${form.destinationLg.value}, ${form.destinationAddress.value}`,
    receiversemail: form.destinationEmail.value,
    receiversphonenumber: form.destinationPhone.value,
    pickuptime: form.pickUpTime.value,
  });
  console.log('data', data);
  const token = localStorage.getItem('token');
  console.log(token);
  const response = await fetch('/api/v1/parcels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: data,
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status === 201) {
    window.location.href = '../dashboard.html';
  }
};

const newOrderFormElem = document.getElementById('new-order-form');
newOrderFormElem.addEventListener('submit', (e) => {
  e.preventDefault();
  submitData(newOrderFormElem);
});
