import { ERROR_MESSAGES } from '../project_constants.js';

export function validateTitle() {
    const titleInput = document.getElementById('project-title');
    const titleError = document.getElementById('title-error');
    const titleValue = titleInput.value.trim();

    if (titleValue === '') {
        titleError.textContent = ERROR_MESSAGES.titleRequired;
        titleInput.classList.add('error');
        return false;
    } else if (titleValue.length < 3) {
        titleError.textContent = ERROR_MESSAGES.titleLength;
        titleInput.classList.add('error');
        return false;
    } else {
        titleError.textContent = '';
        titleInput.classList.remove('error');
        return true;
    }
}

export function validateDescription() {
    const descriptionInput = document.getElementById('project-description');
    const descriptionError = document.getElementById('description-error');
    const descriptionValue = descriptionInput.value.trim();

    if (descriptionValue === '') {
        descriptionError.textContent = ERROR_MESSAGES.descriptionRequired;
        descriptionInput.classList.add('error');
        return false;
    } else if (descriptionValue.length < 10) {
        descriptionError.textContent = ERROR_MESSAGES.descriptionLength;
        descriptionInput.classList.add('error');
        return false;
    } else {
        descriptionError.textContent = '';
        descriptionInput.classList.remove('error');
        return true;
    }
}

export function validateType() {
    const typeSelect = document.getElementById('project-type');
    const typeError = document.getElementById('type-error');
    const typeValue = typeSelect.value;

    if (typeValue === '') {
        typeError.textContent = ERROR_MESSAGES.typeRequired;
        typeSelect.classList.add('error');
        return false;
    } else {
        typeError.textContent = '';
        typeSelect.classList.remove('error');
        return true;
    }
}

export function validateForm() {
    const isTitleValid = validateTitle();
    const isDescriptionValid = validateDescription();
    const isTypeValid = validateType();

    return isTitleValid && isDescriptionValid && isTypeValid;
}