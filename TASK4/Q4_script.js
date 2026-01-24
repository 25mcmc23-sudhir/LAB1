function validateName() {
    let name = document.getElementById("name").value;
    let error = document.getElementById("nameError");

    if (!/^[A-Za-z ]+$/.test(name)) {
        error.innerText = "Only alphabets allowed";
        return false;
    }
    error.innerText = "";
    return true;
}

function validateEmail() {
    let email = document.getElementById("email").value;
    let error = document.getElementById("emailError");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        error.innerText = "Invalid email format";
        return false;
    }
    error.innerText = "";
    return true;
}

function validatePassword() {
    let pass = document.getElementById("password").value;
    let error = document.getElementById("passwordError");
    let strength = document.getElementById("strength");

    let score = 0;

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let percent = Math.floor((score / 5) * 100);

    if (score < 5) {
        error.innerText = "Password must meet all rules";
        strength.innerText = "Strength: " + percent + "%";
        strength.style.color = "orange";
        return false;
    }

    error.innerText = "";
    strength.innerText = "Strong Password (100%)";
    strength.style.color = "green";
    return true;
}

function validateDOB() {
    let dob = document.getElementById("dob").value;
    let error = document.getElementById("dobError");

    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
        error.innerText = "Must be at least 18 years old";
        return false;
    }

    error.innerText = "";
    return true;
}

function validatePhone() {
    let phone = document.getElementById("phone").value;
    let error = document.getElementById("phoneError");

    if (!/^[0-9]{10}$/.test(phone)) {
        error.innerText = "Phone must be exactly 10 digits";
        return false;
    }

    error.innerText = "";
    return true;
}

function validateForm() {
    if (
        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validateDOB() &&
        validatePhone()
    ) {
        alert("Registration Successful!");
        return true;
    } else {
        alert("Please fix errors before submitting");
        return false;
    }
}
