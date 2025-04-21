const accessToken = localStorage.getItem('access_token');

if (accessToken) {
  fetch('/api/verify-token/', {
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
    }
  });
}