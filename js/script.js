(() => {
  // ==========================================================================
  // KONSTANTA DAN ELEMEN DOM
  // ==========================================================================
  const preloader = document.getElementById("preloader");
  const gameButtons = document.querySelectorAll(".cool-button:not(.all-games-button)"); // Tombol-tombol game
  const searchInput = document.getElementById("searchInput");
  const searchResultsContainer = document.getElementById('searchResultsContainer'); // Dapatkan kontainer hasil pencarian
  const toggleMusicButton = document.getElementById('toggleMusic');
  const bgMusic = document.getElementById('bg-music');
  // Contoh data game (ganti dengan data game Anda yang sebenarnya)
  const allGamePrices = [
    { name: "Free Fire", url: "harga.html?game=freefire#freefire", game: "free fire" },
    { name: "Call of Duty", url: "harga.html?game=codm#codm", game: "call of duty" },
    { name: "Super Sus", url: "harga.html?game=supersus#supersus", game: "super sus" },
    { name: "Mobile Legends", url: "harga.html?game=mlbb#mlbb", game: "mobile legends" },
    { name: "PUBG Mobile", url: "harga.html?game=pubgm#pubgm", game: "pubg mobile" },
    { name: "PUBG : New State Mobile", url: "harga.html?game=pubgns#pubgns", game: "pubg : new state mobile" },
    { name: "One Punch Man : The Strongest", url: "#", game: "one punch man : the strongest" },
    { name: "One Punch Man : World", url: "#", game: "one punch man : world" },
    { name: "Pokemon Unite", url: "#", game: "pokemon unite" },
    { name: "Honor of Kings", url: "#", game: "honor of kings" },
    { name: "Ragnarok Origin", url: "#", game: "ragnarok origin" },
    { name: "Mobile Legends : Adventure", url: "#", game: "mobile legends : adventure" },
    { name: "Ragnarok Origin : ROO", url: "#", game: "ragnarok origin : roo" },
    // Tambahkan data game lainnya di sini
  ];

  let isPlaying = false; // Status pemutaran musik (awal: tidak diputar)

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

  const displaySearchResults = (results) => {
    searchResultsContainer.innerHTML = ''; // Bersihkan hasil sebelumnya
    if (results.length > 0) {
      const ul = document.createElement('ul');
      results.forEach(game => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = game.url; // Atur URL yang sesuai untuk setiap game
        link.textContent = game.name;
        li.appendChild(link);
        ul.appendChild(li);
      });
      searchResultsContainer.appendChild(ul);
      searchResultsContainer.style.display = 'block'; // Tampilkan kontainer hasil
    } else {
      searchResultsContainer.style.display = 'none'; // Sembunyikan jika tidak ada hasil
    }
  };

  const filterGames = (searchTerm) => {
    if (!searchTerm.trim()) {
      searchResultsContainer.innerHTML = '';
      searchResultsContainer.style.display = 'none';
      return [];
    }

    const results = allGamePrices.filter(gameData =>
      gameData.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(gameData => ({
      name: gameData.name,
      url: gameData.url
    }));

    return results;
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

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value;
      const results = filterGames(searchTerm);
      displaySearchResults(results);
    });

    searchInput.addEventListener('focus', function() {
      const searchTerm = searchInput.value;
      if (searchTerm.trim()) {
        const results = filterGames(searchTerm);
        displaySearchResults(results);
      } else {
        searchResultsContainer.style.display = 'none';
      }
    });

    searchInput.addEventListener('blur', function() {
      // Sembunyikan hasil pencarian saat input kehilangan fokus (opsional)
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
        bgMusic.play();
      }
      isPlaying = !isPlaying;
      updatePlayPauseIcon(isPlaying);
    });

    document.addEventListener('click', () => {
      if (!isPlaying) {
        bgMusic.play().catch(error => {
          console.warn("Autoplay dicegah oleh browser:", error);
          // Tambahkan logika untuk menampilkan pesan kepada pengguna jika autoplay gagal
        });
        isPlaying = true;
        updatePlayPauseIcon(isPlaying);
      }
    });

    updatePlayPauseIcon(isPlaying);
  }
})();
