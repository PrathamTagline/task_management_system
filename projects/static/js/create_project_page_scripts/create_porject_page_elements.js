export const titleInput = document.querySelector('.form-input');
export const descriptionInput = document.querySelector('.form-textarea');
export const typeSelect = document.getElementById('project-type');

export const titleError = document.createElement('div');
export const descriptionError = document.createElement('div');
export const typeError = document.createElement('div');

// Append error elements to the DOM
titleInput.parentElement.appendChild(titleError);
descriptionInput.parentElement.appendChild(descriptionError);
typeSelect.parentElement.appendChild(typeError);

// Add error class for styling
titleError.classList.add('error-message');
descriptionError.classList.add('error-message');
typeError.classList.add('error-message');
