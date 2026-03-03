/**
 * Illinois State Roleplay - Main JavaScript
 * Handles all interactivity, animations, and dynamic content
 */

// ========================================
// Department Data
// ========================================
const departmentData = {
    'state-police': {
        name: 'Illinois State Police',
        icon: 'fas fa-badge',
        description: 'The Illinois State Police (ISP) is the premier law enforcement agency in our community. Our troopers handle highway patrol, criminal investigations, and provide specialized units across the entire state.',
        units: [
            'Highway Patrol - Traffic enforcement and accident investigation',
            'Criminal Investigation Division (CID) - Major crimes and forensics',
            'SWAT - Special weapons and tactical operations',
            'Air Support - Helicopter patrols and pursuits',
            'K-9 Unit - Search, detection, and apprehension'
        ],
        requirements: [
            'Minimum 14 years of age',
            'Clean record in the community',
            'Must complete ISP Academy (2 weeks)',
            'Must maintain good standing',
            'Team player attitude required'
        ],
        color: '#4bbfff'
    },
    'sheriff': {
        name: 'County Sheriff',
        icon: 'fas fa-user-shield',
        description: 'The County Sheriff\'s Office provides essential law enforcement services to the county, including jail operations, court security, and patrol operations outside city limits.',
        units: [
            'Patrol Division - County-wide law enforcement',
            'Jail Division - Inmate management and transport',
            'Court Security - Judicial facility protection',
            'Civil Process - Court orders and evictions',
            'Search and Rescue - Missing persons operations'
        ],
        requirements: [
            'Minimum 13 years of age',
            'Must complete Sheriff Academy',
            'Willing to work in jail environment',
            'Good communication skills',
            'No major violations'
        ],
        color: '#2d5a27'
    },
    'fire': {
        name: 'Fire Department',
        icon: 'fas fa-fire-flame-curved',
        description: 'Our Fire Department is dedicated to protecting lives and property through firefighting, rescue operations, and emergency medical services. We respond to fires, accidents, and natural disasters.',
        units: [
            'Engine Company - Fire suppression and rescue',
            'Ladder Company - Ventilation and aerial operations',
            'Rescue Company - Technical rescue and extrication',
            'HazMat - Hazardous materials response',
            'Fire Prevention - Inspections and education'
        ],
        requirements: [
            'Minimum 13 years of age',
            'Must complete Fire Academy',
            'Physical fitness required',
            'Must be 16+ for operational duty',
            'Teamwork and communication essential'
        ],
        color: '#e63946'
    },
    'ems': {
        name: 'Emergency Medical Services',
        icon: 'fas fa-ambulance',
        description: 'EMS provides emergency medical care and transportation to those in need. Our paramedics and EMTs are the first line of medical response in our community.',
        units: [
            'Basic Life Support (BLS) - EMTs and routine transports',
            'Advanced Life Support (ALS) - Paramedics and critical care',
            'Special Operations - Event medical and tactical medic',
            'Community Paramedicine - Preventive care',
            'Training Division - Education and certification'
        ],
        requirements: [
            'Minimum 14 years of age',
            'Must complete EMS Academy',
            'Must be 16+ for patient contact',
            'Good medical knowledge',
            'Calm under pressure'
        ],
        color: '#f4a261'
    },
    'dispatch': {
        name: 'Dispatch Center',
        icon: 'fas fa-headset',
        description: 'The Dispatch Center is the backbone of emergency response. Our dispatchers coordinate all incoming emergency calls and dispatch the appropriate units.',
        units: [
            'Emergency 911 - Call taking and prioritization',
            'Police Dispatch - Unit coordination',
            'Fire/EMS Dispatch - Multi-agency coordination',
            'Records Division - Data management',
            'Quality Assurance - Training and improvement'
        ],
        requirements: [
            'Minimum 13 years of age',
            'Clear and professional voice',
            'Multi-tasking ability required',
            'Must complete Dispatch Academy',
            'Typing speed of 30+ WPM preferred'
        ],
        color: '#9b5de5'
    },
    'civilian': {
        name: 'Civilian',
        icon: 'fas fa-building',
        description: 'Civilian roles provide the fabric of our community. From business owners to news reporters, civilians create the world we roleplay in.',
        options: [
            'Business Owner - Restaurants, shops, and services',
            'News Reporter - Media coverage and journalism',
            'Citizen - Regular civilians with jobs',
            'Tow Truck Operator - Vehicle recovery',
            'Mechanic - Vehicle repairs and modifications'
        ],
        requirements: [
            'Minimum 13 years of age',
            'Creative and roleplay-focused',
            'No strict training required',
            'Must follow civilian guidelines',
            'Active participation encouraged'
        ],
        color: '#06d6a0'
    }
};

// ========================================
// DOM Elements
// ========================================
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const modalOverlay = document.getElementById('modal-overlay');
const departmentModal = document.getElementById('department-modal');
const modalContent = document.getElementById('modal-content');
const particlesCanvas = document.getElementById('particles');

// ========================================
// Loading Screen
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        initAnimations();
    }, 1500);
});

// ========================================
// Particle Background
// ========================================
function initParticles() {
    const canvas = particlesCanvas;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 100;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(75, 191, 255, ${p.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(75, 191, 255, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    resize();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// Scroll Animations
// ========================================
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if it's a stat
                if (entry.target.classList.contains('stat-item') || entry.target.querySelector('.stat-number')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.department-card, .about-card, .requirement-card, .rule-item, .about-text, .about-cards').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Initial particle background
    initParticles();
}

// ========================================
// Counter Animation
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// ========================================
// Modal Functions
// ========================================
function openModal(department) {
    const data = departmentData[department];
    if (!data) return;
    
    const modalHTML = `
        <div class="modal-header">
            <div class="modal-icon">
                <i class="${data.icon}"></i>
            </div>
            <h2>${data.name}</h2>
            <p>${data.description}</p>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-list-ul"></i> Available Units</h3>
            <ul>
                ${(data.units || data.options).map(unit => `
                    <li><i class="fas fa-check-circle"></i> ${unit}</li>
                `).join('')}
            </ul>
        </div>
        
        <div class="modal-requirements">
            <h4><i class="fas fa-user-check"></i> Requirements</h4>
            <ul>
                ${data.requirements.map(req => `
                    <li><i class="fas fa-check"></i> ${req}</li>
                `).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-paper-plane"></i> How to Join</h3>
            <ul>
                <li><i class="fas fa-arrow-right"></i> Join our Discord server</li>
                <li><i class="fas fa-arrow-right"></i> Read the rules and verify</li>
                <li><i class="fas fa-arrow-right"></i> Fill out an application</li>
                <li><i class="fas fa-arrow-right"></i> Complete the academy</li>
                <li><i class="fas fa-arrow-right"></i> Start your journey!</li>
            </ul>
        </div>
    `;
    
    modalContent.innerHTML = modalHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// Rules Accordion
// ========================================
function initRulesAccordion() {
    const ruleToggles = document.querySelectorAll('.rule-toggle');
    
    ruleToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.parentElement;
            
            // Close other items in the same column
            const column = item.parentElement;
            column.querySelectorAll('.rule-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initRulesAccordion();
    
    // Initialize stats counter immediately
    setTimeout(() => {
        animateCounters();
    }, 2000);
});

// ========================================
// Utility Functions
// ========================================

// Smooth reveal on page load
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.opacity = 1 - (scrolled / 500);
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Preload images
function preloadImages() {
    const logoUrl = 'https://cdn.discordapp.com/attachments/1472412365415776306/1472412580055089152/isrp.png';
    const img = new Image();
    img.src = logoUrl;
}

preloadImages();

// Console message for developers
console.log('%c Illinois State Roleplay ', 'background: #4bbfff; color: #000; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c Welcome to the community! ', 'background: #1a1a2e; color: #4bbfff; font-size: 14px; padding: 5px 10px; border-radius: 3px;');

