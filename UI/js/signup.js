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
  const data = JSON.stringify({
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    email: form.email.value,
    phonenumber: form.phonenumber.value,
    password: form.password.value,
    password_confirmation: form.password_confirmation.value,
  });
  const response = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status === 409 || response.status === 500) {
    displayError1(body);
    return;
  }
  if (response.status !== 201) {
    displayError2(body);
    return;
  }
  console.log('userid', body.user.userid);
  localStorage.setItem('token', body.token);
  localStorage.setItem('userid', body.user.userid);
  localStorage.setItem('firstname', body.user.firstname);
  window.location.href = '../dashboard.html';
};

const signupFormElem = document.getElementById('signup-form');
signupFormElem.addEventListener('submit', (e) => {
  e.preventDefault();
  submitData(signupFormElem);
});
