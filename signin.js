/*// Function to toggle between Sign In and Sign Up forms
function toggleForm(formType) {
    if (formType === 'sign-in') {
        document.getElementById('sign-in-form').style.display = 'block';
        document.getElementById('sign-up-form').style.display = 'none';
    } else {
        document.getElementById('sign-in-form').style.display = 'none';
        document.getElementById('sign-up-form').style.display = 'block';
    }
}

// Basic validation for Sign-In form
/*function validateSignIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Please fill out all fields.');
        return false;
    }

    return true;
}

async function validateSignIn() {
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (phone === '' || password === '') {
            alert('Please fill out all fields.');
            return false;
        }

        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Sign-In successful!');
                window.location.href = '/dashboard'; // Redirect to dashboard
            } else {
                alert(result.message || 'Invalid credentials');
            }
        } catch (error) {
            alert('An error occurred while signing in. Please try again.');
        }

        return false; // Prevent default form submission
};


// Basic validation for Sign-Up form
function validateSignUp() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    if (name === '' || email === '' || password === '') {
        alert('Please fill out all fields.');
        return false;
    }

    return true;
}*/


document.getElementById('sign-in').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    if (!phone || !password) {
        document.getElementById('message').innerText = 'Both phone number and password are required.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, password }),
        });

        const result = await response.json();

        if (result.success) {
            alert('Sign-In successful!');
            window.location.href = 'index.html'; // Redirect to the index page
        } else {
            document.getElementById('message').innerText = result.message || 'Invalid credentials.';
        }
    } catch (error) {
        document.getElementById('message').innerText = error.message || 'An error occurred. Please try again.';
    }
});

