const postLogin = 'http://localhost:5678/api/users/login'

let email = document.getElementById("email")
let password = document.getElementById("password")
let submit = document.getElementById("connectButton")
let emailValue = ""
let passwordValue = ""
let postValue = {}
let APIanswer = {}

email.addEventListener('change', function() {
    emailValue = this.value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
    if (!emailValue.match(validRegex)) {
        this.setAttribute('data-error-visible', 'true');
    } 
});

password.addEventListener('change', function() {
    passwordValue = this.value;
      
    if (!passwordValue.match) {
        this.setAttribute('data-error-visible', 'true');
    } 
});

submit.addEventListener("click", function() {
    postValue = {
        "email": emailValue,
        "password": passwordValue
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postValue)
    };

    // Effectuer la requête POST vers l'API
    fetch(postLogin, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            APIanswer=data

            if (APIanswer.message == 'user not found') {
                password.setAttribute('data-error-visible', 'true');
                email.setAttribute('data-error-visible', 'true')
            }
        })
});