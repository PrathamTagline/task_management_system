export function initTeamModal(userItems, addMemberModal, userSearchInput, selectedUserItemRef) {
    document.getElementById('add-member-btn').addEventListener('click', () => {
      addMemberModal.classList.add('active');
      if (selectedUserItemRef.item) selectedUserItemRef.item.classList.remove('selected');
      selectedUserItemRef.item = null;
      userSearchInput.value = '';
      userItems.forEach(item => item.style.display = 'flex');
    });
  
    document.getElementById('modal-close').addEventListener('click', () => {
      addMemberModal.classList.remove('active');
    });
  
    document.getElementById('cancel-add-member').addEventListener('click', () => {
      addMemberModal.classList.remove('active');
    });
  
    addMemberModal.addEventListener('click', e => {
      if (e.target === addMemberModal) {
        addMemberModal.classList.remove('active');
      }
    });
  
    userSearchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
      userItems.forEach(item => {
        const name = item.querySelector('.member-name').textContent.toLowerCase();
        const email = item.querySelector('.member-email').textContent.toLowerCase();
        item.style.display = (name.includes(searchTerm) || email.includes(searchTerm)) ? 'flex' : 'none';
      });
    });
  }
  