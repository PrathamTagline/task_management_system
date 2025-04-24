let teamMembers = [];

export function handleUserSelection(userItems, selectedUserRef, selectedUserItemRef, confirmAddMemberBtn) {
  userItems.forEach(item => {
    item.addEventListener('click', function () {
      if (selectedUserItemRef.item) {
        selectedUserItemRef.item.classList.remove('selected');
      }
      this.classList.add('selected');
      selectedUserRef.user = {
        id: this.dataset.id,
        name: this.dataset.name,
        email: this.dataset.email,
        avatar: this.dataset.avatar,
      };
      selectedUserItemRef.item = this;
      confirmAddMemberBtn.disabled = false;
    });
  });
}

export function setupConfirmAddMember(confirmBtn, modal, roleSelect, teamMembersList, selectedUserRef) {
  confirmBtn.addEventListener('click', function () {
    if (!selectedUserRef.user) return;
    if (teamMembers.some(member => member.id === selectedUserRef.user.id)) {
      modal.classList.remove('active');
      return;
    }

    selectedUserRef.user.role = roleSelect.value;
    teamMembers.push(selectedUserRef.user);
    const newItem = createTeamMemberItem(selectedUserRef.user);
    teamMembersList.appendChild(newItem);
    modal.classList.remove('active');
  });
}

export function addUserDirectly(user, role, teamMembersList) {
  if (teamMembers.some(member => member.id === user.id)) {
    alert('User is already added to the team.');
    return;
  }

  user.role = role;
  teamMembers.push(user);

  const newItem = createTeamMemberItem(user);
  teamMembersList.appendChild(newItem);
}

function createTeamMemberItem(user) {
  const item = document.createElement('div');
  item.className = 'team-member-item';
  item.dataset.id = user.id;

  const avatar = document.createElement('div');
  avatar.className = 'member-avatar';
  avatar.textContent = user.avatar;

  const info = document.createElement('div');
  info.className = 'member-info';

  const name = document.createElement('div');
  name.className = 'member-name';
  name.textContent = user.name;

  const email = document.createElement('div');
  email.className = 'member-email';
  email.textContent = user.email;

  info.append(name, email);

  const controls = document.createElement('div');
  controls.className = 'member-controls';

  const roleSelector = document.createElement('select');
  roleSelector.className = 'role-select';
  ['developer', 'designer', 'project_manager', 'qa', 'stakeholder', 'viewer'].forEach(role => {
    const opt = document.createElement('option');
    opt.value = role;
    opt.textContent = role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (role === user.role) opt.selected = true;
    roleSelector.appendChild(opt);
  });

  roleSelector.addEventListener('change', () => {
    const member = teamMembers.find(m => m.id === user.id);
    if (member) member.role = roleSelector.value;
  });

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-member';
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => {
    teamMembers = teamMembers.filter(m => m.id !== user.id);
    item.remove();
  });

  controls.append(roleSelector, removeBtn);
  item.append(avatar, info, controls);
  return item;
}

export { teamMembers };