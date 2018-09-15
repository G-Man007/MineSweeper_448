let grid = null;
/**
 * Represents a board.
 * @constructor
 * @param {int} height - The height of the grid.
 * @param {int} width - The width of the grid.
 * @param {int} bombsLeft - The amount of bombs to be placed in the grid.
 * @returns - nothing
 */
function drawBoard(height, width, bombsLeft){
	let cell = [];
 	let lastClicked;
	let field = new mineField(height, width, bombsLeft);

    grid = document.createElement('table');
    grid.className = 'grid';

    for (let r=0; r<height; r++){
    	let tr = grid.appendChild(document.createElement('tr')); //creates a new row for each r value
 		cell.push([0]);
        for (let c=0; c<width; c++){
         	cell[r][c] = tr.appendChild(document.createElement('td')); //creates a new table data cell in the current row for each column
            cell[r][c].onclick = function(){
				field.Click(cell,r,c);
			};
			cell[r][c].oncontextmenu = function(){
				field.Flag(cell,r,c);
			};
     	}
    }
	document.body.appendChild(grid);
}
/**
 * removes the old table from the page
 * @function
 * @returns - nothing
 */
function deleteBoard(){
	if(grid != null){
 		document.body.removeChild(grid);
 	}
}
function flag(r,c){
	cell[r][c].field.Flag(r, c);
}
