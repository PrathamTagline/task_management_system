 // Preview uploaded image
 document.getElementById('image-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const preview = document.getElementById('image-preview');
        preview.src = event.target.result;
        preview.classList.add('active');
      }
      reader.readAsDataURL(file);
    }
  });

//   // Select project type
//   function selectProjectType(element) {
//     // Remove selected class from all cards
//     document.querySelectorAll('.project-type-card').forEach(card => {
//       card.classList.remove('selected');
//     });
    
//     // Add selected class to clicked card
//     element.classList.add('selected');
//   }
//   import { validateForm } from './create_project_page_form_validation.js';

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.querySelector('.create-project-form');

//     form.addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevent form submission

//         if (validateForm()) {
//             console.log('Form is valid. Submitting...');
//             form.submit(); // Submit the form if valid
//         } else {
//             console.log('Form is invalid. Please correct the errors.');
//         }
//     });
// });