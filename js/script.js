document.addEventListener("DOMContentLoaded", function () {
  // -------------------- Preloader --------------------
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.display = "none";
    });
  }

  // -------------------- Pencarian (Halaman Utama) - MODIFIKASI --------------------
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const gameListContainer = document.getElementById("gameListContainer");
  const gameCards = gameListContainer ? gameListContainer.querySelectorAll(".game-card") : [];

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase();
      localStorage.setItem("searchQuery", query); // Simpan kata kunci pencarian
      window.location.href = "../file/game.html"; // Arahkan ke index2.html
    });

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      gameCards.forEach((card) => {
        const gameName = card.querySelector("h3").textContent.toLowerCase();
        const match = gameName.includes(query);
        card.style.display = match ? "block" : "none";
      });
    });
  }

  // -------------------- Filter Kategori (Halaman Utama) --------------------
  const categoryButtons = document.querySelectorAll(".category-button");
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selected = btn.getAttribute("data-category");
      gameCards.forEach((card) => {
        const categories = card.getAttribute("data-category");
        card.style.display =
          selected === "all" || (categories && categories.includes(selected))
            ? "block"
            : "none";
      });
    });
  });

  // -------------------- Favorit (Halaman Utama) --------------------
  const favoriteGamesButton = document.getElementById("favoriteGamesButton");
  const favoriteGamesList = document.getElementById("favoriteGamesList");
  const favoriteContainer = document.getElementById("favoriteGamesContainer");
  const favoriteCount = document.getElementById("favoriteCount");
  const notificationContainer = document.getElementById("notification-container");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function updateFavorites() {
    if (favoriteContainer) {
      favoriteContainer.innerHTML = "";
      favorites.forEach((name) => {
        const div = document.createElement("div");
        div.className = "cool-button";
        div.textContent = name;
        favoriteContainer.appendChild(div);
      });
    }
    if (favoriteCount) {
      favoriteCount.textContent = favorites.length;
    }
  }

  const favoriteButtons = document.querySelectorAll(".game-card .favorite-button");
  favoriteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const gameCard = button.closest('.game-card');
      const gameName = gameCard.getAttribute("data-game-name");
      if (gameName && !favorites.includes(gameName)) {
        favorites.push(gameName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavorites();
        showNotification(`${gameName} ditambahkan ke favorit!`);
      } else if (gameName && favorites.includes(gameName)) {
        favorites = favorites.filter(name => name !== gameName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavorites();
        showNotification(`${gameName} dihapus dari favorit!`);
      }
    });
  });

  if (favoriteGamesButton) {
    favoriteGamesButton.addEventListener("click", () => {
      if (favoriteGamesList) {
        favoriteGamesList.style.display =
          favoriteGamesList.style.display === "none" ? "block" : "none";
      }
    });
  }

  function showNotification(msg) {
    if (notificationContainer) {
      notificationContainer.textContent = msg;
      notificationContainer.style.display = "block";
      setTimeout(() => {
        notificationContainer.style.display = "none";
      }, 3000);
    }
  }

  updateFavorites();

  // -------------------- Tombol Musik (Semua Halaman) --------------------
  const musicButton = document.getElementById("toggleMusic");
  const bgMusic = document.getElementById("bg-music");
  let isPlaying = false;

  if (musicButton && bgMusic) {
    musicButton.addEventListener("click", () => {
      if (!isPlaying) {
        bgMusic.play().catch(error => console.error("Gagal memutar musik:", error));
        musicButton.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        bgMusic.pause();
        musicButton.innerHTML = '<i class="fas fa-play"></i>';
      }
      isPlaying = !isPlaying;
    });

    window.addEventListener('load', () => {
      const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
      if (isMusicPlaying) {
        bgMusic.play().catch(error => console.error("Gagal memutar musik saat load:", error));
        musicButton.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
      } else {
        bgMusic.pause();
        musicButton.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
      }
    });

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('musicPlaying', isPlaying);
    });
  }

  // -------------------- Mode Gelap/Terang (Semua Halaman) --------------------
  const toggleMode = document.getElementById("toggleMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let currentMode = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");

  function applyMode(mode) {
    if (mode === "light") {
      document.body.classList.add("light-mode");
      if (toggleMode) {
        toggleMode.innerHTML = '<i class="fas fa-moon"></i>';
      }
    } else {
      document.body.classList.remove("light-mode");
      if (toggleMode) {
        toggleMode.innerHTML = '<i class="fas fa-sun"></i>';
      }
    }
    localStorage.setItem("theme", mode);
  }

  if (toggleMode) {
    toggleMode.addEventListener("click", () => {
      currentMode = currentMode === "dark" ? "light" : "dark";
      applyMode(currentMode);
    });
  }

  applyMode(currentMode); // Terapkan mode yang disimpan atau default saat halaman dimuat

  // -------------------- Tombol Top Up (Halaman Utama) --------------------
  const topUpButtons = document.querySelectorAll('.game-card .game-actions .cool-button');

  topUpButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Mencegah aksi default dari link
      const gameCard = this.closest('.game-card');
      const gameName = gameCard.querySelector('h3').textContent;
      const topUpLink = this.getAttribute('href');

      console.log(`Tombol Top Up diklik untuk game: ${gameName}`);
      console.log(`Link Top Up: ${topUpLink}`);
      window.location.href = topUpLink; // Arahkan ke halaman top up
    });
  });

  // -------------------- Tombol Beli Sekarang (Halaman Top Up Free Fire - ff.html) --------------------
  const buyNowButtonsFF = document.querySelectorAll('.container .button'); // Selector untuk tombol utama di ff.html

  buyNowButtonsFF.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Mencegah aksi default dari link

      const gameIdInput = document.getElementById('gameId');
      const gameId = gameIdInput ? gameIdInput.value : 'ID tidak ditemukan';

      console.log('Tombol Beli Sekarang (FF) Diklik:');
      console.log('ID Game:', gameId);
      alert(`Anda akan melakukan pembelian dengan ID Game: ${gameId}`);
      // Tambahkan logika spesifik untuk pembelian Free Fire di sini
      // window.location.href = '/konfirmasi-ff?id=' + gameId;
    });
  });

  // -------------------- Tombol Beli Sekarang (Link Harga di Halaman Top Up Free Fire - ff.html) --------------------
  const priceLinksFF = document.querySelectorAll('.container .price-link');

  priceLinksFF.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Mencegah aksi default dari link

      const itemName = this.querySelector('span:first-child').textContent;
      const price = this.querySelector('.symbol').textContent;
      const linkHref = this.getAttribute('href');
      const gameIdInput = document.getElementById('gameId');
      const gameId = gameIdInput ? gameIdInput.value : 'ID tidak ditemukan';

      console.log('Link Harga (FF) Diklik:');
      console.log('Item:', itemName);
      console.log('Harga:', price);
      console.log('Link:', linkHref);
      console.log('ID Game:', gameId);
      alert(`Anda memilih untuk membeli ${itemName} seharga ${price} dengan ID Game: ${gameId}. Link: ${linkHref}`);
      // Tambahkan logika untuk menangani klik pada link harga
      // window.location.href = linkHref + '&id=' + gameId;
    });
  });
});
