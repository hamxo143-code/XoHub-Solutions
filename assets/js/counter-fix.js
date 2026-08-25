/**
 * XoHub Solutions - Counter Animation Fix
 * Standalone counter animation for Our Impact section
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounters);
    } else {
        initCounters();
    }
    
    function initCounters() {
        const counters = document.querySelectorAll('.XoHubSolutions-AnimatedCounter');
        let countersAnimated = false;
        
        if (counters.length === 0) {
            console.warn('⚠️ No counter elements found');
            return;
        }
        
        console.log(`✅ Found ${counters.length} counter elements`);
        
        function animateCounter(element, target, duration = 2000) {
            const startTime = performance.now();
            
            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease-out cubic for smooth deceleration
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(eased * target);
                
                element.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = target;
                    console.log(`✅ Counter animated to: ${target}`);
                }
            }
            
            requestAnimationFrame(updateCount);
        }
        
        // Create Intersection Observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    console.log('🎯 Impact section visible - starting counter animation');
                    
                    counters.forEach(function(counterEl) {
                        const target = parseInt(counterEl.getAttribute('data-count'), 10);
                        if (isNaN(target)) {
                            console.warn('⚠️ Invalid data-count attribute:', counterEl);
                            return;
                        }
                        
                        // Reset to 0 before animating
                        counterEl.textContent = '0';
                        
                        // Animate to target
                        animateCounter(counterEl, target);
                    });
                    
                    // Disconnect after triggering once
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe the section
        const section = document.querySelector('.XoHubSolutions-ImpactSection');
        if (section) {
            observer.observe(section);
            console.log('✅ Observer attached to Impact section');
        } else {
            console.error('❌ Impact section not found');
        }
    }
})();
