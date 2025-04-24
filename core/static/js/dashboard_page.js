import { elements } from './dashboard_page_scripts/elements.js';
import { toggleView, setActiveNavItem, toggleSubNav } from './dashboard_page_scripts/functions.js';
import { fetchProjects, logoutUser } from './dashboard_page_scripts/apiService.js';

document.addEventListener('DOMContentLoaded', async function () {
    // Projects nav
    elements.projectsNavItem.addEventListener('click', function () {
        setActiveNavItem(this);
        toggleView('projects-view');
        toggleSubNav('projects-sub-nav', 'projects-chevron');
    });

    // View all projects
    elements.viewAllProjectsLink.addEventListener('click', function (e) {
        e.preventDefault();
        toggleView('projects-view');
        setActiveNavItem(elements.projectsNavItem);

        if (!elements.subNav.classList.contains('expanded')) {
            elements.subNav.classList.add('expanded');
            elements.chevron.classList.add('expanded');
        }
    });

    elements.viewAllProjects.addEventListener('click', function () {
        toggleView('projects-view');
        elements.subNavItems.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });

    elements.navItems.forEach(item => {
        if (item.id !== 'projects-nav-item') {
            item.addEventListener('click', function () {
                setActiveNavItem(this);
                toggleView('dashboard-view');
            });
        }
    });

    elements.subNavItems.forEach(item => {
        if (item.id !== 'view-all-projects') {
            item.addEventListener('click', function () {
                setActiveNavItem(elements.projectsNavItem);
                elements.subNavItems.forEach(sub => sub.classList.remove('active'));
                this.classList.add('active');
                toggleView('dashboard-view');
            });
        }
    });

    elements.projectListItems.forEach(item => {
        item.addEventListener('click', function () {
            const projectId = this.dataset.project;

            setActiveNavItem(elements.projectsNavItem);

            if (!elements.subNav.classList.contains('expanded')) {
                elements.subNav.classList.add('expanded');
                elements.chevron.classList.add('expanded');
            }

            elements.subNavItems.forEach(navItem => {
                navItem.dataset.project === projectId
                    ? navItem.classList.add('active')
                    : navItem.classList.remove('active');
            });

            toggleView('dashboard-view');
        });
    });

    // Profile popup
    elements.avatar.addEventListener('click', () => {
        elements.popupMenu.style.display = elements.popupMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!elements.avatar.contains(event.target) && !elements.popupMenu.contains(event.target)) {
            elements.popupMenu.style.display = 'none';
        }
    });

    elements.profileLink.addEventListener('click', () => {
        window.location.href = '/accounts/profile/';
    });

    elements.logoutLink.addEventListener('click', () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        logoutUser()
            .then(() => window.location.href = '/accounts/signin/')
            .catch(err => console.error('Logout error:', err));
    });

    // Fetch projects
    const projectsContainer = document.getElementById('projects-grid'); // The container for projects
    const subNav = document.getElementById('projects-sub-nav'); // The sub navigation for projects

    // Function to load projects into the sidebar
    async function loadProjectsIntoSidebar() {
        try {
            const projects = await fetchProjects(); // Fetch projects from the backend

            // Clear the project list container
            projectListContainer.innerHTML = '';

            // Loop through the projects and create sidebar items
            projects.forEach(project => {
                const projectNavItem = document.createElement('div');
                projectNavItem.classList.add('nav-item');
                projectNavItem.dataset.section = `project-${project.key}`;
                
                const projectName = project.name || 'Unnamed Project'; // Fallback if 'name' is missing
                const projectKey = project.key || '#'; // Fallback if 'key' is missing

                projectNavItem.innerHTML = `
                    <div class="nav-icon">${projectName.charAt(0).toUpperCase()}</div>
                    <div class="with-chevron">
                        <a href="/projects/${projectName}">${projectName}</a>
                    </div>
                `;

                // Add click event listener to navigate to the project view
                projectNavItem.addEventListener('click', () => {
                    console.log(`Navigating to project: ${projectName}`);
                    toggleView('dashboard-view'); // Navigate to the dashboard view
                });

                // Append the project item to the sidebar
                projectListContainer.appendChild(projectNavItem);
            });
        } catch (error) {
            console.error('Error loading projects into sidebar:', error);
            projectListContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
        }
    }

    // Function to update projects in the main container
    async function updateProjects() {
        try {
            // Fetch projects data
            const projects = await fetchProjects();
            console.log('Fetched projects:', projects);
            // Clear the container before adding new content

            subNav.innerHTML = ''; // Clear sub navigation
            projectsContainer.innerHTML = '';

            // Loop through the projects and create HTML for each project
            projects.forEach(project => {
                // Create a project card

                const sub_nav_item = document.createElement('div');
                sub_nav_item.classList.add('sub-nav-item');
                sub_nav_item.id = project.key;

                sub_nav_item.innerHTML = ` <span>${project.name}</span>`;

                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                // Add project details to the card
                projectCard.innerHTML = `
                    <div class="project-header">
                        <div class="project-icon">${project.name.charAt(0).toUpperCase()}</div>
                        <div class="project-info">
                            <h3>${project.name}</h3>
                            <p>${project.description || 'No description available.'}</p>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="content-header">Recent queues</div>
                        <div class="content-list">
                            <div class="content-item">
                                <span>All open</span>
                                <span class="content-item-count">${project.all_open || 0}</span>
                            </div>
                            <div class="content-item">
                                <span>Open tasks</span>
                                <span class="content-item-count">${project.open_tasks || 0}</span>
                            </div>
                        </div>
                        <div class="dropdown">
                            <span>${project.queues || 0} queues</span>
                            <span style="margin-left: 4px;">▼</span>
                        </div>
                    </div>
                `;

                // Append the project card to the container
                projectsContainer.appendChild(projectCard);
                subNav.appendChild(sub_nav_item);
            });

            
        } catch (error) {
            console.error('Error updating projects:', error);
            projectsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
        }
    }

    // Call updateProjects every 5 seconds
    updateProjects(); // Initial call to load projects immediately
    setInterval(updateProjects, 5000); // Call every 5 seconds


    const links = document.querySelectorAll('.top-nav-links a');
    const contentArea = document.getElementById('dashboard-view');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            const title = this.getAttribute('data-title');

            fetch(url)
                .then(response => response.text())
                .then(html => {
                    contentArea.innerHTML = html;
                    window.history.pushState({}, '', url);  // update the URL
                    document.title = title;
                });
        });
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', function () {
        fetch(location.pathname)
            .then(response => response.text())
            .then(html => {
                contentArea.innerHTML = html;
            });
    });

});
