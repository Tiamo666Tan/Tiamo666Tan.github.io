const heroModel = document.querySelector("#heroModel");
const companionModel = document.querySelector("#companionModel");
const companion = document.querySelector("#scrollCompanion");
const allModels = [heroModel, companionModel].filter(Boolean);

function usePosterFallback() {
  document.documentElement.classList.add("no-3d");
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch (_) {
    return false;
  }
}

if (!supportsWebGL()) usePosterFallback();
allModels.forEach((model) => model.addEventListener("error", usePosterFallback));

function updateOrbit() {
  const range = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  const progress = Math.min(scrollY / range, 1);
  const angle = -28 + progress * 540;
  heroModel?.setAttribute("camera-orbit", `${angle}deg 76deg 105%`);
  companionModel?.setAttribute("camera-orbit", `${angle + 20}deg 76deg 105%`);
  companion?.classList.toggle("is-visible", scrollY > innerHeight * .72 && progress < .91);
}

updateOrbit();
addEventListener("scroll", updateOrbit, { passive: true });

const autoVideos = document.querySelectorAll("video[autoplay]");
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => isIntersecting ? target.play().catch(() => {}) : target.pause());
}, { threshold: .2 });
autoVideos.forEach((video) => videoObserver.observe(video));
