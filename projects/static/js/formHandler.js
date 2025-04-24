import { teamMembers } from './teamMembers.js';

export function setupFormSubmission(imageUpload) {
  const form = document.getElementById('project-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('project-title').value.trim();
    const description = document.getElementById('project-description').value.trim();
    const type = document.getElementById('project-type').value;

    if (!name || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    const projectData = { name, description, type, teamMembers };

    if (imageUpload.files.length > 0) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        projectData.icon = e.target.result;
        await sendProjectData(projectData);
      };
      reader.readAsDataURL(imageUpload.files[0]);
    } else {
      await sendProjectData(projectData);
    }
  });

  async function sendProjectData(data) {
    try {
      const response = await fetch('/projects/api/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Project created successfully!');
        window.location.href = '/dashboard/';
      } else {
        const error = await response.json();
        alert('Error: ' + (error.message || 'Failed to create project.'));
      }
    } catch (err) {
      console.error('Request failed', err);
      alert('An error occurred while creating the project.');
    }
  }
}
