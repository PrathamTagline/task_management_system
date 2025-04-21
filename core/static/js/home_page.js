const accessToken = localStorage.getItem('access_token');

if (accessToken) {
  fetch('/accounts/api/token/verify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({ token: accessToken })
  })
  .then(res => {
    if (res.ok) {
      window.location.href = "/dashboard/";
    } else {
      console.error("Token verification failed:", res.status);
      // Redirect to signin if token is invalid
      window.location.href = "accounts/signin/";
    }
  })
  .catch(err => {
    console.error("Error verifying token:", err);
    // Redirect to signin on error
    window.location.href = "accounts/signin/";
  });
} else {
  // Redirect to signin if no token is found
  window.location.href = "accounts/signin/";
} 