import './style.css'

// Language Data
let translations = {};
let currentLang = 'ru';

async function loadLanguage(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json?v=${new Date().getTime()}`);
    translations = await response.json();
    currentLang = lang;
    updateDOM();
    updateSwitcherUI();
  } catch (error) {
    console.error('Error loading language file', error);
  }
}

function updateDOM() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      // Check if it's an input placeholder or text content
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[key];
      } else {
        el.textContent = translations[key];
      }
    }
  });
}

function updateSwitcherUI() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('text-matte-gold', 'font-bold');
      btn.classList.remove('text-platinum-white', 'opacity-70');
    } else {
      btn.classList.remove('text-matte-gold', 'font-bold');
      btn.classList.add('text-platinum-white', 'opacity-70');
    }
  });
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Init default language
  loadLanguage('ru');

  // Lang switcher events
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      loadLanguage(e.target.dataset.lang);
    });
  });

  // Hide Loader on full load
  window.addEventListener('load', () => {
    const loader = document.getElementById('premium-loader');
    if (loader) {
      loader.classList.add('opacity-0');
      setTimeout(() => loader.remove(), 700);
    }
  });

  // Header Scroll Effect
  const header = document.getElementById('main-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-dark-platinum', 'border-matte-gold/40');
        header.classList.remove('bg-transparent', 'border-transparent');
      } else {
        header.classList.add('bg-transparent', 'border-transparent');
        header.classList.remove('bg-dark-platinum', 'border-matte-gold/40');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init on load
  }

  // Testimonial Slider
  const testimonialText = document.getElementById('testimonial-text');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  if (testimonialText && testimonialDots.length === 5) {
    let currentTestimonial = 1;
    setInterval(() => {
      currentTestimonial = (currentTestimonial % 5) + 1;
      testimonialText.style.opacity = 0;
      setTimeout(() => {
        testimonialText.setAttribute('data-i18n', `testimonial_${currentTestimonial}`);
        updateDOM();
        testimonialText.style.opacity = 1;
        testimonialDots.forEach((dot, index) => {
          if (index === currentTestimonial - 1) {
            dot.classList.replace('bg-white/20', 'bg-matte-gold');
          } else {
            dot.classList.replace('bg-matte-gold', 'bg-white/20');
          }
        });
      }, 300);
    }, 4000);
  }

  // CRM Trigger (Placeholder)
  document.querySelectorAll('.crm-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('CRM Booking Widget Triggered!');
    });
  });

  // Full Price List Toggle
  const toggleBtn = document.getElementById('toggle-price-list');
  const extendedMenu = document.getElementById('extended-menu');
  if (toggleBtn && extendedMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (extendedMenu.classList.contains('hidden')) {
        extendedMenu.classList.remove('hidden');
        setTimeout(() => {
          extendedMenu.classList.remove('opacity-0');
        }, 10);
      } else {
        extendedMenu.classList.add('opacity-0');
        setTimeout(() => {
          extendedMenu.classList.add('hidden');
        }, 500);
      }
    });
  }

  // Map Modal Logic
  const mapModal = document.getElementById('map-modal');
  const openMapBtn = document.getElementById('open-map-modal');
  const open2gisBtn = document.getElementById('open-2gis-modal');
  const closeMapBtn = document.getElementById('close-map-modal');
  const mapContainer = document.getElementById('map-container');

  const showModal = (iframeHtml) => {
    if (!mapModal) return;
    mapContainer.innerHTML = iframeHtml;
    mapModal.classList.remove('hidden');
    mapModal.classList.add('flex');
  };
  // Modals logic has been removed for map, as they are now native links
});
