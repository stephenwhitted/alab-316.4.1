// This function displays an error message and focuses on the problematic field
function displayError(message, field) {
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.innerText = message; // Populate the error message
    errorDisplay.style.display = 'block'; // Show the error display element
    field.focus(); // Move focus to the field with the error
    return false; // Stop the form from submitting
}

// Function to handle the validation of the registration form
function validateRegistration() {
    const username = document.getElementById('reg_username').value.trim().toLowerCase();
    const email = document.getElementById('reg_email').value;
    const password = document.getElementById('reg_password').value;
    const passwordCheck = document.getElementById('reg_passwordCheck').value;
    const termsChecked = document.getElementById('terms').checked;

    // Ensure the terms and conditions checkbox is checked
    if (!termsChecked) {
        return displayError('You must agree to the terms.', document.getElementById('terms'));
    }

    // Verify that the entered passwords match
    if (password !== passwordCheck) {
        return displayError('Passwords do not match.', document.getElementById('reg_passwordCheck'));
    }

    // Check if the username is already taken
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        return displayError('Username already taken.', document.getElementById('reg_username'));
    }

    // Store the new user's data in localStorage
    users[username] = { email, password };  // Remember: always hash passwords in a real application
    localStorage.setItem('users', JSON.stringify(users));

    // Notify the user of successful registration and clear the form
    alert('Registration successful!');
    document.getElementById('registration').reset();
    document.getElementById('errorDisplay').style.display = 'none';
    return false; // Prevent the form from being submitted
}

// Function to validate the login form
function validateLogin() {
    const username = document.getElementById('login_username').value.trim().toLowerCase();
    const password = document.getElementById('login_password').value;
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    // Check if the entered username and password are correct
    if (!(username in users && users[username].password === password)) {
        return displayError('Invalid username or password.', document.getElementById('login_username'));
    }

    // Notify the user of successful login and reset the form
    alert('Login successful!');
    document.getElementById('login').reset();
    document.getElementById('errorDisplay').style.display = 'none';
    return false; // Prevent the form from being submitted
}
