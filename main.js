document.getElementById('copy-link-button').addEventListener('click', function () {
    const url = window.location.href;
  
    // Use the Clipboard API
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  });

// Preload all scrollytelling images on load
window.addEventListener('DOMContentLoaded', () => {
  const imageElements = document.querySelectorAll('.scrollytelling-image');

  imageElements.forEach(imgEl => {
    const src = imgEl.getAttribute('src');
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
});
  
// Button scroll logic
function scrollToImage(direction) {
  const images = Array.from(document.querySelectorAll('.g-image'));
  const currentScroll = window.scrollY;

  const target = direction === 'down'
    ? images.find(img => img.getBoundingClientRect().top + window.scrollY > currentScroll + 10)
    : [...images].reverse().find(img => img.getBoundingClientRect().top + window.scrollY < currentScroll - 10);

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

document.getElementById('nav-down').addEventListener('click', () => {
  scrollToImage('down');
});

document.getElementById('nav-up').addEventListener('click', () => {
  scrollToImage('up');
});

// MULTI-SCROLLY LOGIC
document.querySelectorAll('.scrollytelling-container').forEach(container => {
  const images = container.querySelectorAll('.scrollytelling-image');
  const steps = container.querySelectorAll('.scrollytelling-step');

  // Activate the first image on load
  const firstImageName = steps[0].getAttribute('data-image');
  images.forEach(img => {
    const isMatch = img.getAttribute('data-image') === firstImageName;
    img.classList.toggle('active', isMatch);
  });

  // Create observer for this container's steps
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newImageName = entry.target.getAttribute('data-image');
          images.forEach(img => {
            const isMatch = img.getAttribute('data-image') === newImageName;
            img.classList.toggle('active', isMatch);
          });
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  steps.forEach(step => observer.observe(step));
});



// Copy Link
window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("copy-link-button");
  const msg = document.getElementById("copy-message");

  button.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      msg.style.opacity = 1;

      setTimeout(() => {
        msg.style.opacity = 0;
      }, 2000);
    });
  });
});
