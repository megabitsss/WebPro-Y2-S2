function validateForm() {
    let uname = document.getElementById("uname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let pwd = document.getElementById("pwd").value;
    let confirm = document.getElementById("confirm").value;

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (uname.length < 5) {
        alert("Username length must be greater or equal than 5");
        return false;
    }

    if (!gmailRegex.test(email)) {
        alert("Email must be a valid Gmail address (example@gmail.com)");
        return false;
    }

    if (!phoneRegex.test(phone)) {
        alert("Phone number must be in the format 555-555-5555");
        return false;
    }

    if (pwd.trim() === "") {
    alert("Password must not be blank");
    return false;
    }


    if (pwd !== confirm) {
        alert("Passwords do not match");
        return false;
    }

    return true;
}
