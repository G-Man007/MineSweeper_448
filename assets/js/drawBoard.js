let cell = null;
let grid = null;

/**
 * Represents a board.
 * @constructor
 * @param {int} height - The height of the grid.
 * @param {int} width - The width of the grid.
 * @param {int} bombsLeft - The amount of bombs to be placed in the grid.
 */
function drawBoard(height, width, bombsLeft){
	cell = [];
 	let lastClicked;
 	let field = new mineField(height, width, bombsLeft);

    let tab = clickableGrid(height, width,function(element,row,col){
 		element.field.Click(cell,row,col);
 	});

	document.body.appendChild(grid);

 	function clickableGrid( rows, cols, callback ){
        grid = document.createElement('table');
        grid.className = 'grid';

        for (let r=0; r<rows; r++){
        	let tr = grid.appendChild(document.createElement('tr')); //creates a new row for each r value
 			cell.push([0]);

            for (let c=0; c<cols; c++){
             	cell[r][c] = tr.appendChild(document.createElement('td')); //creates a new table data cell in the current row for each column
                cell[r][c].field = field;
                cell[r][c].addEventListener('click',(function(element,r,c){ //on a click it creates a function scope for all of the local variables for a cell
                 	return function(){
                    	callback(element,r,c); //function that allows refernce to specific instance by creating closure
                    }
                })(cell[r][c],r,c),false);
 				field.arr[r][c].cell = cell[r][c];
         	}
        }
        return grid;
	}
}
function deleteBoard(){
	if(grid != null){
 		document.body.removeChild(grid);
 	}
}
