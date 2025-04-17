document.addEventListener("DOMContentLoaded", function () {
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  const gameIdInput = document.getElementById('gameId');
  const gameIdFromURL = getParameterByName('id');
  if (gameIdInput && gameIdFromURL) {
    gameIdInput.value = gameIdFromURL;
  }

  // Validasi ID Game: hanya angka dan maksimal 8 digit
  gameIdInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 8);
  });

  const nominalButtons = document.querySelectorAll('.nominal-button');
  const selectedNominalInput = document.getElementById('selectedNominal');
  const paymentOptions = document.querySelectorAll('.payment-methods .payment-option');
  let selectedPaymentMethod = null;
  let selectedPrice = null;
  let selectedNominalText = null; // Tambahkan variabel untuk menyimpan teks nominal

  nominalButtons.forEach(button => {
    button.addEventListener('click', function () {
      nominalButtons.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');

      // Ambil teks lengkap dari tombol sebagai nominal
      selectedNominalText = this.innerText.split('\n')[0];
      selectedNominalInput.value = selectedNominalText;

      // Ambil harga dari elemen <small> di dalamnya
      const priceElement = this.querySelector('small');
      if (priceElement) {
        const priceText = priceElement.innerText.replace('Rp ', '').replace(/\./g, '');
        selectedPrice = priceText;
      } else {
        selectedPrice = null; // Reset harga jika tidak ditemukan
      }
    });
  });

  paymentOptions.forEach(option => {
    option.addEventListener('click', function () {
      const radio = this.querySelector('input[type="radio"]');
      radio.checked = true;
      selectedPaymentMethod = radio.value;
    });
  });

  function formatRupiah(angka) {
    return angka ? angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
  }

  function prosesTopUp() {
    const gameId = gameIdInput.value;
    const nominal = selectedNominalText; // Gunakan selectedNominalText yang lebih deskriptif
    const paymentChecked = document.querySelector('input[name="paymentMethod"]:checked');

    if (!gameId || gameId.length !== 8) {
      alert('ID Pengguna harus terdiri dari 8 digit angka.');
      return;
    }
    if (!nominal || !selectedPrice) {
      alert('Pilih nominal top up terlebih dahulu.');
      return;
    }
    if (!paymentChecked) {
      alert('Pilih metode pembayaran terlebih dahulu.');
      return;
    }

    const method = paymentChecked.value;
    const number = "+6285331480855"; // Ganti sesuai nomor tujuan DANA, OVO, GOPAY
    const waNumber = "6283162874553"; // Nomor WhatsApp Transfer Bank
    const amount = selectedPrice;

    if (method === 'dana') {
      window.location.href = `https://link.dana.id/qr/transfer?phone=${number}&amount=${amount}`;
    } else if (method === 'ovo') {
      window.location.href = `ovo://transfer?phone=${number}&amount=${amount}`;
    } else if (method === 'gopay') {
      window.location.href = `gopay://pay?phone=${number}&amount=${amount}`;
    } else if (method === 'shopeepay') {
      window.location.href = `shopeepay://pay?phone=${number}&amount=${amount}`;
    } else if (method === 'bank_transfer') {
      const waMsg = `Saya ingin top up Free Fire\nID: ${gameId}\nNominal: ${nominal}\nHarga: Rp ${formatRupiah(amount)}\nMetode: Transfer Bank`;
      window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;
    }
  }

  const topUpButton = document.querySelector('.container button');
  if (topUpButton) {
    topUpButton.addEventListener('click', prosesTopUp);
  }
});
