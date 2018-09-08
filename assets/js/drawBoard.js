
let cell = [];
function drawBoard(dimension, bombsLeft){
	if(cell != []){

	}
	let lastClicked;
	let field = new mineField(dimension, dimension, bombsLeft);

    let cellsLeft = dimension * dimension;

    let grid = clickableGrid(dimension,dimension,function(element,row,col,i){
		element.field.Click(cell,row,col,i,dimension);
	});

<<<<<<< HEAD:assets/js/drawBoard.js
     function clickableGrid( rows, cols, callback ){
       let i=0;
       let grid = document.createElement('table');
       grid.className = 'grid';
       for (let r=0; r<rows; r++){
         let tr = grid.appendChild(document.createElement('tr')); //creates a new row for each r value
         for (let c=0; c<cols; c++){
           let cell = tr.appendChild(document.createElement('td')); //creates a new table data cell in the current row for each column
           cell.isBomb = placeBombs(r,c,bombsLeft);
           cellsLeft--;
           if(cell.isBomb == true){
              bombsLeft--;
           }
           cell.addEventListener('click',(function(element,r,c,i){ //on a click it creates a function scope for all of the local variables for a cell
             return function(){
               callback(element,r,c,i); //function that allows refernce to specific instance by creating closure
             }
           })(cell,r,c,i),
            false);
         }
       }
       return grid;
     }
     function placeBombs(rows, cols, bombsLeft){
       if(bombsLeft > 0){
        return(Math.random() <= (bombsLeft / cellsLeft));
      }
      return false;
     }
     function game(let rows,let cols,)
     {

     }
=======
    document.body.appendChild(grid);

	function clickableGrid( rows, cols, callback ){
    	let i=0;
        let grid = document.createElement('table');
        grid.className = 'grid';
        for (let r=0; r<rows; r++){
        	let tr = grid.appendChild(document.createElement('tr')); //creates a new row for each r value
			cell.push([0]);
            for (let c=0; c<cols; c++){
            	cell[r][c] = tr.appendChild(document.createElement('td')); //creates a new table data cell in the current row for each column
                cell[r][c].field = field;
                cell[r][c].addEventListener('click',(function(element,r,c,i){ //on a click it creates a function scope for all of the local variables for a cell
                	return function(){
                    	callback(element,r,c,i); //function that allows refernce to specific instance by creating closure
                    }
                })(cell[r][c],r,c,i),false);
				field.arr[r][c].cell = cell[r][c];
        	}
        }
        return grid;
	}
>>>>>>> master:assets/drawBoard.js
}
