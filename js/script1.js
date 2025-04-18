// script1.js

function isNumeric(str) {
  return /^\d+$/.test(str);
}

function validateGameId() {
  const gameIdInput = document.getElementById("gameId");
  const gameId = gameIdInput.value.trim();
  const errorIcon = document.getElementById("gameIdError");
  const errorMessage = document.getElementById("gameIdErrorMessage");

  // Allow only numeric input and show symbol if it's invalid
  if (gameId.length < 8 || !isNumeric(gameId)) {
    gameIdInput.classList.remove("valid");
    gameIdInput.classList.add("invalid");
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

// Prevent non-numeric characters from being entered and limit to 8 digits
document.getElementById("gameId").addEventListener("input", function (event) {
  const gameIdInput = event.target;
  let validValue = gameIdInput.value.replace(/\D/g, '');  // Replace non-digits with an empty string
  
  // Limit the input to 8 digits
  if (validValue.length > 8) {
    validValue = validValue.substring(0, 8);
  }

  gameIdInput.value = validValue;  // Update the input with only numeric values
  validateGameId();  // Revalidate the game ID after the input change
});

// Fungsi untuk mendeteksi nominal terpilih
function getSelectedNominal() {
  const allButtons = document.querySelectorAll(".nominal-button");
  let selected = null;

  allButtons.forEach(button => {
    button.addEventListener("click", () => {
      allButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
      selected = button.innerText;
    });
  });

  return () => {
    const chosen = document.querySelector(".nominal-button.selected");
    return chosen ? chosen.innerText : null;
  };
}

const getNominal = getSelectedNominal();

// Fungsi untuk ambil metode pembayaran
function getSelectedPaymentMethod() {
  const radios = document.getElementsByName("paymentMethod");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return null;
}

// Fungsi utama
function prosesTopUp() {
  const validId = validateGameId();
  const nominal = getNominal();
  const paymentMethod = getSelectedPaymentMethod();

  if (!validId) {
    alert("Masukkan ID yang valid (minimal 8 angka).");
    return;
  }

  if (!nominal) {
    alert("Pilih nominal top up terlebih dahulu.");
    return;
  }

  if (!paymentMethod) {
    alert("Pilih metode pembayaran terlebih dahulu.");
    return;
  }

  alert(`Top Up Berhasil!\n\nID: ${document.getElementById("gameId").value}\nNominal: ${nominal}\nPembayaran: ${paymentMethod}`);
}
