document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button[data-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});