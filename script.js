function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function initializeLoader() {
  const loader = document.getElementById("page-loader");
  const loaderAnimation = document.getElementById("loader-animation");

  if (!loader || !loaderAnimation) {
    return;
  }

  const loaderStorageKey = "portfolio-loader-shown";

  const hasSeenLoader = (() => {
    try {
      return localStorage.getItem(loaderStorageKey) === "true";
    } catch (error) {
      return false;
    }
  })();

  const markLoaderSeen = () => {
    try {
      localStorage.setItem(loaderStorageKey, "true");
    } catch (error) {
      // Ignore storage failures and continue gracefully.
    }
  };

  if (hasSeenLoader) {
    loader.remove();
    document.body.classList.remove("loading");
    return;
  }

  const closeLoader = () => {
    window.setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.classList.remove("loading");
    }, 80);

    window.setTimeout(() => {
      loader.remove();
    }, 760);
  };

  document.body.classList.add("loading");

  if (!window.lottie) {
    closeLoader();
    return;
  }

  const animation = window.lottie.loadAnimation({
    container: loaderAnimation,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "./Scene-1.json",
  });

  let loaderClosed = false;

  const finishLoader = () => {
    if (loaderClosed) {
      return;
    }

    loaderClosed = true;
    markLoaderSeen();
    closeLoader();
    animation.destroy();
  };

  animation.addEventListener("complete", finishLoader);
  animation.addEventListener("data_failed", finishLoader);

  window.setTimeout(() => {
    if (document.body.classList.contains("loading")) {
      finishLoader();
    }
  }, 9000);
}

initializeLoader();
