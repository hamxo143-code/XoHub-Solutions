/**
 * XoHub Solutions — Text Rotator
 * Smooth automatic text rotation with fade/slide animation
 * Respects prefers-reduced-motion and pauses when tab is inactive
 */

(() => {
    'use strict';

    // Configuration
    const ROTATION_INTERVAL = 4500; // 4.5 seconds per message
    const ANIMATION_DURATION = 600; // Animation duration in ms
    const INIT_DELAY = 1200; // Delay before starting rotation (wait for modal)

    // Messages to rotate
    const messages = [
        { text: 'We help businesses grow with innovative digital solutions.', highlight: 'grow' },
        { text: 'Custom Web Development, Mobile Apps & AI Solutions.', highlight: 'Web Development' },
        { text: 'Serving startups, SMEs and enterprises worldwide.', highlight: 'startups' },
        { text: 'Free consultation for your next digital project.', highlight: 'Free consultation' },
        { text: 'Your trusted partner for digital transformation.', highlight: 'digital transformation' }
    ];

    let currentIndex = 0;
    let rotationTimer = null;
    let isAnimating = false;
    let isPaused = false;
    let initialized = false;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, keep static text
    if (prefersReducedMotion) {
        return;
    }

    // Build message HTML with highlight
    const buildMessageHTML = (text, highlight) => {
        const escapedText = text.replace(/[&<>"']/g, (char) => {
            const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
            return entities[char];
        });
        const highlightEscaped = highlight.replace(/[&<>"']/g, (char) => {
            const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
            return entities[char];
        });
        
        const regex = new RegExp(`(${highlightEscaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const result = escapedText.replace(regex, `<span class="XoHubSolutions-HighlightGreen">$1</span>`);
        return result;
    };

    // Initialize rotator
    const init = () => {
        if (initialized) return;
        
        // Find the top bar text element
        const topBarText = document.querySelector('.XoHubSolutions-TopBarText');
        if (!topBarText) {
            console.warn('XoHub Text Rotator: .XoHubSolutions-TopBarText not found');
            return;
        }
        
        // Clear existing content
        topBarText.innerHTML = '';
        
        // Create rotator wrapper
        const wrapper = document.createElement('span');
        wrapper.className = 'XoHubSolutions-TextRotator';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.verticalAlign = 'middle';
        wrapper.style.minHeight = '1.2em';
        
        // Create message element
        const messageEl = document.createElement('span');
        messageEl.className = 'XoHubSolutions-RotatorMessage';
        messageEl.style.display = 'inline-block';
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0)';
        messageEl.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        messageEl.innerHTML = buildMessageHTML(messages[0].text, messages[0].highlight);
        
        wrapper.appendChild(messageEl);
        topBarText.appendChild(wrapper);
        
        initialized = true;
        
        // Start rotation after brief delay
        setTimeout(() => {
            startRotation();
        }, INIT_DELAY);
    };

    // Rotate to next message
    const rotateNext = () => {
        if (isAnimating || isPaused) return;
        
        isAnimating = true;
        
        const messageEl = document.querySelector('.XoHubSolutions-RotatorMessage');
        
        if (!messageEl) {
            isAnimating = false;
            return;
        }
        
        // Calculate next index
        const nextIndex = (currentIndex + 1) % messages.length;
        
        // Fade out
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            // Update content
            messageEl.innerHTML = buildMessageHTML(messages[nextIndex].text, messages[nextIndex].highlight);
            currentIndex = nextIndex;
            
            // Reset position (below)
            messageEl.style.transform = 'translateY(10px)';
            
            // Force reflow
            void messageEl.offsetHeight;
            
            // Fade in
            requestAnimationFrame(() => {
                messageEl.style.opacity = '1';
                messageEl.style.transform = 'translateY(0)';
            });
            
            isAnimating = false;
        }, ANIMATION_DURATION);
    };

    // Start rotation
    const startRotation = () => {
        if (rotationTimer) {
            clearInterval(rotationTimer);
        }
        
        rotationTimer = setInterval(rotateNext, ROTATION_INTERVAL);
    };

    // Stop rotation
    const stopRotation = () => {
        if (rotationTimer) {
            clearInterval(rotationTimer);
            rotationTimer = null;
        }
    };

    // Pause/resume on tab visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isPaused = true;
            stopRotation();
        } else {
            isPaused = false;
            if (initialized) {
                startRotation();
            }
        }
    });

    // Initialize on load
    const initWhenReady = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            // DOM already loaded, init immediately
            init();
        }
    };

    // Start initialization
    initWhenReady();

})();
