document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const gameButtons = document.querySelectorAll('.button-group a.cool-button');

  if (searchInput && gameButtons.length > 0) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();

      gameButtons.forEach(button => {
        const gameName = button.textContent.toLowerCase().trim();
        if (gameName.includes(searchTerm)) {
          button.style.display = 'inline-block';
        } else {
          button.style.display = 'none';
        }
      });
    });
  }
});
