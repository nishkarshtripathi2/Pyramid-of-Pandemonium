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
                      QUICK SORT (ADVANCED)
------------------------------------------------------------*/

// Partition function
async function partition(low, high) {
  const bars = document.getElementsByClassName("bar");
  let pivot = array[high];

  bars[high].style.background = "purple"; // pivot color

  let i = low - 1;

  for (let j = low; j < high; j++) {

    bars[j].style.background = "yellow";
    incComparisons();
    await sleep(speed);

    if (array[j] < pivot) {
      i++;

      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;

      bars[i].style.background = "red";
      bars[j].style.background = "red";

      incSwaps();
      await sleep(speed);
    }

    bars[j].style.background = "cyan";
  }

  // Final pivot swap
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[high].style.height = `${array[high]}px`;

  bars[i + 1].style.background = "lime";
  bars[high].style.background = "cyan";

  incSwaps();
  await sleep(speed);

  return i + 1;
}

// Recursive Quick Sort
async function quickSort(low, high) {
  if (low < high) {

    let pi = await partition(low, high);

    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }

  const bars = document.getElementsByClassName("bar");
  for (let k = low; k <= high; k++) {
    if (bars[k]) bars[k].style.background = "lime";
  }
}
/* -----------------------------------------------------------
                      MERGE SORT (ADVANCED)
------------------------------------------------------------*/

async function merge(low, mid, high) {
  const bars = document.getElementsByClassName("bar");

  let left = array.slice(low, mid + 1);
  let right = array.slice(mid + 1, high + 1);

  let i = 0, j = 0, k = low;

  while (i < left.length && j < right.length) {

    incComparisons();

    // highlight bars being compared
    bars[k].style.background = "yellow";
    await sleep(speed);

    if (left[i] <= right[j]) {
      array[k] = left[i];
      bars[k].style.height = `${left[i]}px`;
      i++;
    } else {
      array[k] = right[j];
      bars[k].style.height = `${right[j]}px`;
      j++;
    }

    bars[k].style.background = "red";
    incSwaps();
    await sleep(speed);

    bars[k].style.background = "cyan";
    k++;
  }

  while (i < left.length) {
    array[k] = left[i];
    bars[k].style.height = `${left[i]}px`;
    i++;
    k++;

    incSwaps();
    bars[k-1].style.background = "red";
    await sleep(speed);
    bars[k-1].style.background = "cyan";
  }

  while (j < right.length) {
    array[k] = right[j];
    bars[k].style.height = `${right[j]}px`;
    j++;
    k++;

    incSwaps();
    bars[k-1].style.background = "red";
    await sleep(speed);
    bars[k-1].style.background = "cyan";
  }
}

async function mergeSort(low, high) {
  if (low >= high) return;

  explanation.textContent = `Merge Sort: dividing ${low} to ${high}`;

  let mid = Math.floor((low + high) / 2);

  await mergeSort(low, mid);
  await mergeSort(mid + 1, high);

  explanation.textContent = `Merging ${low} to ${high}`;
  await merge(low, mid, high);

  // Mark sorted zone green
  const bars = document.getElementsByClassName("bar");
  for (let i = low; i <= high; i++) {
    bars[i].style.background = "lime";
  }
}
/* -----------------------------------------------------------
                      HEAP SORT (ADVANCED)
------------------------------------------------------------*/

// Heapify function (maintains max heap)
async function heapify(n, i) {
  const bars = document.getElementsByClassName("bar");

  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // LEFT child check
  if (left < n) {
    bars[left].style.background = "yellow";
    incComparisons();
    await sleep(speed);

    if (array[left] > array[largest]) {
      largest = left;
    }
    bars[left].style.background = "cyan";
  }

  // RIGHT child check
  if (right < n) {
    bars[right].style.background = "yellow";
    incComparisons();
    await sleep(speed);

    if (array[right] > array[largest]) {
      largest = right;
    }
    bars[right].style.background = "cyan";
  }

  // If largest is not root
  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];

    bars[i].style.height = `${array[i]}px`;
    bars[largest].style.height = `${array[largest]}px`;

    bars[i].style.background = "red";
    bars[largest].style.background = "red";
    incSwaps();
    await sleep(speed);

    bars[i].style.background = "cyan";
    bars[largest].style.background = "cyan";

    await heapify(n, largest);
  }
}

// Main Heap Sort
async function heapSort() {
  explanation.textContent = "Heap Sort: Building max heap...";
  startTimer();

  const bars = document.getElementsByClassName("bar");
  let n = array.length;

  // Step 1: Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  explanation.textContent = "Extracting elements from heap...";

  // Step 2: Extract elements
  for (let i = n - 1; i > 0; i--) {

    // Swap root (max) with end
    [array[0], array[i]] = [array[i], array[0]];

    bars[0].style.height = `${array[0]}px`;
    bars[i].style.height = `${array[i]}px`;

    bars[i].style.background = "lime"; // sorted
    incSwaps();
    await sleep(speed);

    // Heapify reduced heap
    await heapify(i, 0);
  }

  bars[0].style.background = "lime";

  stopTimer();
  explanation.textContent = "Array sorted with Heap Sort! 🎉";
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
  else if (algorithm === "quick") await quickSort(0, array.length - 1);
  else if (algorithm === "merge") await mergeSort(0, array.length - 1);
  else if (algorithm === "heap") await heapSort();



  sortBtn.disabled = false;
  setControlsDisabled(false);
});

// Reset stats manually
resetStatsBtn.addEventListener("click", resetStats);

// Initial array
generateArray(parseInt(sizeSlider.value));
