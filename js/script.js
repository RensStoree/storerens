// =========================
// == PRELOADER HANDLER ==
// =========================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.style.display = 'none';

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (typeof loadModel === 'function') loadModel();
});

// ===========================
// == MUSIC TOGGLE LOGIC ==
// ===========================
window.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
    const playMusic = () => {
      bgMusic.play().then(() => {
        console.log("Musik diputar otomatis");
      }).catch((e) => {
        console.warn("Autoplay diblokir oleh browser:", e);
      });
    };

    document.body.addEventListener('click', playMusic, { once: true });
  }
});

// ===========================
// == NOTIFICATION FUNCTION ==
// ===========================
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

// =======================
// == SEARCH FUNCTIONALITY ==
// =======================
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchIcon = document.getElementById('searchIcon');
const gameButtons = document.querySelectorAll('.logo-button');
const showGamesBtn = document.getElementById('showGamesBtn');
const logoGroup = document.querySelector('.logo-group');

function highlightKeyword(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function filterAndSortGames() {
  const keyword = searchInput.value.toLowerCase();
  const filteredButtons = Array.from(gameButtons).filter(btn => {
    const gameName = btn.getAttribute("title").toLowerCase();
    return gameName.includes(keyword);
  });

  // Reset all game buttons
  gameButtons.forEach(btn => {
    btn.style.display = 'none';
    btn.classList.add('hidden');

    // Menyimpan gambar dan memperbarui nama game
    const gameImg = btn.querySelector('img'); // Mendapatkan elemen gambar
    const originalText = btn.getAttribute("title");
    
    // Reset innerHTML untuk mengembalikan gambar dan nama game
    btn.innerHTML = '';
    btn.appendChild(gameImg); // Menambahkan gambar kembali ke tombol
    btn.innerHTML += `<span>${originalText}</span>`; // Menambahkan nama game
  });

  // Sort the filtered buttons alphabetically
  filteredButtons.sort((a, b) =>
    a.getAttribute("title").localeCompare(b.getAttribute("title"))
  );

  // Show filtered and sorted buttons
  filteredButtons.forEach(btn => {
    btn.style.display = 'inline-block';
    btn.classList.remove('hidden');
    const gameImg = btn.querySelector('img'); // Mendapatkan gambar
    const originalText = btn.getAttribute("title");
    const highlighted = highlightKeyword(originalText, keyword);
    btn.innerHTML = '';
    btn.appendChild(gameImg); // Menambahkan gambar kembali ke tombol
    btn.innerHTML += `<span>${highlighted}</span>`; // Menambahkan teks yang disorot
    logoGroup.appendChild(btn);
  });

  // Control the visibility of the search icon and the 'show more' button
  if (searchIcon) searchIcon.style.display = (filteredButtons.length > 0 && keyword) ? 'inline-block' : 'none';
  if (showGamesBtn) showGamesBtn.style.display = (!keyword || filteredButtons.length > 0) ? 'none' : 'inline-block';
}

if (searchInput && searchButton) {
  searchInput.addEventListener('input', filterAndSortGames);
  searchButton.addEventListener('click', filterAndSortGames);
}

// =====================
// == THEME TOGGLER ==
// =====================
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

// ========================
// == DISABLE RIGHT CLICK ==
// ========================
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// ============================
// == GAME LOADING FUNCTION ==
// ============================;

function loadGame(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById("main-content").style.display = "none";

      const gameContent = document.getElementById("game-content");
      gameContent.innerHTML = data;
      gameContent.style.display = "block";
      window.scrollTo(0, 0);

      const scripts = gameContent.querySelectorAll("script");
      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = false;
        } else {
          newScript.textContent = oldScript.textContent;
        }

        oldScript.replaceWith(newScript);
      });
    });
}
