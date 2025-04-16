(() => {
  // ==========================================================================
  // KONSTANTA DAN ELEMEN DOM
  // ==========================================================================
  const preloader = document.getElementById("preloader");
  const gameLinks = document.querySelectorAll(".cool-button:not(.all-games-button)"); // Tombol-tombol game (kecuali "Akses Game Lainnya")
  const allGamesButton = document.querySelector(".all-games-button"); // Tombol "Akses Game Lainnya"
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const particleContainer = document.querySelector('.particles');
  const bgMusic = document.getElementById('bg-music');
  const toggleMusicButton = document.getElementById('toggleMusic');

  const numParticles = 30;
  let isPlaying = false; // Status pemutaran musik (awal: tidak diputar)

  // ==========================================================================
  // FUNGSI-FUNGSI UTILITAS
  // ==========================================================================

  /**
   * Menyembunyikan elemen preloader.
   */
  const hidePreloader = () => {
    if (preloader) {
      preloader.style.display = "none";
    }
  };

  /**
   * Memfilter daftar game berdasarkan istilah pencarian dan mengarahkan ke daftar game jika tidak ada yang cocok.
   */
  const filterGames = () => {
    if (searchInput && gameLinks && allGamesButton) {
      const searchTerm = searchInput.value.toLowerCase().trim();
      let foundMatch = false;

      gameLinks.forEach(button => {
        const gameName = button.textContent.toLowerCase().trim();
        const isMatch = gameName.includes(searchTerm);
        button.style.display = isMatch ? 'inline-flex' : 'none';
        if (isMatch) {
          foundMatch = true;
        }
      });

      // Jika tidak ada game yang cocok, arahkan ke halaman daftar game
      if (!foundMatch && searchTerm.length > 0) {
        window.location.href = 'file/daftar-game.html?search=' + encodeURIComponent(searchTerm);
      } else if (searchTerm.length === 0) {
        // Jika input pencarian kosong, tampilkan kembali semua tombol game
        gameLinks.forEach(button => {
          button.style.display = 'inline-flex';
        });
      }
    }
  };

  /**
   * Mengubah ikon tombol play/pause.
   * @param {boolean} playing - True jika musik diputar, false jika dijeda.
   */
  const updatePlayPauseIcon = (playing) => {
    if (toggleMusicButton && toggleMusicButton.querySelector('i')) {
      const icon = toggleMusicButton.querySelector('i');
      icon.classList.remove(playing ? 'fa-play' : 'fa-pause');
      icon.classList.add(playing ? 'fa-pause' : 'fa-play');
    }
  };

  /**
   * Membuat dan menambahkan partikel untuk animasi latar belakang.
   */
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

  // Menyembunyikan preloader setelah halaman selesai dimuat
  window.addEventListener("load", hidePreloader);

  // Menambahkan preloader saat tombol game diklik sebelum navigasi
  gameLinks.forEach(link => {
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

  // Event listener untuk tombol pencarian
  if (searchButton) {
    searchButton.addEventListener('click', filterGames);
  }

  // Event listener untuk input pencarian (saat mengetik)
  if (searchInput) {
    searchInput.addEventListener('input', filterGames);
  }

  // Kontrol musik latar belakang
  if (toggleMusicButton && bgMusic) {
    toggleMusicButton.addEventListener('click', () => {
      console.log('Tombol Musik Diklik. isPlaying:', isPlaying); // Tambahkan log di sini
      if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        updatePlayPauseIcon(isPlaying);
        console.log('Musik Dijeda. isPlaying:', isPlaying); // Tambahkan log di sini
      } else {
        bgMusic.play().catch(error => {
          console.error("Gagal memutar audio:", error);
          // Mungkin tampilkan pesan ke pengguna
        });
        isPlaying = true;
        updatePlayPauseIcon(isPlaying);
        console.log('Musik Diputar. isPlaying:', isPlaying); // Tambahkan log di sini
      }
    });

    // Memutar musik saat interaksi pertama pengguna dengan halaman
    document.addEventListener('click', () => {
      if (!isPlaying) {
        bgMusic.play().catch(error => {
          console.error("Autoplay dicegah:", error);
          // Mungkin tampilkan pesan ke pengguna untuk mengklik tombol play
        });
        isPlaying = true;
        updatePlayPauseIcon(isPlaying);
        document.removeEventListener('click', arguments.callee); // Hapus listener setelah dijalankan
        console.log('Musik Diputar (Interaksi Pertama). isPlaying:', isPlaying); // Tambahkan log di sini
      }
    });

    // Set ikon awal tombol
    updatePlayPauseIcon(isPlaying);
  }

  // ==========================================================================
  // INISIALISASI
  // ==========================================================================

  // Membuat partikel latar belakang saat halaman dimuat
  createParticles();
})();
