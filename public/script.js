// Sign-Up Handler
document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const data = { name, email, phone, password };

    try {
        const response = await fetch('http://localhost:3000/signup', {  // Ensure correct URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        document.getElementById('message').innerText = result.message;

        if (response.ok) {
            // Reset the form after successful sign-up
            document.getElementById('userForm').reset();
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Sign-Up Failed!';
    }
});

// Login Handler
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const data = { email, password };

    try {
        const response = await fetch('http://localhost:3000/login', {  // Ensure correct URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Successful login, redirect to the URL provided by backend
            document.getElementById('message').innerText = result.message;

            // Redirect to the provided URL (in this case, http://localhost:5173)
            window.location.href = result.redirectURL;  // Use the URL provided in the response
        } else {
            document.getElementById('message').innerText = result.message || 'Login failed!';
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Error during login';
    }
});
