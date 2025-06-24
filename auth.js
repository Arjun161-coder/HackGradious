
function signup() {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  if (!username || !email || !password) {
    alert('Please fill in all fields!');
    return;
  }

  localStorage.setItem('user', JSON.stringify({ username, email, password }));
  alert('Signup successful! Please log in.');
  window.location.href = 'login.html';
}


function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.email !== email || user.password !== password) {
    alert('Invalid credentials or account not found.');
    return;
  }

  localStorage.setItem('loggedIn', 'true');
  alert('Login successful!');
  window.location.href = 'index.html';
}


function checkLogin() {
  const loggedIn = localStorage.getItem('loggedIn');
  if (loggedIn === 'true') {
    alert('You are already logged in!');
    window.location.href = 'index.html';
  } else {
    window.location.href = 'login.html';
  }
}
