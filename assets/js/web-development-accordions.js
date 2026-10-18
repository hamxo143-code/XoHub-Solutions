/**
 * Web Development Page - Accordion Functionality
 * Handles Stage Details and FAQ accordions with smooth animations
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // ============================================================
    // STAGE DETAILS ACCORDION
    // ============================================================
    function initStageDetailsAccordion() {
        const stageTriggers = document.querySelectorAll('.stage-detail-card__trigger');
        
        if (stageTriggers.length === 0) {
            return; // Not on the relevant page section
        }

        console.log(`✅ Found ${stageTriggers.length} stage detail triggers`);

        stageTriggers.forEach((trigger) => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const currentExpanded = this.getAttribute('aria-expanded') === 'true';
                const parentCard = this.closest('.stage-detail-card');
                const content = parentCard.querySelector('.stage-detail-card__content');
                
                if (!content) {
                    console.warn('⚠️ Stage detail content not found');
                    return;
                }

                // Toggle current item
                if (currentExpanded) {
                    // Collapse
                    this.setAttribute('aria-expanded', 'false');
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    parentCard.classList.remove('active');
                } else {
                    // Expand
                    this.setAttribute('aria-expanded', 'true');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    parentCard.classList.add('active');
                    
                    // Recalculate after a brief delay to account for any dynamic content
                    setTimeout(() => {
                        if (this.getAttribute('aria-expanded') === 'true') {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    }, 50);
                }

                console.log(`📋 Stage detail ${currentExpanded ? 'collapsed' : 'expanded'}`);
            });

            // Support keyboard navigation
            trigger.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Recalculate heights on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                stageTriggers.forEach((trigger) => {
                    if (trigger.getAttribute('aria-expanded') === 'true') {
                        const parentCard = trigger.closest('.stage-detail-card');
                        const content = parentCard.querySelector('.stage-detail-card__content');
                        if (content) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    }
                });
            }, 200);
        });
    }

    // ============================================================
    // FAQ ACCORDION
    // ============================================================
    function initFaqAccordion() {
        const faqTriggers = document.querySelectorAll('.faq-item__trigger');
        
        if (faqTriggers.length === 0) {
            return; // Not on the relevant page section
        }

        console.log(`✅ Found ${faqTriggers.length} FAQ triggers`);

        faqTriggers.forEach((trigger) => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const currentExpanded = this.getAttribute('aria-expanded') === 'true';
                const parentItem = this.closest('.faq-item');
                const content = parentItem.querySelector('.faq-item__content');
                
                if (!content) {
                    console.warn('⚠️ FAQ content not found');
                    return;
                }

                // Toggle current item
                if (currentExpanded) {
                    // Collapse
                    this.setAttribute('aria-expanded', 'false');
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    parentItem.classList.remove('active');
                } else {
                    // Expand
                    this.setAttribute('aria-expanded', 'true');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    parentItem.classList.add('active');
                    
                    // Recalculate after a brief delay to account for any dynamic content
                    setTimeout(() => {
                        if (this.getAttribute('aria-expanded') === 'true') {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    }, 50);
                }

                console.log(`❓ FAQ ${currentExpanded ? 'collapsed' : 'expanded'}`);
            });

            // Support keyboard navigation
            trigger.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Recalculate heights on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                faqTriggers.forEach((trigger) => {
                    if (trigger.getAttribute('aria-expanded') === 'true') {
                        const parentItem = trigger.closest('.faq-item');
                        const content = parentItem.querySelector('.faq-item__content');
                        if (content) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    }
                });
            }, 200);
        });

        // FAQ Voting functionality
        const voteBtns = document.querySelectorAll('.faq-item__vote');
        voteBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-check';
                }
                this.style.color = 'var(--color-lime-dark)';
                this.style.background = 'rgba(192, 227, 74, 0.08)';
                this.textContent = ' Helpful';
                this.prepend(icon);
                setTimeout(() => {
                    if (icon) {
                        icon.className = 'fas fa-thumbs-up';
                    }
                    this.textContent = ' Helpful';
                    this.prepend(icon);
                    this.style.color = '';
                    this.style.background = '';
                }, 2000);
            });
        });

        // FAQ Copy link functionality
        const copyBtns = document.querySelectorAll('.faq-item__copy');
        copyBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const item = this.closest('.faq-item');
                const question = item?.querySelector('.faq-item__question')?.textContent || 'FAQ';
                const icon = this.querySelector('i');
                
                // Create a link identifier from the question
                const linkId = question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                const fullUrl = `${window.location.origin}${window.location.pathname}#${linkId}`;
                
                // Copy to clipboard
                navigator.clipboard.writeText(fullUrl).then(() => {
                    if (icon) {
                        icon.className = 'fas fa-check';
                    }
                    this.textContent = ' Copied!';
                    if (icon) this.prepend(icon);
                    this.style.color = 'var(--color-lime-dark)';
                    setTimeout(() => {
                        if (icon) {
                            icon.className = 'fas fa-link';
                        }
                        this.textContent = ' Copy Link';
                        if (icon) this.prepend(icon);
                        this.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy link:', err);
                });
            });
        });
    }

    // ============================================================
    // TIMELINE STAGE CLICK INTEGRATION
    // ============================================================
    function initTimelineStageClick() {
        const timelineStages = document.querySelectorAll('.timeline-stage');
        
        if (timelineStages.length === 0) {
            return;
        }

        timelineStages.forEach((stage) => {
            stage.addEventListener('click', function() {
                const stageNum = parseInt(this.dataset.stage, 10);
                const detailCards = document.querySelectorAll('.stage-detail-card');

                // Find the corresponding detail card
                const targetCard = detailCards[stageNum - 1];
                if (targetCard) {
                    const trigger = targetCard.querySelector('.stage-detail-card__trigger');
                    
                    // Expand if collapsed
                    if (trigger && trigger.getAttribute('aria-expanded') !== 'true') {
                        trigger.click();
                    }
                    
                    // Scroll into view
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Highlight effect
                    targetCard.style.borderColor = 'var(--color-lime)';
                    targetCard.style.boxShadow = '0 0 0 4px rgba(192,227,74,0.1)';
                    setTimeout(() => {
                        targetCard.style.borderColor = '';
                        targetCard.style.boxShadow = '';
                    }, 2000);
                }
            });
        });
    }

    // ============================================================
    // INITIALIZATION
    // ============================================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                console.log('🎬 Initializing Web Development Page Accordions');
                initStageDetailsAccordion();
                initFaqAccordion();
                initTimelineStageClick();
            });
        } else {
            console.log('🎬 Initializing Web Development Page Accordions');
            initStageDetailsAccordion();
            initFaqAccordion();
            initTimelineStageClick();
        }
    }

    // Run initialization
    init();

})();
