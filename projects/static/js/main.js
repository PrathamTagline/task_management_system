import { selectProjectType } from './projectType.js';
import { initImageUpload } from './imageUpload.js';
import { initTeamModal } from './teamModal.js';
import { handleUserSelection, setupConfirmAddMember, addUserDirectly } from './teamMembers.js';
import { setupFormSubmission } from './formHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const userItems = document.querySelectorAll('.user-item');
  const addMemberModal = document.getElementById('add-member-modal');
  const userSearchInput = document.getElementById('user-search');
  const confirmAddMember = document.getElementById('confirm-add-member');
  const teamMembersList = document.getElementById('team-members-list');
  const roleSelect = document.getElementById('role-select');
  const imageUpload = document.getElementById('image-upload');
  const addDirectUserBtn = document.getElementById('add-direct-user-btn');

  const selectedUserRef = { user: null };
  const selectedUserItemRef = { item: null };

  initImageUpload();
  initTeamModal(userItems, addMemberModal, userSearchInput, selectedUserItemRef);
  handleUserSelection(userItems, selectedUserRef, selectedUserItemRef, confirmAddMember);
  setupConfirmAddMember(confirmAddMember, addMemberModal, roleSelect, teamMembersList, selectedUserRef);
  setupFormSubmission(imageUpload);

  // Add event listener to project type cards
  document.querySelectorAll('.project-type-card').forEach(card => {
    card.addEventListener('click', () => selectProjectType(card));
  });

  // Add event listener for adding a user directly
  addDirectUserBtn.addEventListener('click', () => {
    const user = {
      id: Date.now().toString(), // Generate a unique ID for the user
      name: 'New User',
      email: 'newuser@example.com',
      avatar: 'NU',
    };
    const role = 'viewer'; // Default role for the new user
    addUserDirectly(user, role, teamMembersList);
  });
});