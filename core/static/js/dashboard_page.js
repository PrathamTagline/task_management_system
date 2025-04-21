// Function to handle toggling between views
function toggleView(viewId) {
    // Hide all views
    document.getElementById('projects-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'none';
    
    // Show the selected view
    document.getElementById(viewId).style.display = 'block';
  }
  
  // Function to handle nav item selection
  function setActiveNavItem(element) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Remove active class from all sub-nav items
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to clicked element
    element.classList.add('active');
  }
  
  // Function to toggle sub-nav visibility
  function toggleSubNav(subNavId, chevronId) {
    const subNav = document.getElementById(subNavId);
    const chevron = document.getElementById(chevronId);
    
    subNav.classList.toggle('expanded');
    chevron.classList.toggle('expanded');
  }
  
  // Initialize event listeners
  document.addEventListener('DOMContentLoaded', function() {
    // Event listener for Projects nav item
    const projectsNavItem = document.getElementById('projects-nav-item');
    projectsNavItem.addEventListener('click', function() {
      setActiveNavItem(this);
      toggleView('projects-view');
      toggleSubNav('projects-sub-nav', 'projects-chevron');
    });
    
    // Event listener for "View all projects" link
    const viewAllProjectsLink = document.getElementById('view-all-projects-link');
    viewAllProjectsLink.addEventListener('click', function(e) {
      e.preventDefault();
      toggleView('projects-view');
      setActiveNavItem(document.getElementById('projects-nav-item'));
      
      // Ensure sub-nav is expanded
      const subNav = document.getElementById('projects-sub-nav');
      const chevron = document.getElementById('projects-chevron');
      if (!subNav.classList.contains('expanded')) {
        subNav.classList.add('expanded');
        chevron.classList.add('expanded');
      }
    });
    
    // Event listener for "View all projects" in sub-nav
    const viewAllProjects = document.getElementById('view-all-projects');
    viewAllProjects.addEventListener('click', function() {
      toggleView('projects-view');
      
      // Set this sub-nav item as active
      const subNavItems = document.querySelectorAll('.sub-nav-item');
      subNavItems.forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    });
    
    // Event listeners for all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.id !== 'projects-nav-item') { // We already handled this one
        item.addEventListener('click', function() {
          setActiveNavItem(this);
          const viewId = this.dataset.section;
          if (viewId && viewId !== 'projects-view') {
            toggleView('dashboard-view'); // Default to dashboard for now
          }
        });
      }
    });
    
    // Event listeners for project sub-nav items
    const projectSubNavItems = document.querySelectorAll('.sub-nav-item');
    projectSubNavItems.forEach(item => {
      if (item.id !== 'view-all-projects') { // We already handled this one
        item.addEventListener('click', function() {
          // Set parent nav item as active
          setActiveNavItem(document.getElementById('projects-nav-item'));
          
          // Set this sub-nav item as active too
          const subNavItems = document.querySelectorAll('.sub-nav-item');
          subNavItems.forEach(item => {
            item.classList.remove('active');
          });
          this.classList.add('active');
          
          // Go to dashboard view (in a real app, this would show the specific project)
          toggleView('dashboard-view');
        });
      }
    });
    
    // Event listeners for project list items
    const projectListItems = document.querySelectorAll('.project-list-item');
    projectListItems.forEach(item => {
      item.addEventListener('click', function() {
        const projectId = this.dataset.project;
        
        // Set Projects nav item as active
        setActiveNavItem(document.getElementById('projects-nav-item'));
        
        // Ensure projects sub-nav is expanded
        const subNav = document.getElementById('projects-sub-nav');
        const chevron = document.getElementById('projects-chevron');
        if (!subNav.classList.contains('expanded')) {
          subNav.classList.add('expanded');
          chevron.classList.add('expanded');
        }
        
        // Set the corresponding sub-nav item as active
        const subNavItems = document.querySelectorAll('.sub-nav-item');
        subNavItems.forEach(navItem => {
          if (navItem.dataset.project === projectId) {
            navItem.classList.add('active');
          } else {
            navItem.classList.remove('active');
          }
        });
        
        // Go to dashboard view (in a real app, this would show the specific project)
        toggleView('dashboard-view');
      });
    });
  });