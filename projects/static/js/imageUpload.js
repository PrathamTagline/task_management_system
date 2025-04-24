export function initImageUpload() {
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview-container');
    const removeImage = document.getElementById('remove-image');
    const uploadLabel = document.getElementById('upload-label');
  
    imageUpload.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          previewContainer.classList.add('active');
          uploadLabel.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });
  
    removeImage.addEventListener('click', function (e) {
      e.preventDefault();
      imageUpload.value = '';
      imagePreview.src = '';
      previewContainer.classList.remove('active');
      uploadLabel.style.display = 'flex';
    });
  }
  