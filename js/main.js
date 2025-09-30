// Main JavaScript file for personal website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounters();
    initProgressBars();
    initProjectFilters();
    initModals();
    initLightbox();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Highlight active navigation item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation classes to elements
    const cards = document.querySelectorAll('.about-card, .project-card, .course-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const current = parseInt(counter.textContent) || 0;
        const increment = target / 100;
        
        if (current < target) {
            counter.textContent = Math.ceil(current + increment);
            setTimeout(() => animateCounter(counter), 20);
        } else {
            counter.textContent = target;
        }
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Progress bars animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress[data-width]');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
        });
    });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Project filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('fade-in');
                    }
                }
            });
        });
    });
}

// Modal functionality
function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    closeModal(modal);
                }
            });
        }
    });
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Project modal functions
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    const projectData = getProjectData(projectId);
    
    modalBody.innerHTML = `
        <div class="project-detail">
            <div class="project-detail-header">
                <h2>${projectData.title}</h2>
                <p class="project-description">${projectData.description}</p>
            </div>
            <div class="project-detail-image">
                <div class="image-placeholder">
                    <i class="${projectData.icon}"></i>
                </div>
            </div>
            <div class="project-detail-content">
                <div class="project-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-tech">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${projectData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-links-detail">
                    <a href="${projectData.demoUrl}" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${projectData.codeUrl}" class="btn btn-secondary" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    closeModal(modal);
}

function getProjectData(projectId) {
    const projects = {
        project1: {
            title: 'E-Commerce Platform',
            description: 'A comprehensive e-commerce solution with modern design and robust functionality.',
            icon: 'fas fa-shopping-cart',
            features: [
                'User authentication and authorization',
                'Product catalog with search and filtering',
                'Shopping cart and checkout process',
                'Payment integration with Stripe',
                'Admin dashboard for inventory management',
                'Responsive design for all devices'
            ],
            technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT'],
            demoUrl: '#',
            codeUrl: '#'
        },
        project2: {
            title: 'Task Manager App',
            description: 'Cross-platform mobile application for productivity and task management.',
            icon: 'fas fa-tasks',
            features: [
                'Create, edit, and delete tasks',
                'Set priorities and due dates',
                'Category-based organization',
                'Offline functionality',
                'Push notifications',
                'Data synchronization across devices'
            ],
            technologies: ['React Native', 'Firebase', 'Redux', 'AsyncStorage', 'Push Notifications'],
            demoUrl: '#',
            codeUrl: '#'
        },
        project3: {
            title: 'Brand Identity Design',
            description: 'Complete brand identity package for a tech startup.',
            icon: 'fas fa-palette',
            features: [
                'Logo design and variations',
                'Color palette and typography',
                'Business card design',
                'Letterhead and envelope design',
                'Social media templates',
                'Brand guidelines document'
            ],
            technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'InDesign'],
            demoUrl: '#',
            codeUrl: '#'
        },
        project4: {
            title: 'Data Visualization Dashboard',
            description: 'Interactive dashboard for business intelligence and data analysis.',
            icon: 'fas fa-chart-bar',
            features: [
                'Real-time data visualization',
                'Interactive charts and graphs',
                'Data filtering and sorting',
                'Export functionality',
                'Responsive design',
                'User role management'
            ],
            technologies: ['Vue.js', 'D3.js', 'Python', 'Flask', 'PostgreSQL', 'Chart.js'],
            demoUrl: '#',
            codeUrl: '#'
        },
        project5: {
            title: 'AI Chatbot',
            description: 'Intelligent chatbot with natural language processing capabilities.',
            icon: 'fas fa-robot',
            features: [
                'Natural language understanding',
                'Context-aware conversations',
                'Multi-language support',
                'Integration with external APIs',
                'Learning from user interactions',
                'Customizable personality'
            ],
            technologies: ['Python', 'TensorFlow', 'NLTK', 'Flask', 'MongoDB', 'WebSocket'],
            demoUrl: '#',
            codeUrl: '#'
        },
        project6: {
            title: 'Personal Blog Platform',
            description: 'Custom CMS with modern design and SEO optimization.',
            icon: 'fas fa-blog',
            features: [
                'Markdown support for writing',
                'SEO-optimized pages',
                'Comment system',
                'Tag-based organization',
                'Social media sharing',
                'Analytics integration'
            ],
            technologies: ['Next.js', 'Markdown', 'Vercel', 'Contentful', 'Google Analytics'],
            demoUrl: '#',
            codeUrl: '#'
        }
    };
    
    return projects[projectId] || projects.project1;
}

// Lightbox functionality
function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    
    if (lightboxModal) {
        const closeBtn = lightboxModal.querySelector('.lightbox-close');
        
        closeBtn.addEventListener('click', closeLightbox);
        
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(photoId) {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = lightboxModal.querySelector('.lightbox-image .image-placeholder');
    const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
    
    const photoData = getPhotoData(photoId);
    
    lightboxImage.innerHTML = `
        <i class="${photoData.icon}"></i>
        <span>${photoData.category}</span>
    `;
    lightboxImage.className = `image-placeholder ${photoData.category.toLowerCase()}`;
    
    lightboxCaption.innerHTML = `
        <h3>${photoData.title}</h3>
        <p>${photoData.description}</p>
    `;
    
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getPhotoData(photoId) {
    const photos = {
        photo1: {
            title: 'Mountain Landscape',
            description: 'A breathtaking view of snow-capped mountains during golden hour.',
            category: 'Landscape',
            icon: 'fas fa-mountain'
        },
        photo2: {
            title: 'Portrait Photography',
            description: 'Professional portrait session showcasing natural lighting techniques.',
            category: 'Portrait',
            icon: 'fas fa-user'
        },
        photo3: {
            title: 'Street Photography',
            description: 'Candid moments captured in the bustling city streets.',
            category: 'Street',
            icon: 'fas fa-city'
        },
        photo4: {
            title: 'Nature Close-up',
            description: 'Detailed macro photography of local flora and fauna.',
            category: 'Nature',
            icon: 'fas fa-leaf'
        },
        photo5: {
            title: 'Architectural Design',
            description: 'Modern architecture showcasing clean lines and geometric patterns.',
            category: 'Architecture',
            icon: 'fas fa-building'
        },
        photo6: {
            title: 'Macro Photography',
            description: 'Extreme close-up photography revealing hidden details.',
            category: 'Macro',
            icon: 'fas fa-search'
        }
    };
    
    return photos[photoId] || photos.photo1;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation for page transitions
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.remove();
    }
}

// Smooth page transitions
window.addEventListener('beforeunload', showLoading);
window.addEventListener('load', hideLoading);

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme switching (if needed in future)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Export functions for global access
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;