(() => {
  // ==========================================================================
  // KONSTANTA DAN ELEMEN DOM
  // ==========================================================================
  const preloader = document.getElementById("preloader");
  const gameButtons = document.querySelectorAll(".cool-button:not(.all-games-button)"); // Tombol-tombol game
  const allGamesButton = document.querySelector(".all-games-button"); // Tombol "Akses Game Lainnya"
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const particleContainer = document.querySelector('.particles');
  const bgMusic = document.getElementById('bg-music');
  const toggleMusicButton = document.getElementById('toggleMusic');
  const searchResultsContainer = document.getElementById('searchResults');
  const allGamePrices = window.allGamePrices || []; // Ambil data harga lengkap

  const numParticles = 30;
  let isPlaying = false; // Status pemutaran musik (awal: tidak diputar)

  // ==========================================================================
  // FUNGSI-FUNGSI UTILITAS
  // ==========================================================================

  const hidePreloader = () => {
    if (preloader) {
      preloader.style.display = "none";
    }
  };

  const filterGames = () => {
    if (searchInput && gameButtons && allGamesButton && searchResultsContainer && allGamePrices) {
      const searchTerm = searchInput.value.toLowerCase().trim();
      let foundMatch = false;
      searchResultsContainer.innerHTML = ''; // Bersihkan hasil pencarian sebelumnya

      // Sembunyikan semua tombol game di halaman utama saat mencari
      gameButtons.forEach(button => {
        button.style.display = 'none';
      });

      if (searchTerm.length > 0) {
        allGamePrices.forEach(gameData => {
          if (gameData.game.toLowerCase().includes(searchTerm) || gameData.name.toLowerCase().includes(searchTerm)) {
            foundMatch = true;
            const ul = document.createElement('ul');
            ul.classList.add('price-list');
            ul.innerHTML = `<li><strong>${gameData.name}</strong></li>`;
            gameData.prices.forEach(price => {
              const li = document.createElement('li');
              li.textContent = Object.entries(price)
                .map(([key, value]) => `${value} ${key}`)
                .join(' - ');
              ul.appendChild(li);
            });
            searchResultsContainer.appendChild(ul);
          }
        });

        if (!foundMatch) {
          window.location.href = 'file/daftar-game.html?search=' + encodeURIComponent(searchTerm);
        } else {
          // Tampilkan tombol "Akses Game Lainnya" jika ada hasil pencarian
          allGamesButton.style.display = 'inline-flex';
        }
      } else {
        // Jika input pencarian kosong, tampilkan kembali semua tombol game dan sembunyikan hasil pencarian
        gameButtons.forEach(button => {
          button.style.display = 'inline-flex';
        });
        searchResultsContainer.innerHTML = '';
        allGamesButton.style.display = 'inline-flex';
      }
    }
  };

  const updatePlayPauseIcon = (playing) => {
    if (toggleMusicButton && toggleMusicButton.querySelector('i')) {
      const icon = toggleMusicButton.querySelector('i');
      icon.classList.remove(playing ? 'fa-play' : 'fa-pause');
      icon.classList.add(playing ? 'fa-pause' : 'fa-play');
    }
  };

  const createParticles = () => {
    if (particleContainer) {
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        particle.style.top = `${randomY}vh`;
        particle.style.left = `${randomX}vw`;
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.setProperty('--random-x', Math.random() - 0.5);
        particle.style.setProperty('--random-y', Math.random() - 0.5);
        particleContainer.appendChild(particle);
      }
    }
  };

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================

  window.addEventListener("load", hidePreloader);

  gameButtons.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (preloader) {
        preloader.style.display = "flex";
      }
      setTimeout(() => {
        window.location.href = href;
      }, 100);
    });
  });

  if (searchButton) {
    searchButton.addEventListener('click', filterGames);
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterGames);
  }

  if (toggleMusicButton && bgMusic) {
    toggleMusicButton.addEventListener('click', () => {
      // ... kode kontrol musik ...
    });

    document.addEventListener('click', () => {
      // ... kode autoplay musik ...
    });

    updatePlayPauseIcon(isPlaying);
  }

  // ==========================================================================
  // INISIALISASI
  // ==========================================================================

  createParticles();
})();
