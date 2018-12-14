const displayError1 = (bodyObject) => {
  console.log('bodyObject', bodyObject.message);
  const errorElem = document.getElementById('error-element');
  errorElem.style.visibility='visible';
  errorElem.innerHTML = '';
  errorElem.insertAdjacentHTML('beforeend', `<p style="background-color:#E53A40;font-size:1.5rem;color:#222;margin-bottom:5px;padding-left:8px;">${bodyObject.message}</p>`);
};

const displayError2 = (bodyObject) => {
  console.log('bodyObject', bodyObject);
  const errorElem = document.getElementById('error-element');
  errorElem.style.visibility='visible';
  errorElem.innerHTML = '';
  // transform bodyObject to an array containing all error messages.
  const errorArray = Object.values(bodyObject.message).flat(Infinity);
  errorArray.forEach((error) => {
    errorElem.insertAdjacentHTML('beforeend', `<p style="background-color:#E53A40;font-size:1.5rem;color:#222;margin-bottom:5px;padding-left:8px;">${error}</p>`);
  });
};

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
  if (response.status === 400) {
    displayError2(body);
    return;
  }
  if (response.status !== 201) {
    displayError1(body);
    return;
  }
  if (response.status === 201) {
    window.location.href = '../dashboard.html';
  }
};

const newOrderFormElem = document.getElementById('new-order-form');
newOrderFormElem.addEventListener('submit', (e) => {
  e.preventDefault();
  submitData(newOrderFormElem);
});
