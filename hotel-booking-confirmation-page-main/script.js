const menuBtn = document.getElementById("menu-btn");
const menuContainer = document.getElementById("nav-menu");
const menuIcon = document.getElementById("menu-icon");
const copyBtn = document.getElementById("copy-btn");
const wifiPassword = document.querySelector(".password-container > div p");

menuBtn.addEventListener("click", function () {
  const isOpen = menuContainer.classList.toggle("show");

  menuIcon.src = isOpen
    ? "./assets/images/icon-close.svg"
    : "./assets/images/icon-menu.svg";
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

copyBtn.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(wifiPassword.textContent.trim());
    copyBtn.textContent = "COPIED";

    setTimeout(function () {
      copyBtn.textContent = "COPY";
    }, 1500);
  } catch {
    copyBtn.textContent = "TRY AGAIN";
  }
});
