export function selectProjectType(card) {
    document.querySelectorAll('.project-type-card').forEach(item => {
      item.classList.remove('selected');
    });
  
    card.classList.add('selected');
    document.getElementById('project-type').value = card.dataset.type;
  }

  