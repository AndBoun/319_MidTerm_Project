function fetchUser(){
    document.getElementById('login').innerHTML = 'Fetching user...';
    return new Promise((resolve, reject) => {
        fetch("./index.json")  // Ensure the path is correct
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => {
            console.log(error);
            document.getElementById('login').innerHTML = 'Error fetching user!';
            reject(error);
        });
    });
}

function login(user, passwordInput){
    if (user.password === passwordInput){
        document.getElementById('login').innerHTML = 'Login successful!';
        window.location.href = 'homepage.html';  // Redirect to new HTML page
    } else {
        document.getElementById('login').innerHTML = 'Login failed!';
    }
    console.log(passwordInput);
}

document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    const passwordInput = document.getElementById('passwordInput').value;
    fetchUser().then(user => {
        login(user, passwordInput);
    });
});