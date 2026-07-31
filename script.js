const heroModel = document.querySelector("#heroModel");
const companionModel = document.querySelector("#companionModel");
const companion = document.querySelector("#scrollCompanion");
const allModels = [heroModel, companionModel].filter(Boolean);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch (_) {
    return false;
  }
}

function getModelShell(model) {
  return model.closest(".model-shell, .companion-model-shell");
}

function showModelError(model) {
  const shell = getModelShell(model);
  const message = shell?.querySelector(".model-loading span");
  shell?.classList.add("has-error");
  if (message) message.textContent = "3D 肖像暂时没有加载成功，请刷新再见我～";
}

const webGLSupported = supportsWebGL();

allModels.forEach((model) => {
  model.addEventListener("load", () => getModelShell(model)?.classList.add("is-loaded"), { once: true });
  model.addEventListener("error", () => showModelError(model));
});

if (!webGLSupported) {
  allModels.forEach(showModelError);
  heroModel?.removeAttribute("src");
}

let companionRequested = false;
function loadCompanionWhenNeeded() {
  if (companionRequested || !webGLSupported || scrollY < innerHeight * .45) return;
  companionRequested = true;
  const source = companionModel?.dataset.src;
  if (source) companionModel.src = source;
}

function updateOrbit() {
  const range = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  const progress = Math.min(scrollY / range, 1);
  const angle = -28 + progress * 540;
  heroModel?.setAttribute("camera-orbit", `${angle}deg 76deg 105%`);
  if (companionRequested) companionModel?.setAttribute("camera-orbit", `${angle + 20}deg 76deg 105%`);
  companion?.classList.toggle("is-visible", scrollY > innerHeight * .72 && progress < .91);
  loadCompanionWhenNeeded();
}

updateOrbit();
let orbitFrame = 0;
addEventListener("scroll", () => {
  if (orbitFrame) return;
  orbitFrame = requestAnimationFrame(() => {
    updateOrbit();
    orbitFrame = 0;
  });
}, { passive: true });

const autoVideos = document.querySelectorAll("video[autoplay]");
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => isIntersecting ? target.play().catch(() => {}) : target.pause());
}, { threshold: .2 });
autoVideos.forEach((video) => videoObserver.observe(video));
