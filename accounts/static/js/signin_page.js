document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const form = document.getElementById('signinForm');

    // Email validation function
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        
        if (emailValue === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }

    // Password validation function
    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        
        if (passwordValue === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            return false;
        } else if (passwordValue.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordInput.classList.add('error');
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('error');
            return true;
        }
    }

    // Real-time validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isEmailValid && isPasswordValid) {
            const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const response = await fetch('/accounts/api/token/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        window.location.href = '/dashboard/';
      } else {
        document.getElementById('message').innerText = data.detail || 'Login failed';
      }
        }
    });
});




