const form = document.getElementById('create-project-form');

form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Gather form data
  const formData = new FormData();
  formData.append('name', document.getElementById('project-title').value.trim());
  formData.append('description', document.getElementById('project-description').value.trim());
  formData.append('type', document.getElementById('project-type').value);

  try {
      // Send the POST request to the API endpoint
      const response = await fetch('projects/api/projects/', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: formData, // Send the form data
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error('Failed to create project. Please try again.');
      }

      const data = await response.json();
      console.log('Project created successfully:', data);

      // Redirect to the project list or dashboard after successful creation
      window.location.href = '/dashboard/';
  } catch (error) {
      console.error('Error creating project:', error);
      alert('An error occurred while creating the project. Please try again.');
  }
});