document.addEventListener("DOMContentLoaded", function () {
  const gameLinks = document.querySelectorAll(".game-button");
  const preloader = document.getElementById("preloader");

  // Sembunyikan preloader saat halaman selesai dimuat
  window.addEventListener("load", () => {
    if (preloader) preloader.style.display = "none";
  });

  // Saat link game diklik, tampilkan preloader lalu redirect
  gameLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (preloader) preloader.style.display = "flex";
      setTimeout(() => {
        window.location.href = href;
      }, 5000); // delay 1 detik sebelum pindah
    });
  });
});
