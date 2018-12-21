const displayError1 = (bodyObject) => {
  console.log('bodyObject', bodyObject.message);
  const errorElem = document.getElementById('error-element');
  errorElem.style.visibility = 'visible';
  errorElem.innerHTML = '';
  errorElem.insertAdjacentHTML('beforeend', `<p style="background-color:#E53A40;font-size:1.5rem;color:#222;margin-bottom:5px;padding-left:8px;">${bodyObject.message}</p>`);
};

const displayError2 = (bodyObject) => {
  console.log('bodyObject', bodyObject);
  const errorElem = document.getElementById('error-element');
  errorElem.style.visibility = 'visible';
  errorElem.innerHTML = '';
  // transform bodyObject to an array containing all error messages.
  const errorArray = Object.values(bodyObject.message).flat(Infinity);
  errorArray.forEach((error) => {
    errorElem.insertAdjacentHTML('beforeend', `<p style="background-color:#E53A40;font-size:1.5rem;color:#222;margin-bottom:5px;padding-left:8px;">${error}</p>`);
  });
};

const submitData = async (form) => {
  const data = JSON.stringify({
    email: form.email.value,
    password: form.password.value,
  });
  console.log(data);
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  const body = await response.json();
  console.log('body', body);
  if (response.status === 401 || response.status === 500) {
    displayError1(body);
    return;
  }

  if (response.status !== 200) {
    displayError2(body);
    return;
  }
  if (response.status === 200) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('userid', body.user.userid);
    if (body.user.isadmin) {
      window.location.href = '../admin.html';
      return;
    }
    window.location.href = '../dashboard.html';
  }
};

const loginFormElem = document.getElementById('login-form');
loginFormElem.addEventListener('submit', (e) => {
  e.preventDefault();
  submitData(loginFormElem);
});
