document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const agreeCheckbox = document.getElementById('agree');
    
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');

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
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    agreeCheckbox.addEventListener('change', validateTerms);
    
    // Password input also affects confirm password validation
    passwordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsAgreed = validateTerms();
        
        if (isFirstNameValid && isLastNameValid && isEmailValid && 
            isPasswordValid && isConfirmPasswordValid && isTermsAgreed) {

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const role = document.getElementById('role').value;

                try {
                    const res = await fetch('/accounts/api/register/', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, password, role })
                    });
            
                    const data = await res.json();
            
                    if (res.ok) {
                      document.getElementById('message').style.color = 'green';
                      document.getElementById('message').innerText = "Registration successful!";
                      window.location.href = '/account/dashboard/';
                    } else {
                      const errMsg = Object.values(data).join(', ') || 'Registration failed';
                      document.getElementById('message').innerText = errMsg;
                    }
                  } catch (error) {
                    document.getElementById('message').innerText = "An error occurred. Please try again.";
                  }
        }
    });
});



