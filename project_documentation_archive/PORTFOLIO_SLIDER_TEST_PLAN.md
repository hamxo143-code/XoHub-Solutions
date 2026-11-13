# Portfolio Slider - Testing Plan

## Quick Testing Guide

### 1. Initial Load Test (30 seconds)

**Steps:**
1. Open `index.html` in browser
2. Scroll to Portfolio section
3. Observe slider behavior

**Expected Results:**
- ✅ All 6 portfolio cards visible in slider
- ✅ Navigation arrows appear on left/right
- ✅ Pagination dots appear below slider (2 dots for 3 cards/view)
- ✅ First dot is active (elongated, filled)
- ✅ Slider auto-advances after 4.5 seconds
- ✅ No console errors

### 2. Navigation Test (1 minute)

**Steps:**
1. Click Next button (right arrow)
2. Click Previous button (left arrow)
3. Click each pagination dot
4. Use keyboard arrows (Tab to button, then Arrow keys)

**Expected Results:**
- ✅ Next button advances slides smoothly
- ✅ Previous button goes backward smoothly
- ✅ Pagination dots jump to correct page
- ✅ Active dot updates correctly
- ✅ Infinite loop works seamlessly (no visible reset)
- ✅ Keyboard navigation works

### 3. Autoplay Test (1 minute)

**Steps:**
1. Load page and wait without interaction
2. Hover mouse over slider
3. Move mouse away from slider
4. Click any navigation button

**Expected Results:**
- ✅ Slider advances every 4.5 seconds automatically
- ✅ Autoplay pauses on hover
- ✅ Autoplay resumes on mouse leave
- ✅ Autoplay restarts from beginning after interaction
- ✅ Slider continues looping infinitely

### 4. Mobile/Touch Test (2 minutes)

**Steps:**
1. Resize browser to 375px width (or use mobile device)
2. Swipe left on slider
3. Swipe right on slider
4. Observe layout

**Expected Results:**
- ✅ Only 1 card visible on mobile
- ✅ Swipe left advances to next card
- ✅ Swipe right goes to previous card
- ✅ Cards are properly sized (no overflow)
- ✅ Navigation buttons still visible and functional
- ✅ Pagination dots adjust to smaller size

### 5. Responsive Test (2 minutes)

**Breakpoints to test:**
- Desktop: 1920px, 1440px, 1280px (should show 3 cards)
- Tablet: 1024px, 768px (should show 2 cards)
- Mobile: 425px, 375px, 320px (should show 1 card)

**Expected Results:**
- ✅ 3 cards on desktop (>1024px)
- ✅ 2 cards on tablet (768-1024px)
- ✅ 1 card on mobile (<768px)
- ✅ Cards resize smoothly during window resize
- ✅ No horizontal scrolling at any breakpoint
- ✅ Navigation buttons remain accessible

### 6. Independence Test (1 minute)

**Steps:**
1. Scroll to Testimonials section (if visible)
2. Interact with testimonials slider
3. Scroll back to Portfolio slider
4. Interact with portfolio slider

**Expected Results:**
- ✅ Both sliders work independently
- ✅ Portfolio navigation doesn't affect Testimonials
- ✅ Testimonials navigation doesn't affect Portfolio
- ✅ Both autoplay timers work separately
- ✅ No JavaScript console errors

### 7. Accessibility Test (2 minutes)

**Steps:**
1. Enable "Reduce motion" in OS settings
2. Tab through slider controls
3. Use screen reader (if available)

**Expected Results:**
- ✅ Autoplay disabled when reduced motion enabled
- ✅ Focus indicators visible on Tab
- ✅ Keyboard navigation works (Tab + Enter/Space)
- ✅ ARIA labels present on buttons
- ✅ Screen reader announces slider state

---

## Browser Compatibility Test Matrix

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome 100+ | ✅ Test | ✅ Test | ⬜ Not Tested |
| Firefox 100+ | ✅ Test | ✅ Test | ⬜ Not Tested |
| Safari 14+ | ✅ Test | ✅ Test | ⬜ Not Tested |
| Edge 100+ | ✅ Test | N/A | ⬜ Not Tested |

---

## Performance Test

**Steps:**
1. Open DevTools Performance tab
2. Start recording
3. Let slider auto-advance 5 times
4. Stop recording

**Expected Results:**
- ✅ Consistent 60 FPS during animations
- ✅ No layout thrashing
- ✅ Smooth GPU-accelerated transforms
- ✅ No memory leaks over time

---

## Regression Test

**Verify these work after slider integration:**
- ✅ Portfolio section header remains unchanged
- ✅ Portfolio CTA buttons still functional
- ✅ "View All Portfolio" link still works
- ✅ Portfolio card hover effects still work
- ✅ Portfolio card links clickable
- ✅ Other page sections unaffected

---

## Edge Cases

### Test: No JavaScript
1. Disable JavaScript in browser
2. Load page

**Expected:** Cards display as static grid (fallback)

### Test: Very Slow Network
1. Throttle network to Slow 3G
2. Load page

**Expected:** Slider initializes after CSS/JS load

### Test: Window Resize During Animation
1. Start slider animation
2. Resize window mid-animation

**Expected:** Animation completes, then recalculates

### Test: Rapid Button Clicks
1. Click Next button 10 times rapidly

**Expected:** `isSliding` flag prevents stacking, only one animation at a time

---

## Bug Report Template

```
**Issue:** [Brief description]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**


**Actual Behavior:**


**Browser:** [Chrome 100 / Firefox 100 / Safari 14]
**Device:** [Desktop / Tablet / Mobile]
**Screen Size:** [1920x1080 / 768x1024 / 375x667]
**Console Errors:** [Yes/No - paste if Yes]

**Screenshots:** [If applicable]
```

---

## Sign-Off Checklist

Before marking complete, verify:

- [ ] All 7 core tests passed
- [ ] Tested on at least 2 browsers
- [ ] Tested on mobile device or simulator
- [ ] No JavaScript console errors
- [ ] No layout shifting or visual glitches
- [ ] Autoplay works correctly
- [ ] Touch/swipe works on mobile
- [ ] Infinite loop is seamless
- [ ] Pagination dots sync correctly
- [ ] Independence from testimonials confirmed
- [ ] Accessibility features verified
- [ ] Performance acceptable (60fps)

---

**Test Completion Time Estimate:** 10-15 minutes for core tests  
**Full Test Suite:** 30-45 minutes including all edge cases
