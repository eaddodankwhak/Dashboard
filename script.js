function updateClock() {
  const now = new Date();

  // Time in GMT, e.g. 07:45 PM
  const time = now.toLocaleTimeString("en-US", {
    timeZone: "Africa/Accra",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  document.getElementById("clock").textContent = time;

  // Date, e.g. Wednesday, November 4, 2026
  const date = now.toLocaleDateString("en-US", {
    timeZone: "Africa/Accra",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  document.getElementById("date").textContent = date;

  // Greeting based on the GMT hour
  const hour = Number(now.toLocaleString("en-US", {
    timeZone: "Africa/Accra",
    hour: "numeric",
    hour12: false
  }));
  let greeting = "Good Evening,";
  if (hour < 12) greeting = "Good Morning,";
  else if (hour < 18) greeting = "Good Afternoon,";
  document.getElementById("greet-text").textContent = greeting;
}

updateClock();
setInterval(updateClock, 1000);
// ----- Tasks → Productivity -----
const checkboxes = document.querySelectorAll("#tasks input[type='checkbox']");
const ring = document.getElementById("ring");

function updateProductivity() {
  const total = checkboxes.length;
  const done = [...checkboxes].filter(box => box.checked).length;
  const percent = Math.round((done / total) * 100);

  document.getElementById("done").textContent = done;
  document.getElementById("total").textContent = total;
  document.getElementById("percent").textContent = percent + "%";
  ring.style.setProperty("--p", percent);
}

checkboxes.forEach(box => box.addEventListener("change", updateProductivity));
updateProductivity();
// ----- Focus Timer -----
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let FOCUS_SECONDS = 10 * 60;
let remaining = FOCUS_SECONDS;
let timerId = null;

function showTime() {
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  timeDisplay.textContent = `${m}:${s}`;
}

function tick() {
  remaining--;
  showTime();
  if (remaining <= 0) {
    clearInterval(timerId);
    timerId = null;
    remaining = FOCUS_SECONDS;
    startBtn.textContent = "Start";
    alert("Focus session complete!");
    showTime();
  }
}

startBtn.addEventListener("click", () => {
  if (timerId === null) {
    timerId = setInterval(tick, 1000);
    startBtn.textContent = "Pause";
  } else {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "Start";
  }
});

showTime();
// ----- Timer presets -----
document.querySelectorAll(".presets button").forEach(btn => {
  btn.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "Start";

    FOCUS_SECONDS = Number(btn.dataset.min) * 60;
    remaining = FOCUS_SECONDS;
    showTime();

    document.querySelectorAll(".presets button")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});