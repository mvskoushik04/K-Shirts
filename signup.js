// Script to handle form validation

//import cors from 'cors';
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    //const mysql = require('mysql');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    //const button = document.getElementById('button1');

    // Basic form validation
    if (name === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Check if phone number is valid (length should be 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    //console.log('password:', password);
    //console.log('confirm password:', confirmPassword);

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    
    //document.getElementById('button1').addEventListener('click', () => {
        //console.log('inside_button_click_function');
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, password }),
        })
        .then((response) => response.text())
        .then((message) => {
            //console.log(message);
            alert(message);
        })
        alert("Account created successfully!");
            

    });
    // Successful form submission (for demonstration purposes)
    //alert("Account created successfully!");
//});
