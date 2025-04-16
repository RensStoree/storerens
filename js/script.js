document.addEventListener('DOMContentLoaded', () => {
  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.display = 'none';
    });
  }

  // --- Pencarian Game ---
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchIcon = document.getElementById('searchIcon');
  const gameListContainer = document.querySelector('.game-list');
  const gameButtons = gameListContainer ? gameListContainer.querySelectorAll('.cool-button') : [];

  if (searchInput && searchButton && searchIcon && gameButtons.length > 0) {
    searchButton.addEventListener('click', () => {
      filterGames(searchInput.value.toLowerCase().trim());
    });

    searchInput.addEventListener('input', () => {
      filterGames(searchInput.value.toLowerCase().trim());
    });

    const filterGames = (searchTerm) => {
      let found = false;
      gameButtons.forEach(button => {
        const gameName = button.textContent.toLowerCase().trim();
        if (gameName.includes(searchTerm)) {
          button.style.display = 'inline-block';
          found = true;
        } else {
          button.style.display = 'none';
        }
      });
      searchIcon.style.display = searchTerm !== '' && found ? 'inline' : 'none';
    };
  }

  // --- Filter Kategori ---
  const categoryButtons = document.querySelectorAll('.category-button');
  if (categoryButtons.length > 0 && gameListContainer && gameButtons.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.dataset.category;

        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        gameButtons.forEach(gameButton => {
          const gameCategories = gameButton.dataset.category ? gameButton.dataset.category.split(' ') : [];
          if (category === 'all' || gameCategories.includes(category)) {
            gameButton.style.display = 'inline-block';
          } else {
            gameButton.style.display = 'none';
          }
        });
      });
    });

    // Set kategori 'Semua' aktif secara default
    const allCategoryButton = document.querySelector('.category-button[data-category="all"]');
    if (allCategoryButton) {
      allCategoryButton.classList.add('active');
    }
  }

  // --- Favorit Game ---
  const favoriteButtons = document.querySelectorAll('.favorite-button');
  const favoriteGamesButton = document.getElementById('favoriteGamesButton');
  const favoriteGamesList = document.getElementById('favoriteGamesList');
  const favoriteGamesContainer = document.getElementById('favoriteGamesContainer');
  const favoriteCountSpan = document.getElementById('favoriteCount');
  let favoriteGames = JSON.parse(localStorage.getItem('favoriteGames')) || [];

  const updateFavoriteCount = () => {
    favoriteCountSpan.textContent = favoriteGames.length;
  };

  const renderFavoriteGames = () => {
    favoriteGamesContainer.innerHTML = '';
    if (favoriteGames.length > 0) {
      favoriteGames.forEach(gameName => {
        const gameLink = document.createElement('a');
        gameLink.href = `harga.html?game=${gameName.toLowerCase().replace(/ /g, '')}#${gameName.toLowerCase().replace(/ /g, '')}`;
        gameLink.classList.add('cool-button', 'favorite-game-item');
        gameLink.textContent = gameName;
        favoriteGamesContainer.appendChild(gameLink);
      });
      favoriteGamesList.style.display = 'block';
    } else {
      favoriteGamesList.style.display = 'none';
    }
    updateFavoriteCount();
  };

  const toggleFavorite = (gameName, button) => {
    const index = favoriteGames.indexOf(gameName);
    if (index > -1) {
      favoriteGames.splice(index, 1);
      button.classList.remove('favorited');
      showNotification(`${gameName} dihapus dari favorit.`);
    } else {
      favoriteGames.push(gameName);
      button.classList.add('favorited');
      showNotification(`${gameName} ditambahkan ke favorit!`);
    }
    localStorage.setItem('favoriteGames', JSON.stringify(favoriteGames));
    renderFavoriteGames();
  };

  if (favoriteButtons.length > 0 && favoriteGamesButton && favoriteGamesList && favoriteGamesContainer && favoriteCountSpan) {
    favoriteButtons.forEach(button => {
      const gameName = button.dataset.gameName;
      if (favoriteGames.includes(gameName)) {
        button.classList.add('favorited');
      }
      button.addEventListener('click', function(event) {
        event.preventDefault();
        toggleFavorite(gameName, this);
      });
    });

    favoriteGamesButton.addEventListener('click', (event) => {
      event.preventDefault();
      favoriteGamesList.style.display = favoriteGamesList.style.display === 'none' ? 'block' : 'none';
    });

    renderFavoriteGames(); // Initial render
  }

  // --- Notifikasi ---
  const notificationContainer = document.getElementById('notification-container');
  const showNotification = (message) => {
    if (notificationContainer) {
      notificationContainer.textContent = message;
      notificationContainer.style.display = 'block';
      setTimeout(() => {
        notificationContainer.style.display = 'none';
      }, 2000); // Notifikasi hilang setelah 2 detik
    }
  };

  // --- Tombol Musik ---
  const toggleMusicButton = document.getElementById('toggleMusic');
  const backgroundMusic = document.getElementById('bg-music');
  let isPlaying = false;

  if (toggleMusicButton && backgroundMusic) {
    toggleMusicButton.addEventListener('click', () => {
      if (isPlaying) {
        backgroundMusic.pause();
        toggleMusicButton.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        backgroundMusic.play();
        toggleMusicButton.innerHTML = '<i class="fas fa-pause"></i>';
      }
      isPlaying = !isPlaying;
    });
  }
});
