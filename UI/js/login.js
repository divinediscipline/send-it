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
  if (response.status !== 200) return;
  // localStorage.setItem('token', body.token);
  window.location.href = '../dashboard.html';
};

const loginFormElem = document.getElementById('login-form');
loginFormElem.addEventListener('submit', (e) => {
  e.preventDefault();
  submitData(loginFormElem);
});
