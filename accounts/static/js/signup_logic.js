import {
    validateFirstName,
    validateLastName,
    validateEmail,
    validateUsername,
    validatePassword,
    validateConfirmPassword,
    validateTerms,
} from './signup_page_scripts/signup_page_validation.js';

import {
    form,
    firstNameInput,
    lastNameInput,
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    agreeCheckbox,
    firstNameError,
    lastNameError,
    emailError,
    usernameError,
    passwordError,
    confirmPasswordError,
    termsError,
} from './signup_page_scripts/signup_page_elements.js';

document.addEventListener('DOMContentLoaded', function () {
    // Real-time validation
    firstNameInput.addEventListener('input', () => validateFirstName(firstNameInput, firstNameError));
    lastNameInput.addEventListener('input', () => validateLastName(lastNameInput, lastNameError));
    emailInput.addEventListener('input', () => validateEmail(emailInput, emailError));
    usernameInput.addEventListener('input', () => validateUsername(usernameInput, usernameError));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput, passwordError));
    confirmPasswordInput.addEventListener('input', () =>
        validateConfirmPassword(passwordInput, confirmPasswordInput, confirmPasswordError)
    );
    agreeCheckbox.addEventListener('change', () => validateTerms(agreeCheckbox, termsError));

    // Password input also affects confirm password validation
    passwordInput.addEventListener('input', function () {
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword(passwordInput, confirmPasswordInput, confirmPasswordError);
        }
    });

    // Form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate all fields
        const isFirstNameValid = validateFirstName(firstNameInput, firstNameError);
        const isLastNameValid = validateLastName(lastNameInput, lastNameError);
        const isEmailValid = validateEmail(emailInput, emailError);
        const isUsernameValid = validateUsername(usernameInput, usernameError);
        const isPasswordValid = validatePassword(passwordInput, passwordError);
        const isConfirmPasswordValid = validateConfirmPassword(passwordInput, confirmPasswordInput, confirmPasswordError);
        const isTermsAgreed = validateTerms(agreeCheckbox, termsError);

        if (
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isUsernameValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isTermsAgreed
        ) {
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
                    body: JSON.stringify({ username, firstname, lastname, email, password, password2 }),
                });

                const data = await res.json();

                if (res.ok) {
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