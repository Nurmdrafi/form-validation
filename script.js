'use strict';
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}
// Show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check length between 3 and 25
const isBetween = (input) => input.length < 3 || input.length > 25;

// Cehck email is valid
function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLocaleLowerCase());
}

// Check password is valid
function isPasswordSecure(password) {
  const re = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return re.test(password);
}
// Event listener
form.addEventListener('submit', function (e) {
  // prevent the form from submitting with Default values
  e.preventDefault();

  // Username Condition
  if (username.value === '' || isBetween(username.value)) {
    showError(username, 'Username must be between 3 and 25 characters');
  } else {
    showSuccess(username);
  }
  // Email Condition
  if (email.value === '') {
    showError(email, 'Email is required');
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
  }
  // Password Condition
  if (password.value === '') {
    showError(password, 'Password is required');
  } else if (!isPasswordSecure(password.value)) {
    showError(
      password,
      'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*).'
    );
  } else {
    showSuccess(password);
  }
  // Password2 Condition
  if (password2.value === '') {
    showError(password2, 'Password is required');
  } else if (password.value !== password2.value) {
    showError(password2, 'Please enter the password again');
  } else {
    showSuccess(password2);
  }
});
