const memoryVideos = [
  { title: "That unstoppable laugh", date: "June 2021", src: "media/new-memories/laughing-fit.mp4" },
  { title: "Rain walk confessions", date: "Aug 2021", src: "media/new-memories/rain-walk.mp4" },
  { title: "Birthday candle chaos", date: "Jan 2022", src: "media/new-memories/candle-chaos.mp4" },
  { title: "Our midnight tea talk", date: "Mar 2022", src: "media/new-memories/midnight-tea.mp4" },
  { title: "Festival sparkle", date: "Oct 2022", src: "media/new-memories/festival-sparkle.mp4" },
  { title: "Silliest dance ever", date: "Dec 2022", src: "media/new-memories/silly-dance.mp4" },
  { title: "Roadside momo stop", date: "Apr 2023", src: "media/new-memories/momo-stop.mp4" },
  { title: "Sunset promise", date: "Jul 2023", src: "media/new-memories/sunset-promise.mp4" }
];

function renderConstellation() {
  const holder = document.getElementById("constellation");
  if (!holder) return;

  const centerX = 50;
  const centerY = 50;
  const ringStep = 14;

  memoryVideos.forEach((video, index) => {
    const node = document.createElement("article");
    node.className = "memory-node";

    const angle = (360 / memoryVideos.length) * index;
    const radians = angle * (Math.PI / 180);
    const ring = 18 + (index % 3) * ringStep;
    const x = centerX + Math.cos(radians) * ring;
    const y = centerY + Math.sin(radians) * (ring - 4);
    const tilt = (index % 2 === 0 ? -1 : 1) * (5 + (index % 4) * 2);

    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    node.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;

    node.innerHTML = `
      <div class="thumb">Tap to play memory</div>
      <strong>${video.title}</strong>
      <span>${video.date}</span>
    `;

    node.addEventListener("click", () => openVideo(video));
    holder.appendChild(node);
  });
}

function openVideo(video) {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("focusVideo");
  const title = document.getElementById("videoTitle");
  if (!modal || !player || !title) return;

  title.textContent = video.title;
  player.src = video.src;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("focusVideo");
  if (!modal || !player) return;

  player.pause();
  player.removeAttribute("src");
  player.load();
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function setupModal() {
  const closeBtn = document.getElementById("closeVideo");
  const modal = document.getElementById("videoModal");
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeVideo);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeVideo();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderConstellation();
  setupModal();
});
