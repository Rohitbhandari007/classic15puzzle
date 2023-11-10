const puzzleArrayWinCombination = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, " "],
];

var puzzleArray = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, " "],
];

const puzzleArea = document.getElementById("puzzle");

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    for (let j = array[i].length - 1; j > 0; j--) {
      const x = Math.floor(Math.random() * (j + 1));
      [array[i][j], array[i][x]] = [array[i][x], array[i][j]];
    }
  }
}
shuffleArray(puzzleArray);

var moves = 0;

function renderPuzzle() {
  puzzleArea.innerHTML = "";
  puzzleArray.map((array, arrayIndex) => {
    const puzzleRow = document.createElement("div");
    puzzleRow.className = "puzzlerow";
    puzzleArea.appendChild(puzzleRow);
    array.map((item, index) => {
      const puzzleCell = document.createElement("cell");
      puzzleCell.className = "puzzlecell";
      puzzleCell.innerHTML = item;

      const cellId = `${arrayIndex}-${index}`;
      puzzleCell.id = cellId;
      puzzleRow.appendChild(puzzleCell);
      listenPuzzle(puzzleCell, arrayIndex, index);
    });
  });
}

function listenPuzzle(puzzleCell, arrayIndex, index) {
  let emptyCell = findEmptyCell(puzzleArray);
  const [x, y] = emptyCell;

  puzzleCell.addEventListener("click", function () {
    let emptyCell = findEmptyCell(puzzleArray);

    const sorroundedCells = findSorroundedCells(arrayIndex, index, emptyCell);
    if (sorroundedCells !== undefined) {
      const [i, j] = emptyCell;
      puzzleArray[i][j] = puzzleArray[arrayIndex][index];
      puzzleArray[arrayIndex][index] = " ";
      renderPuzzle(listenPuzzle);
      moves++;
      const animationCellId = `${arrayIndex}-${index}`;
      const animatoionCell = document.getElementById(`${animationCellId}`);

      animatoionCell.style.background = "rgb(147 112 219 / 28%)";
      animatoionCell.className =
        "puzzlecell animate__animated animate__bounceIn";
    }
  });
}

function findEmptyCell(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[i][j] === " ") {
        return [i, j];
      }
    }
  }
}

findEmptyCell(puzzleArray);

function findSorroundedCells(i, j, emptyCell) {
  const top = [i + 1, j];
  const bottom = [i - 1, j];
  const left = [i, j - 1];
  const right = [i, j + 1];

  if (JSON.stringify(top) === JSON.stringify(emptyCell)) {
    return top;
  }
  if (JSON.stringify(bottom) === JSON.stringify(emptyCell)) {
    console.log(bottom !== undefined && bottom === emptyCell);
    return bottom;
  }
  if (JSON.stringify(right) === JSON.stringify(emptyCell)) {
    console.log(right !== undefined && right === emptyCell);
    return right;
  }
  if (JSON.stringify(left) === JSON.stringify(emptyCell)) {
    console.log(left !== undefined && left === emptyCell);
    return left;
  }
}

renderPuzzle(listenPuzzle);
