document.addEventListener('DOMContentLoaded', () => {
    // Copy to clipboard functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const codeBlock = e.target.closest('.install-step').querySelector('code');
            const textToCopy = codeBlock.innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = e.target.innerText;
                e.target.innerText = 'COPIED';
                e.target.style.color = 'var(--accent)';
                
                setTimeout(() => {
                    e.target.innerText = originalText;
                    e.target.style.color = '';
                }, 2000);
            });
        });
    });

    // Add glitch effect on hover for brand
    const brand = document.querySelector('.brand h2');
    if (brand) {
        brand.addEventListener('mouseenter', () => {
            brand.style.textShadow = '2px 0 var(--accent-red), -2px 0 var(--accent)';
            setTimeout(() => {
                brand.style.textShadow = '0 0 var(--glow-spread) rgba(168, 85, 247, 0.3)';
            }, 150);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                // Ensure opacity is 1 after animation
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial opacity 0 for staggered items
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});
