const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const topNav = document.querySelector('.top-nav');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
    }
  });
});

// Light transparency on nav when scrolling
if (topNav) {
  const handleNavTransparency = () => {
    if (window.scrollY > 12) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavTransparency);
  handleNavTransparency();
}

// Include section preview swap
const includeCards = document.querySelectorAll('.include-card');
const includePreview = document.getElementById('include-preview-img');
const includeDots = document.querySelectorAll('.include-dots .dot');

if (includeCards.length && includePreview) {
  includeCards.forEach((card) => {
    card.addEventListener('click', () => {
      includeCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const img = card.getAttribute('data-img');
      if (img) {
        includePreview.src = img;
        includePreview.alt = `${card.getAttribute('aria-label')} preview`;
      }

      if (includeDots.length) {
        includeDots.forEach((dot) => dot.classList.remove('active'));
        const idx = Array.from(includeCards).indexOf(card);
        if (idx >= 0 && includeDots[idx]) {
          includeDots[idx].classList.add('active');
        }
      }
    });
  });
}

// Reviews carousel navigation
const reviewsGrid = document.getElementById('reviews-grid');
const reviewPrev = document.getElementById('review-prev');
const reviewNext = document.getElementById('review-next');

if (reviewsGrid && reviewPrev && reviewNext) {
  let currentIndex = 0;
  const reviewCards = reviewsGrid.querySelectorAll('.review-card');
  const totalCards = reviewCards.length;

  const getCardsPerView = () => {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 4;
  };

  const updateCarousel = () => {
    if (totalCards === 0) return;
    
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    // Clamp currentIndex to valid range
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    }
    
    // Calculate card width - each card takes up 1/cardsPerView of container minus gaps
    const containerWidth = reviewsGrid.parentElement.offsetWidth;
    const totalGaps = (cardsPerView - 1) * 16; // 16px gap between cards
    const cardWidth = (containerWidth - totalGaps) / cardsPerView;
    const translateX = -currentIndex * (cardWidth + 16); // card width + gap
    reviewsGrid.style.transform = `translateX(${translateX}px)`;

    // Update button states
    reviewPrev.disabled = currentIndex === 0;
    reviewNext.disabled = currentIndex >= maxIndex;
  };

  const handleResize = () => {
    updateCarousel();
  };

  reviewPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  reviewNext.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener('resize', handleResize);
  
  // Initialize - use requestAnimationFrame to ensure layout is complete
  requestAnimationFrame(() => {
    updateCarousel();
  });
}


