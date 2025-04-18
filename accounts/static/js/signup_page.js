document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const agreeCheckbox = document.getElementById('agree');

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');
    console.log("dsad")
    // First name validation
    function validateFirstName() {
        const firstNameValue = firstNameInput.value.trim();

        if (firstNameValue === '') {
            firstNameError.textContent = 'First name is required';
            firstNameInput.classList.add('error');
            return false;
        } else if (firstNameValue.length < 2) {
            firstNameError.textContent = 'First name must be at least 2 characters';
            firstNameInput.classList.add('error');
            return false;
        } else {
            firstNameError.textContent = '';
            firstNameInput.classList.remove('error');
            return true;
        }
    }

    // Last name validation
    function validateLastName() {
        const lastNameValue = lastNameInput.value.trim();

        if (lastNameValue === '') {
            lastNameError.textContent = 'Last name is required';
            lastNameInput.classList.add('error');
            return false;
        } else if (lastNameValue.length < 2) {
            lastNameError.textContent = 'Last name must be at least 2 characters';
            lastNameInput.classList.add('error');
            return false;
        } else {
            lastNameError.textContent = '';
            lastNameInput.classList.remove('error');
            return true;
        }
    }

    // Email validation
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }

    // Username validation
    function validateUsername() {
        const usernameValue = usernameInput.value.trim();
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // Alphanumeric and underscores, at least 3 characters

        if (usernameValue === '') {
            usernameError.textContent = 'Username is required';
            usernameInput.classList.add('error');
            return false;
        } else if (!usernameRegex.test(usernameValue)) {
            usernameError.textContent = 'Username must be at least 3 characters and can only contain letters, numbers, and underscores';
            usernameInput.classList.add('error');
            return false;
        } else {
            usernameError.textContent = '';
            usernameInput.classList.remove('error');
            return true;
        }
    }

    // Password validation
    function validatePassword() {
        const passwordValue = passwordInput.value;
        const hasNumber = /\d/.test(passwordValue);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

        if (passwordValue === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            return false;
        } else if (passwordValue.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('error');
            return false;
        } else if (!hasNumber) {
            passwordError.textContent = 'Password must include at least one number';
            passwordInput.classList.add('error');
            return false;
        } else if (!hasSpecial) {
            passwordError.textContent = 'Password must include at least one special character';
            passwordInput.classList.add('error');
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('error');
            return true;
        }
    }

    // Confirm password validation
    function validateConfirmPassword() {
        const confirmValue = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;

        if (confirmValue === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordInput.classList.add('error');
            return false;
        } else if (confirmValue !== passwordValue) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('error');
            return false;
        } else {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.classList.remove('error');
            return true;
        }
    }

    // Terms agreement validation
    function validateTerms() {
        if (!agreeCheckbox.checked) {
            termsError.textContent = 'You must agree to the Terms of Service and Privacy Policy';
            return false;
        } else {
            termsError.textContent = '';
            return true;
        }
    }

    // Real-time validation
    firstNameInput.addEventListener('input', validateFirstName);
    lastNameInput.addEventListener('input', validateLastName);
    emailInput.addEventListener('input', validateEmail);
    usernameInput.addEventListener('input', validateUsername);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    agreeCheckbox.addEventListener('change', validateTerms);

    // Password input also affects confirm password validation
    passwordInput.addEventListener('input', function () {
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });

    // Form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate all fields
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsAgreed = validateTerms();

        if (isFirstNameValid && isLastNameValid && isEmailValid &&
            isPasswordValid && isConfirmPasswordValid && isTermsAgreed && isUsernameValid) {

            const firstname = firstNameInput.value;
            const lastname = lastNameInput.value;
            const username = usernameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const password2 = confirmPasswordInput.value;

            try {
                const res = await fetch('/accounts/api/register/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, firstname, lastname, email, password, password2 })
                });
            
                const data = await res.json();
                console.log("Response:", res, "Data:", data);
                console.log("Response status:", res.ok);
           
                if (res.ok) {
                    console.log("Redirecting to dashboard...");
                    window.location.href = '/dashboard/';
                } else {
                    const errMsg = Object.values(data).join(', ') || 'Registration failed';
                    document.getElementById('message').innerText = errMsg;
                }
            } catch (error) {
                
                console.error('Error:', error);
               
            }
        }
    });
}); 