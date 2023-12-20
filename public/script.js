// Add event listener for form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Retrieve email and password values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Implement form validation here
    if (!validateEmail(email)) {
        displayMessage('Please enter a valid email address', 'error');
        return;
    }

    if (!validatePassword(password)) {
        displayMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    // Send login credentials via POST request
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        // Handle non-OK responses
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        // Display appropriate message based on login success or failure
        if (data.success) {
            displayMessage(data.message, 'success');
        } else {
            displayMessage(data.message, 'error');
        }
    })
    .catch(error => {
        // Handle network or server errors
        console.error('Error:', error);
        displayMessage(error.message || 'An error occurred while logging in.', 'error');
    });
});

// Add event listener for password input changes
document.getElementById('password').addEventListener('input', function() {
    // Clear the error message when the password input changes
    displayMessage('', 'error');
});

// Function to display messages to the user
function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    // Set message color based on message type
    messageElement.style.color = type === 'success' ? '#1AABA8' : '#E64A4E';
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate password length
function validatePassword(password) {
    return password.length >= 6;
}
