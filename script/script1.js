// Initialize particles with distributed systems theme
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00d9ff', '#ff6b6b', '#4ecdc4']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d9ff',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.8
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Typing animation for subtitle
const phrases = [
    'Software Engineer | Distributed Systems & Infrastructre',
    'Building scalable systems at scale',
    'Go • Python • Kubernetes • AWS',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    
    // Track user interactions (clicks, scrolls, hovers)
    let interactionCount = parseInt(localStorage.getItem('interactionCount') || '0');
    document.getElementById('interactions').textContent = interactionCount.toLocaleString();
    
    // Increment on any click
    document.addEventListener('click', () => {
        interactionCount++;
        localStorage.setItem('interactionCount', interactionCount);
        document.getElementById('interactions').textContent = interactionCount.toLocaleString();
    });
    
    // Simulate system stats
    setInterval(() => {
        const latency = Math.floor(Math.random() * 30) + 10;
        document.getElementById('latency').textContent = latency + 'ms';
        
        const uptime = (99.5 + Math.random() * 0.5).toFixed(2);
        document.getElementById('uptime').textContent = uptime + '%';
    }, 2000);
    
    // Add hover effect and click to expand project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 10px 30px ${this.style.getPropertyValue('--accent-color')}40`;
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.boxShadow = 'none';
            }
        });
        
        // Click to expand/collapse
        card.addEventListener('click', function(e) {
            // Don't expand if clicking on a link
            if (e.target.tagName === 'A') return;
            
            // Close other cards
            projectCards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('expanded');
                    c.style.boxShadow = 'none';
                }
            });
            
            // Toggle this card
            this.classList.toggle('expanded');
            if (this.classList.contains('expanded')) {
                this.style.boxShadow = `0 10px 30px ${this.style.getPropertyValue('--accent-color')}40`;
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });
});
