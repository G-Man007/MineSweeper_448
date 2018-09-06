function drawBoard(dimension, bombsLeft){
	let lastClicked;
	let field = new mineField(dimension, dimension, bombsLeft);

    let cellsLeft = dimension * dimension;

    let grid = clickableGrid(dimension,dimension,function(element,row,col,i){
		if(element.tile.adjminenum == 0){
			element.className = 'clicked';
		}
		else if(element.tile.adjminenum == 1){
			element.className = 'clicked1';
		}
		else if(element.tile.adjminenum == 2){
			element.className = 'clicked2';
		}
		else if(element.tile.adjminenum == 3){
			element.className = 'clicked3';
		}
		else if(element.tile.adjminenum == 4){
			element.className = 'clicked4';
		}
		else if(element.tile.adjminenum == 5){
			element.className = 'clicked5';
		}
		else if(element.tile.adjminenum == 6){
			element.className = 'clicked6';
		}
		else if(element.tile.adjminenum == 7){
			element.className = 'clicked7';
		}
		else if(element.tile.adjminenum == 8){
			element.className = 'clicked8';
		}
        else if(element.tile.mine == true){
        	element.className = 'bomb';
		}
	});

    document.body.appendChild(grid);

    function clickableGrid( rows, cols, callback ){
    	let i=0;
        let grid = document.createElement('table');
        grid.className = 'grid';
        for (let r=0; r<rows; r++){
        	let tr = grid.appendChild(document.createElement('tr')); //creates a new row for each r value
            for (let c=0; c<cols; c++){
            	let cell = tr.appendChild(document.createElement('td')); //creates a new table data cell in the current row for each column
                cell.tile = field.arr[r][c];
                /*cellsLeft--;
                if(cell.isBomb == true){
                	bombsLeft--;
                    field.arr[r][c] = true;
                }*/
                cell.addEventListener('click',(function(element,r,c,i){ //on a click it creates a function scope for all of the local variables for a cell
                	return function(){
                    	callback(element,r,c,i); //function that allows refernce to specific instance by creating closure
                    }
                })(cell,r,c,i),false);
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
	console.log(field.arr);
}
