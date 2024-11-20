// check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const logoLink = document.getElementById('logoLink');
    logoLink.addEventListener('click', function(event) {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            window.location.href = "index.html";
        } else {
            event.preventDefault();
            alert("You need to log in before accessing the home page.");
        }
    });
});
// sign up
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let form = event.target;
    let valid = form.checkValidity(); 
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    if (password !== password2) {
        valid = false; 
        document.getElementById('password2').setCustomValidity('Passwords do not match');
    } else {
        document.getElementById('password2').setCustomValidity('');
    }

    form.classList.add('was-validated'); 

    if (valid) {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            rePassword: document.getElementById('password2').value,
            phone: document.getElementById('phone').value
        };
        console.log('Form Data:', formData);

        fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            window.location.href = "login.html"; 
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error);
        });
    }
});


