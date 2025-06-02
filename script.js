document.addEventListener('DOMContentLoaded', function() {
    // Theme
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Down Nav
    const scrollDown = document.querySelector('.scroll-down');

    window.addEventListener('scroll', function() {
        if (scrollDown) {
            if (window.scrollY > 100) {
                scrollDown.style.opacity = '0';
            } else {
                scrollDown.style.opacity = '1';
            }
        }
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width;
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workGrid = document.querySelector('.work-grid');
    
    const projects = [
        {
            id: 1,
            title: 'OCR for Insights',
            category: 'web',
            description: 'Developed an OCR and document analysis application using Streamlit.',
            image: 'Images/ocr-photo.png',
            link: 'https://github.com/AdwaitSalankar/OCR-of-Bank-Statements'
        },
        {
            id: 2,
            title: 'Extract-MIC',
            category: 'Machine Learning',
            description: 'Extracts structured info (date, fatalities, countries) from conflict-related text using a fine-tuned BERT model.',
            image: 'Images/MIC-photo.png',
            link: 'https://github.com/AdwaitSalankar/MIC_Files'
        },
        {
            id: 3,
            title: 'Cancer-Classifier',
            category: 'Machine Learning',
            description: 'Breast cancer classification using a Logistic Regression model built from scratch.',
            image: 'Images/cancer-classify-photo.jpg',
            link: 'https://github.com/AdwaitSalankar/Cancer-Classifier/blob/main/breast_cancer_predict.ipynb'
        },
        {
            id: 4,
            title: 'FoodieSpot',
            category: 'Machine Learning',
            description: 'Conversational AI-powered dining assistant that helps users to Make / Modify / Cancel a reservation.',
            image: 'Images/foodiespot-photo.png',
            link: 'https://github.com/AdwaitSalankar/FoodieSpot-Reservation-Assistant'
        },
        {
            id: 5,
            title: 'CompareIT',
            category: 'web',
            description: 'Find the best deals by comparing prices across Amazon, Flipkart, and Reliance Digital.',
            image: 'Images/compareit-photo.png',
            link: 'https://github.com/AdwaitSalankar/CompareIT'
        },
        {
            id: 6,
            title: 'QWERTY',
            category: 'web-game',
            description: 'Web-based game inspired by the popular word puzzle game Wordle.',
            image: 'Images/qwerty-photo.png',
            links: [
                { label: 'GitHub', url: 'https://github.com/AdwaitSalankar/QWERTY' },
                { label: 'Website', url: 'https://qwerty-first.netlify.app/' }
            ]
        }
    ];
    

    displayProjects(projects);
    

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            if (filter === 'all') {
                displayProjects(projects);
            } else {
                const filteredProjects = projects.filter(project => project.category === filter);
                displayProjects(filteredProjects);
            }
        });
    });
    
    // projects
    function displayProjects(projectsToDisplay) {
    workGrid.innerHTML = '';
    
    projectsToDisplay.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        let linksHTML = '';
        if (project.links && Array.isArray(project.links)) {
            linksHTML = project.links.map(link => `
                <a href="${link.url}" target="_blank" class="project-link">
                    ${link.label} <i class="fas fa-arrow-right"></i>
                </a>
            `).join('');
        } else if (project.link) {
            linksHTML = `
                <a href="${project.link}" target="_blank" class="project-link">
                    GitHub <i class="fas fa-arrow-right"></i>
                </a>
            `;
        }

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    ${linksHTML}
                </div>
            </div>
        `;
        
        workGrid.appendChild(projectCard);
    });
}

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
