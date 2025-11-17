let array = [];
let speed = 200;

// DOM Elements
const container = document.getElementById("bar-container");
const explanation = document.getElementById("explanation");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");

// Generate random array
function generateArray(size = 20) {
  array = [];
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 300) + 20;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
  explanation.textContent = "New array generated!";
}

generateBtn.addEventListener("click", () => {
  generateArray(sizeSlider.value);
});

sizeSlider.addEventListener("input", () => {
  generateArray(sizeSlider.value);
});

speedSlider.addEventListener("input", () => {
  speed = speedSlider.value;
});

// Utility: delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Visualization
async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  explanation.textContent = "Bubble Sort: Comparing and swapping adjacent elements.";

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = "yellow";
      bars[j + 1].style.background = "yellow";

      await sleep(speed);

      if (array[j] > array[j + 1]) {
        explanation.textContent = `Swapping ${array[j]} and ${array[j + 1]}`;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;

        bars[j].style.background = "red";
        bars[j + 1].style.background = "red";
        await sleep(speed);
      }

      bars[j].style.background = "cyan";
      bars[j + 1].style.background = "cyan";
    }
    bars[array.length - i - 1].style.background = "lime";
  }

  explanation.textContent = "Array sorted! 🎉";
}

// Handle Sort
sortBtn.addEventListener("click", async () => {
  const algorithm = algorithmSelect.value;
  sortBtn.disabled = true;

  if (algorithm === "bubble") await bubbleSort();
  else alert("Other algorithms coming soon!");

  sortBtn.disabled = false;
});

// Initial
generateArray();
