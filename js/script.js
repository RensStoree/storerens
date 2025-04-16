(() => {
  // ==========================================================================
  // KONSTANTA DAN ELEMEN DOM
  // ==========================================================================
  const preloader = document.getElementById("preloader");
  const gameButtons = document.querySelectorAll(".cool-button:not(.all-games-button)");
  const searchInput = document.getElementById("searchInput");
  const searchResultsContainer = document.getElementById('searchResultsContainer');
  const toggleMusicButton = document.getElementById('toggleMusic');
  const bgMusic = document.getElementById('bg-music');
  const initialGameButtons = Array.from(document.querySelectorAll('.button-group:first-child .cool-button')).map(button => ({
    name: button.textContent.trim(),
    url: button.getAttribute('href')
  }));

  let isPlaying = false;
  let searchTimeout;
  let allGamesData = [...initialGameButtons]; // Inisialisasi dengan tombol game di halaman utama

  // ==========================================================================
  // FUNGSI-FUNGSI UTILITAS
  // ==========================================================================

  const hidePreloader = () => {
    if (preloader) {
      preloader.style.display = "none";
    }
  };

  const updatePlayPauseIcon = (playing) => {
    if (toggleMusicButton && toggleMusicButton.querySelector('i')) {
      const icon = toggleMusicButton.querySelector('i');
      icon.classList.remove(playing ? 'fa-play' : 'fa-pause');
      icon.classList.add(playing ? 'fa-pause' : 'fa-play');
    }
  };

  const displaySearchResults = (results, searchTerm) => {
    if (!searchResultsContainer) return;

    searchResultsContainer.innerHTML = '';
    if (results.length > 0) {
      const ul = document.createElement('ul');
      const regex = new RegExp(searchTerm, 'gi');
      results.forEach(game => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        const highlightedName = game.name.replace(regex, '<mark>$&</mark>');
        link.href = game.url;
        link.innerHTML = highlightedName;
        li.appendChild(link);
        ul.appendChild(li);
      });
      searchResultsContainer.appendChild(ul);
      searchResultsContainer.style.display = 'block';
    } else {
      searchResultsContainer.style.display = 'none';
    }
  };

  const filterGames = (searchTerm) => {
    if (!searchTerm.trim()) {
      if (searchResultsContainer) {
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.style.display = 'none';
      }
      return [];
    }

    const results = allGamesData.filter(gameData =>
      gameData.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return results;
  };

  const fetchOtherGames = async () => {
    try {
      const response = await fetch('file/daftar-game.html');
      if (!response.ok) {
        console.error('Gagal mengambil daftar game lainnya:', response.status);
        return;
      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const gameList = doc.querySelectorAll('.button-group a.cool-button');

      const otherGames = Array.from(gameList).map(link => ({
        name: link.textContent.trim(),
        url: link.getAttribute('href')
      }));

      // Gabungkan dengan data game dari halaman utama
      allGamesData = [...initialGameButtons, ...otherGames];
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil daftar game lainnya:', error);
    }
  };

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================

  window.addEventListener("load", async () => {
    hidePreloader();
    await fetchOtherGames(); // Ambil data game lainnya saat halaman dimuat

    // Menampilkan semua hasil game saat halaman dimuat (termasuk dari daftar game)
    if (searchInput) {
      displaySearchResults(allGamesData, '');
    }
  });

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

  if (searchInput && searchResultsContainer) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchTerm = searchInput.value;
        const results = filterGames(searchTerm);
        displaySearchResults(results, searchTerm);
      }, 200);
    });

    searchInput.addEventListener('focus', function() {
      const searchTerm = searchInput.value;
      if (searchTerm.trim()) {
        const results = filterGames(searchTerm);
        displaySearchResults(results, searchTerm);
      }
    });

    searchInput.addEventListener('blur', function() {
      setTimeout(() => {
        searchResultsContainer.style.display = 'none';
      }, 200);
    });
  }

  if (toggleMusicButton && bgMusic) {
    toggleMusicButton.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
      } else {
        bgMusic.play().catch(error => {
          console.warn("Autoplay dicegah oleh browser:", error);
        });
      }
      isPlaying = !isPlaying;
      updatePlayPauseIcon(isPlaying);
    });

    document.addEventListener('click', () => {
      if (!isPlaying) {
        bgMusic.play().catch(error => {
          console.warn("Autoplay dicegah oleh browser:", error);
        });
        isPlaying = true;
        updatePlayPauseIcon(isPlaying);
      }
    });

    updatePlayPauseIcon(isPlaying);
  }
})();
