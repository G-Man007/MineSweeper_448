let grid = null
let field = null
let cell = null
// sound file for cheating from https://freesound.org/people/FuelStream/sounds/336276/
let cheaterSound = new Audio('./assets/css/sounds/cheaterSound.wav')
/**
 * Represents a board. Pre: Empty body of HTML; Post: Playing field is generated in the body
 * @constructor
 * @param {int} height - The height of the grid.
 * @param {int} width - The width of the grid.
 * @param {int} bombsLeft - The amount of bombs to be placed in the grid.
 * @returns - nothing
 */
function drawBoard (height, width, bombsLeft) {
  cell = []
  field = new MineField(height, width, bombsLeft)

  grid = document.createElement('table')
  grid.className = 'grid'

  for (let r = 0; r < height; r++) {
    let tr = grid.appendChild(document.createElement('tr')) // creates a new row for each r value
    cell.push([0])

    for (let c = 0; c < width; c++) {
      cell[r][c] = tr.appendChild(document.createElement('td')) // creates a new table data cell in the current row for each column
      cell[r][c].onclick = function () {
        field.Click(cell, r, c)
      }
      cell[r][c].oncontextmenu = function () {
        document.getElementById('flagsOutput').innerHTML = field.Flag(cell, r, c)
        document.getElementById('flagsOutput').style.color = 'white'
        return false
      }

      cell[r][c].onmouseover = function () {
        document.getElementById('statsNow').innerHTML = field.statsReport(cell, r, c, bombsLeft)
        return false
      }
    }
    document.body.appendChild(grid)
  }
}

/**
 * Removes the old table from the page. Pre: Grid is already generated; Post: All elements of the grid are delered
 * @function
 * @returns - nothing
 */
function deleteBoard () {
  if (grid != null) {
    document.body.removeChild(grid)
  }
}

/**
 * Removes the old table from the page. Pre: Grid is already generated; Post: All elements of the grid are delered
 * @function
 * @returns - nothing
 */
function CheatMode () {
  if (field.arr[0][0].cheat === false) {
    cheaterSound.play()
    field.cheatOnce = true
  }
  for (let k = 0; k < field.height; k++) {
    for (let j = 0; j < field.width; j++) {
      if (field.arr[k][j].cheat === false) {
        field.arr[k][j].lastState = cell[k][j].className
        if (field.arr[k][j].mine === true) {
          cell[k][j].className = 'bomb'
        } else {
          cell[k][j].className = 'clicked' + field.arr[k][j].adjminenum
        }
        field.arr[k][j].cheat = true
      } else {
        field.arr[k][j].cheat = false
        cell[k][j].className = field.arr[k][j].lastState
      }
    }
  }
}
