const submitData = async (form) => {
  const data = JSON.stringify({
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    email: form.email.value,
    phonenumber: form.phonenumber.value,
    password: form.password.value,
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
  if (response.status !== 201) return;
  // localStorage.setItem('token', body.token);
  window.location.href = '../dashboard.html';
};

const signupFormElem = document.getElementById('signup-form');
signupFormElem.addEventListener('submit', (e) => {
  e.preventDefault();
  submitData(signupFormElem);
});
