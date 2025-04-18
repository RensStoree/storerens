// ===============================
// == VALIDASI INPUT ID GAME ==
// ===============================

// Fungsi untuk mengecek apakah string hanya berisi angka
function isNumeric(str) {
  return /^\d+$/.test(str);
}

// Fungsi validasi ID game
function validateGameId() {
  const gameIdInput = document.getElementById("gameId");
  const gameId = gameIdInput.value.trim();
  const errorIcon = document.getElementById("gameIdError");
  const errorMessage = document.getElementById("gameIdErrorMessage");

  if (gameId.length < 8 || !isNumeric(gameId)) {
    gameIdInput.classList.add("invalid");
    gameIdInput.classList.remove("valid");
    errorIcon.style.display = "inline";
    errorMessage.style.display = "block";
    return false;
  } else {
    gameIdInput.classList.remove("invalid");
    gameIdInput.classList.add("valid");
    errorIcon.style.display = "none";
    errorMessage.style.display = "none";
    return true;
  }
}

// Batasi input hanya angka dan maksimal 8 digit
document.getElementById("gameId").addEventListener("input", function (e) {
  let val = e.target.value.replace(/\D/g, ""); // Hanya angka
  if (val.length > 8) val = val.slice(0, 8);   // Maksimal 8 digit
  e.target.value = val;
  validateGameId();
});


// ===============================
// == PILIHAN NOMINAL TOP UP ==
// ===============================

// Inisialisasi fungsi untuk mengambil nominal yang dipilih
function getSelectedNominal() {
  const buttons = document.querySelectorAll(".nominal-button");
  let selectedNominal = null;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedNominal = button.innerText;
    });
  });

  // Fungsi yang akan digunakan untuk mengambil nilai terpilih
  return () => {
    const selected = document.querySelector(".nominal-button.selected");
    return selected ? selected.innerText : null;
  };
}

const getNominal = getSelectedNominal();


// ===============================
// == PILIHAN METODE PEMBAYARAN ==
// ===============================

function getSelectedPaymentMethod() {
  const radios = document.getElementsByName("paymentMethod");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return null;
}


// ===============================
// == PROSES TOP UP ==
// ===============================

function prosesTopUp() {
  const validId = validateGameId();
  const nominal = getNominal();
  const payment = getSelectedPaymentMethod();
  const gameId = document.getElementById("gameId").value;

  if (!validId) {
    alert("Masukkan ID yang valid (minimal 8 angka).");
    return;
  }

  if (!nominal) {
    alert("Pilih nominal top up terlebih dahulu.");
    return;
  }

  if (!payment) {
    alert("Pilih metode pembayaran terlebih dahulu.");
    return;
  }

  alert(`Top Up Berhasil!\n\nID: ${gameId}\nNominal: ${nominal}\nPembayaran: ${payment}`);
}
