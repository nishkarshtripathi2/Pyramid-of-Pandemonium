let array = [];
let speed = 200;

// Stats
let comparisons = 0;
let swaps = 0;
let startTime = null;
let timerInterval = null;

// DOM Elements
const container = document.getElementById("bar-container");
const explanation = document.getElementById("explanation");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");
const compCountEl = document.getElementById("compCount");
const swapCountEl = document.getElementById("swapCount");
const timeCountEl = document.getElementById("timeCount");
const resetStatsBtn = document.getElementById("resetStats");

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
  resetStats();
}

generateBtn.addEventListener("click", () => {
  generateArray(parseInt(sizeSlider.value));
});

sizeSlider.addEventListener("input", () => {
  generateArray(parseInt(sizeSlider.value));
});

speedSlider.addEventListener("input", () => {
  speed = parseInt(speedSlider.value);
});

// Utility delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Stats helpers
function resetStats() {
  comparisons = 0;
  swaps = 0;
  startTime = null;
  clearInterval(timerInterval);
  updateStats();
  timeCountEl.textContent = "0.00s";
}

function updateStats() {
  compCountEl.textContent = comparisons;
  swapCountEl.textContent = swaps;
}

function incComparisons() {
  comparisons++;
  updateStats();
}

function incSwaps(n = 1) {
  swaps += n;
  updateStats();
}

// Timer helpers
function startTimer() {
  startTime = performance.now();
  timerInterval = setInterval(() => {
    const now = performance.now();
    timeCountEl.textContent = ((now - startTime) / 1000).toFixed(2) + "s";
  }, 100);
}

function stopTimer() {
  if (startTime) {
    const end = performance.now();
    timeCountEl.textContent = ((end - startTime) / 1000).toFixed(2) + "s";
    clearInterval(timerInterval);
    startTime = null;
  }
}

// Disable UI during sorting
function setControlsDisabled(val) {
  algorithmSelect.disabled = val;
  sizeSlider.disabled = val;
  speedSlider.disabled = val;
  generateBtn.disabled = val;
  resetStatsBtn.disabled = val;
  document.getElementById("useCustomArray").disabled = val;
  document.getElementById("customArrayInput").disabled = val;
}

/* -----------------------------------------------------------
                      BUBBLE SORT
------------------------------------------------------------*/
async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  explanation.textContent = "Bubble Sort: Comparing and swapping adjacent elements.";
  startTimer();

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      
      bars[j].style.background = "yellow";
      bars[j + 1].style.background = "yellow";
      incComparisons();
      await sleep(speed);

      if (array[j] > array[j + 1]) {
        explanation.textContent = `Swapping ${array[j]} and ${array[j + 1]}`;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;

        bars[j].style.background = "red";
        bars[j + 1].style.background = "red";

        incSwaps();
        await sleep(speed);
      }

      bars[j].style.background = "cyan";
      bars[j + 1].style.background = "cyan";
    }
    bars[array.length - i - 1].style.background = "lime";
  }

  stopTimer();
  explanation.textContent = "Array sorted! 🎉";
}

/* -----------------------------------------------------------
                      INSERTION SORT
------------------------------------------------------------*/
async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  explanation.textContent = "Insertion Sort: Inserting elements into correct position.";
  
  startTimer();

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.background = "orange";
    await sleep(speed);

    while (j >= 0) {
      incComparisons();
      bars[j].style.background = "yellow";
      await sleep(speed);

      if (array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j]}px`;
        incSwaps();
        j--;
      } else {
        break;
      }
      bars[j + 1].style.background = "cyan";
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    incSwaps();
    
    bars[i].style.background = "cyan";
  }

  for (let bar of bars) bar.style.background = "lime";

  stopTimer();
  explanation.textContent = "Array sorted! 🎉";
}

/* -----------------------------------------------------------
                      SELECTION SORT
------------------------------------------------------------*/
async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  explanation.textContent = "Selection Sort: Selecting minimum element.";
  
  startTimer();

  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    bars[minIdx].style.background = "orange";

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.background = "yellow";
      incComparisons();
      await sleep(speed);

      if (array[j] < array[minIdx]) {
        bars[minIdx].style.background = "cyan";
        minIdx = j;
        bars[minIdx].style.background = "red";
      } else {
        bars[j].style.background = "cyan";
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIdx].style.height = `${array[minIdx]}px`;
      incSwaps();
      await sleep(speed);
    }

    bars[i].style.background = "lime";
  }

  stopTimer();
  explanation.textContent = "Array sorted! 🎉";
}

/* -----------------------------------------------------------
                 CUSTOM ARRAY INPUT HANDLER
------------------------------------------------------------*/
document.getElementById("useCustomArray").addEventListener("click", () => {
  const input = document.getElementById("customArrayInput").value.trim();

  if (!input) {
    alert("Please enter some numbers!");
    return;
  }

  if (!/^[0-9,\s]+$/.test(input)) {
    alert("Invalid input! Use comma-separated numbers only.");
    return;
  }

  const customValues = input
    .split(",")
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n));

  if (customValues.length === 0) {
    alert("No valid numbers found!");
    return;
  }

  array = customValues;
  container.innerHTML = "";

  array.forEach(value => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  });

  explanation.textContent = "Custom array loaded!";
  resetStats();
});

/* -----------------------------------------------------------
                     SORT BUTTON HANDLER
------------------------------------------------------------*/
sortBtn.addEventListener("click", async () => {
  const algorithm = algorithmSelect.value;

  sortBtn.disabled = true;
  setControlsDisabled(true);
  resetStats();

  if (algorithm === "bubble") await bubbleSort();
  else if (algorithm === "insertion") await insertionSort();
  else if (algorithm === "selection") await selectionSort();

  sortBtn.disabled = false;
  setControlsDisabled(false);
});

// Reset stats manually
resetStatsBtn.addEventListener("click", resetStats);

// Initial array
generateArray(parseInt(sizeSlider.value));
