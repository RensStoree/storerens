// =======================
// == PRELOADER HANDLER ==
// =======================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.style.display = 'none';

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (typeof loadModel === 'function') loadModel();
});

// =======================
// == MUSIC TOGGLE LOGIC ==
// =======================
const musicButton = document.getElementById('toggleMusic');
const bgMusic = document.getElementById('bg-music');

if (musicButton && bgMusic) {
  musicButton.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicButton.innerHTML = '<i class="fas fa-pause"></i>';
      showNotification('Musik diputar');
    } else {
      bgMusic.pause();
      musicButton.innerHTML = '<i class="fas fa-play"></i>';
      showNotification('Musik dijeda');
    }
  });
}

// ======================
// == NOTIFICATION LOGIC ==
// ======================
function showNotification(message) {
  const notification = document.getElementById('notification-container');
  if (!notification) return;

  notification.textContent = message;
  notification.style.display = 'block';
  notification.style.opacity = '1';

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 300);
  }, 2000);
}

// =====================
// == SEARCH FUNCTION ==
// =====================
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchIcon = document.getElementById('searchIcon');
const gameButtons = document.querySelectorAll('.logo-button');
const showGamesBtn = document.getElementById('showGamesBtn');
const logoGroup = document.querySelector('.logo-group');

function filterAndSortGames() {
  const keyword = searchInput.value.toLowerCase();
  const filteredButtons = Array.from(gameButtons).filter(btn => {
    const gameName = btn.getAttribute("title").toLowerCase();
    return gameName.includes(keyword);
  });

  // Sembunyikan semua tombol
  gameButtons.forEach(btn => {
    btn.style.display = 'none';
    btn.classList.add('hidden');
  });

  // Tampilkan dan urutkan tombol yang cocok
  filteredButtons.sort((a, b) =>
    a.getAttribute("title").localeCompare(b.getAttribute("title"))
  );

  filteredButtons.forEach(btn => {
    btn.style.display = 'inline-block';
    btn.classList.remove('hidden');
    logoGroup.appendChild(btn); // Susun ulang dalam DOM
  });

  // Feedback UI
  if (searchIcon) searchIcon.style.display = (filteredButtons.length > 0 && keyword) ? 'inline-block' : 'none';
  if (showGamesBtn) showGamesBtn.style.display = (!keyword || filteredButtons.length > 0) ? 'none' : 'inline-block';
}

if (searchInput && searchButton) {
  searchInput.addEventListener('input', filterAndSortGames);
  searchButton.addEventListener('click', filterAndSortGames);
}

// ===================
// == THEME TOGGLE ==
// ===================
const modeToggleButton = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');

function applyTheme(mode) {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${mode}-mode`);

  if (modeIcon) {
    modeIcon.classList.remove('fa-sun', 'fa-moon');
    modeIcon.classList.add(mode === 'dark' ? 'fa-moon' : 'fa-sun');
  }
}

function toggleMode() {
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  const newMode = currentMode === 'dark' ? 'light' : 'dark';
  applyTheme(newMode);
  localStorage.setItem('theme', newMode);
}

if (modeToggleButton) {
  modeToggleButton.addEventListener('click', toggleMode);
}

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// =====================
// == GAME LOADING LOGIC ==
// =====================
function loadGame(page, slug) {
  fetch(page)  // Mengambil file HTML
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.text();  // Mengambil isi halaman dalam bentuk text
    })
    .then(html => {
      // Memasukkan HTML yang dimuat ke dalam elemen dengan ID 'game-content'
      document.getElementById('game-content').innerHTML = html;
      
      // Memperbarui URL tanpa memuat ulang halaman
      history.pushState({}, '', slug);
    })
    .catch(error => {
      console.error("Error loading the game page:", error);
      // Menampilkan pesan error ke pengguna
      document.getElementById('game-content').innerHTML = "<p>Terjadi kesalahan saat memuat halaman game.</p>";
    });
}
