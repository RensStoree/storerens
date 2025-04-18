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



  async function fetchVariant(code) {
    const BASE_URL = "https://www.bakulvouchergame.com/id-id"; // Ganti dengan URL asli
    const API_KEY = "8f107d34-3303-42b6-aa69-17f584745a58"; // Ganti dengan API key kamu
    try {
      const response = await fetch(`${BASE_URL}/api/v3/variant`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: code })
      });
      if (!response.ok) throw new Error("Gagal mengambil data!");
      const data = await response.json();
      console.log("Response:", data);
      // Tampilkan notifikasi (jika ada container notifikasi)
      const notification = document.getElementById("notification-container");
      notification.innerText = JSON.stringify(data, null, 2);
      notification.style.display = "block";

    } catch (error) {
      console.error("Error:", error);
    }
  }


