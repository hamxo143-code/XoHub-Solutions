/**
 * XoHub Solutions - Portfolio Slider v3.0
 * Redesigned to match Testimonials slider
 * ROOT CAUSE FIX: Ensures permanent visibility
 */

(function() {
    'use strict';

    const PortfolioSlider = {
        track: null,
        prevBtn: null,
        nextBtn: null,
        pagination: null,
        wrapper: null,
        
        cards: [],
        originalCards: [],
        currentIndex: 0,
        realIndex: 0,
        slidesPerView: 3,
        totalSlides: 0,
        isAnimating: false,
        
        touchStartX: 0,
        touchEndX: 0,
        
        autoplayTimer: null,
        autoplayDelay: 4500,
        isPaused: false,
        
        cloneCount: 0,
        gap: 28,

        init() {
            console.log('🎨 Portfolio Slider v3.0 initializing...');
            
            this.track = document.getElementById('xo-portfolio-track');
            this.prevBtn = document.getElementById('xo-portfolio-prev');
            this.nextBtn = document.getElementById('xo-portfolio-next');
            this.pagination = document.getElementById('xo-portfolio-pagination');
            this.wrapper = document.querySelector('.xo-portfolio-slider-wrapper');

            if (!this.track || !this.prevBtn || !this.nextBtn || !this.pagination) {
                console.warn('Portfolio slider elements not found');
                return;
            }

            this.originalCards = Array.from(this.track.querySelectorAll('.portfolio-card'));
            this.totalSlides = this.originalCards.length;

            if (this.totalSlides === 0) {
                console.warn('No portfolio cards found');
                return;
            }

            // CRITICAL: Ensure all cards are visible immediately
            this.forceVisibility();
            
            this.calculateSlidesPerView();
            this.setupClones();
            this.setupEvents();
            this.createPagination();
            this.updateSlider(false);
            this.startAutoplay();

            console.log(`✅ Portfolio Slider active: ${this.totalSlides} projects`);
        },

        /**
         * CRITICAL: Force all cards to be visible
         * This prevents the scroll animation from hiding them
         */
        forceVisibility() {
            this.originalCards.forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.transform = 'translateY(0)';
                card.style.display = 'flex';
            });
            
            // Also force section visibility
            const section = document.getElementById('portfolio');
            if (section) {
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            }
        },

        calculateSlidesPerView() {
            const width = window.innerWidth;
            
            if (width <= 480) {
                this.slidesPerView = 1;
                this.gap = 16;
            } else if (width <= 768) {
                this.slidesPerView = 2;
                this.gap = 20;
            } else if (width <= 1024) {
                this.slidesPerView = 2;
                this.gap = 28;
            } else {
                this.slidesPerView = 3;
                this.gap = 28;
            }
        },

        setupClones() {
            this.track.innerHTML = '';
            this.cloneCount = Math.max(this.slidesPerView * 2, this.totalSlides);
            
            // Leading clones
            for (let i = this.totalSlides - this.cloneCount; i < this.totalSlides; i++) {
                const index = (i + this.totalSlides) % this.totalSlides;
                const clone = this.originalCards[index].cloneNode(true);
                clone.classList.add('xo-clone');
                // Ensure clone is visible
                clone.style.opacity = '1';
                clone.style.visibility = 'visible';
                clone.style.display = 'flex';
                this.track.appendChild(clone);
            }
            
            // Original cards
            this.originalCards.forEach(card => {
                const cardClone = card.cloneNode(true);
                // Ensure visible
                cardClone.style.opacity = '1';
                cardClone.style.visibility = 'visible';
                cardClone.style.display = 'flex';
                this.track.appendChild(cardClone);
            });
            
            // Trailing clones
            for (let i = 0; i < this.cloneCount; i++) {
                const clone = this.originalCards[i].cloneNode(true);
                clone.classList.add('xo-clone');
                // Ensure visible
                clone.style.opacity = '1';
                clone.style.visibility = 'visible';
                clone.style.display = 'flex';
                this.track.appendChild(clone);
            }
            
            this.cards = Array.from(this.track.querySelectorAll('.portfolio-card'));
            this.currentIndex = this.cloneCount;
            this.realIndex = 0;
        },

        updateSlider(animate = true) {
            if (!this.cards.length) return;

            const totalGaps = (this.slidesPerView - 1) * this.gap;
            const availableWidth = this.wrapper.offsetWidth - totalGaps;
            const cardWidth = availableWidth / this.slidesPerView;
            
            const offset = -(this.currentIndex * (cardWidth + this.gap));
            
            if (animate) {
                this.track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            } else {
                this.track.classList.add('xo-no-transition');
                this.track.style.transition = 'none';
            }
            
            this.track.style.transform = `translateX(${offset}px)`;
            
            if (!animate) {
                requestAnimationFrame(() => {
                    this.track.classList.remove('xo-no-transition');
                });
            }
            
            this.updatePagination();
            
            if (animate) {
                setTimeout(() => this.checkLoop(), 650);
            }
        },

        checkLoop() {
            if (this.currentIndex >= this.cloneCount + this.totalSlides) {
                this.currentIndex = this.cloneCount;
                this.realIndex = 0;
                this.updateSlider(false);
            }
            
            if (this.currentIndex < this.cloneCount) {
                this.currentIndex = this.cloneCount + this.totalSlides - 1;
                this.realIndex = this.totalSlides - 1;
                this.updateSlider(false);
            }
            
            this.realIndex = this.currentIndex - this.cloneCount;
            if (this.realIndex < 0) this.realIndex = 0;
            if (this.realIndex >= this.totalSlides) this.realIndex = this.totalSlides - 1;
            
            this.updatePagination();
        },

        createPagination() {
            this.pagination.innerHTML = '';
            const numPages = Math.ceil(this.totalSlides / this.slidesPerView);
            
            for (let i = 0; i < numPages; i++) {
                const dot = document.createElement('button');
                dot.className = 'xo-portfolio-pagination-dot';
                dot.setAttribute('aria-label', `Go to page ${i + 1}`);
                
                dot.addEventListener('click', () => {
                    this.goToPage(i);
                    this.resetAutoplay();
                });
                
                this.pagination.appendChild(dot);
            }
        },

        updatePagination() {
            const dots = this.pagination.querySelectorAll('.xo-portfolio-pagination-dot');
            const currentPage = Math.floor(this.realIndex / this.slidesPerView);
            
            dots.forEach((dot, index) => {
                if (index === currentPage) {
                    dot.classList.add('xo-active');
                } else {
                    dot.classList.remove('xo-active');
                }
            });
        },

        goToPage(pageIndex) {
            if (this.isAnimating) return;
            this.isAnimating = true;
            
            const targetRealIndex = pageIndex * this.slidesPerView;
            this.realIndex = Math.min(targetRealIndex, this.totalSlides - 1);
            this.currentIndex = this.cloneCount + this.realIndex;
            
            this.updateSlider(true);
            setTimeout(() => { this.isAnimating = false; }, 700);
        },

        prev() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.currentIndex--;
            this.updateSlider(true);
            setTimeout(() => { this.isAnimating = false; }, 700);
        },

        next() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.currentIndex++;
            this.updateSlider(true);
            setTimeout(() => { this.isAnimating = false; }, 700);
        },

        startAutoplay() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
            }
            
            this.isPaused = false;
            this.autoplayTimer = setInterval(() => {
                if (!this.isPaused && !document.hidden) {
                    this.next();
                }
            }, this.autoplayDelay);
        },

        stopAutoplay() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        },

        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        },

        handleSwipe() {
            const diff = this.touchStartX - this.touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
                this.resetAutoplay();
            }
        },

        handleResize() {
            const oldSlidesPerView = this.slidesPerView;
            this.calculateSlidesPerView();
            
            if (oldSlidesPerView !== this.slidesPerView) {
                this.setupClones();
                this.createPagination();
                this.updateSlider(false);
            } else {
                this.updateSlider(false);
            }
        },

        setupEvents() {
            this.prevBtn.addEventListener('click', () => {
                this.prev();
                this.resetAutoplay();
            });

            this.nextBtn.addEventListener('click', () => {
                this.next();
                this.resetAutoplay();
            });

            if (this.wrapper) {
                this.wrapper.addEventListener('mouseenter', () => {
                    this.isPaused = true;
                });

                this.wrapper.addEventListener('mouseleave', () => {
                    this.isPaused = false;
                });

                this.wrapper.addEventListener('touchstart', (e) => {
                    this.touchStartX = e.changedTouches[0].screenX;
                    this.isPaused = true;
                }, { passive: true });

                this.wrapper.addEventListener('touchend', (e) => {
                    this.touchEndX = e.changedTouches[0].screenX;
                    this.handleSwipe();
                    setTimeout(() => { this.isPaused = false; }, 1000);
                }, { passive: true });
            }

            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.handleResize();
                }, 250);
            });

            document.addEventListener('visibilitychange', () => {
                this.isPaused = document.hidden;
            });
        }
    };

    // Initialize
    function initSlider() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                PortfolioSlider.init();
            });
        } else {
            PortfolioSlider.init();
        }
    }

    initSlider();

})();
