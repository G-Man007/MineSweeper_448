/**
 * @class
 * @classdesc Represents a single cell in the grid.
 */
class Tile {
	/**
	 * Represents a single cell in the grid.
	 * @constructor
	 */
	constructor(){
		this.mine = false;
		this.flag = false;
		this.adjminenum = 0;
	}
}
/**
 * @class
 * @classdesc Represents the logic for the mineField.
 */
class mineField {
	/**
	 * @constructor
	 * @param {int} height - The height of the grid.
	 * @param {int} width - The width of the grid.
	 * @param {int} numBombs - The amount of bombs to be placed in the grid.
	 */
    constructor(height, width, numBombs){
        this.height = height;
        this.width = width;
		this.bombs = numBombs;
		this.flags = numBombs;
        this.arr = [];
		this.endgame = false;
		let cells = height * width;
		let cellsLeft = height * width;

        for(let i = 0; i < height; i++){
            this.arr.push([0]);
            for(let j = 0; j < width; j++){
                this.arr[i][j] = new Tile();
				cellsLeft--;
				if(this.arr[i][j].mine == true){
					numBombs--;
				}
            }
        }//creates grid size and populates the array with mines
		this.placeBombs(numBombs);
		//this.numberField();
    }

	/**
	 * Calls the expansion and checks for bombs in the cell clicked on. Pre: cells already generated; Post: based on the type of cell, different outcomes occur
	 * @function
	 * @param {int} cell - The entire grid of clickable cells that can alter a specific one with row and col.
	 * @param {int} row - The row of the grid the cell is in.
	 * @param {int} col - The column of the grid the cell is in.
	 * @returns - nothing
	 */
	Click(cell,row,col){
		if(!(this.endgame) && !(this.arr[row][col].flag)){
			if(this.arr[row][col].mine == true){
				cell[row][col].className = 'bomb';
				this.ShowBombs(cell);
				this.endgame = true;
				window.alert("You Lose\nClick create board to try again");
			}
			//checks for all of the possible types of cells the clicked one could be
			else if(this.arr[row][col].adjminenum == 0){
				this.Expand(cell,row,col);
			}
			else if(this.arr[row][col].adjminenum == 1){
				cell[row][col].className = 'clicked1';
			}
			else if(this.arr[row][col].adjminenum == 2){
				cell[row][col].className = 'clicked2';
			}
			else if(this.arr[row][col].adjminenum == 3){
				cell[row][col].className = 'clicked3';
			}
			else if(this.arr[row][col].adjminenum == 4){
				cell[row][col].className = 'clicked4';
			}
			else if(this.arr[row][col].adjminenum == 5){
				cell[row][col].className = 'clicked5';
			}
			else if(this.arr[row][col].adjminenum == 6){
				cell[row][col].className = 'clicked6';
			}
			else if(this.arr[row][col].adjminenum == 7){
				cell[row][col].className = 'clicked7';
			}
			else if(this.arr[row][col].adjminenum == 8){
				cell[row][col].className = 'clicked8';
			}
		}
	}
	/**
	 * If the clicked on cell is a bomb and the endgame has occurred, this function turns all of the bombs visible. Pre: cells are already generated; Post: all bombs are revealed.
	 * @function
	 * @param {int} cell - The entire grid of clickable cells that can alter a specific one with row and col.
	 * @returns - nothing
	 */
	ShowBombs(cell){
		for(let i = 0; i<this.height; i++){
			for(let j = 0; j<this.width; j++){
				if(this.arr[i][j].mine){
					cell[i][j].className = 'bomb';
				}
			}
		}
	}
	/**
	 * Handles the functionality of flags. If a flag is placed it will decrement and in the case all are gone it calls checkFlags to check if they're all in the correct place for the win. Pre: cells are already generated; Post: flags are placed, removed, or the game ends.
	 * @function
	 * @param {int} cell - The entire grid of clickable cells that can alter a specific one with row and col.
	 * @param {int} row - The row of the grid the cell is in.
	 * @param {int} col - The column of the grid the cell is in.
	 * @returns - nothing
	 */
	Flag(cell,row,col) {
		if(!(this.endgame)){
			if(this.arr[row][col].flag){
				this.arr[row][col].flag = false;
				cell[row][col].className = 'norm';
				this.flags ++;
			}
			else if(cell[row][col].className == '' || cell[row][col].className == 'norm'){
				this.arr[row][col].flag = true;
				cell[row][col].className = 'flag';
				this.flags --;
			}
			if(this.flags == 0) {
				this.endgame = this.Checkflags();
			}
			return this.flags;
		}
		else{
			return 0;
		}
	}
	/**
	 * Checks if all flags are in the correct place for the win. Pre: cells are already generated; Post: Game ends if all flags are placed correctly.
	 * @function
	 * @returns - false if there are unflagged mines, true if the game ends
	 */
	Checkflags(){
		for(let i = 0; i<this.height; i++){
			for(let j = 0; j<this.width; j++){
				if(this.arr[i][j].mine && !(this.arr[i][j].flag)){
					return false;
				}
			}
		}
		window.alert("You Win\nClick create board to play again");
		return true;
	}
	/**
	 * Runs the expansion and checks for bombs in the cell clicked on. Pre: A cell is clicked and is not a numbered cell; Post: from the original cell, it expands until numbered cells are revealed.
	 * @function
	 * @param {int} cell - The entire grid of clickable cells that can alter a specific one with row and col.
	 * @param {int} row - The row of the grid the cell is in.
	 * @param {int} col - The column of the grid the cell is in.
	 * @returns - if cell is already clicked or a bomb is found, otherwise nothing
	 */
	Expand(cell, row, col) {
		if(cell[row][col].className == 'clicked' || cell[row][col].className == 'clicked1'|| cell[row][col].className == 'clicked2' || cell[row][col].className == 'clicked3'|| cell[row][col].className == 'clicked4'|| cell[row][col].className == 'clicked5'
			|| cell[row][col].className == 'clicked6' || cell[row][col].className == 'clicked7' || cell[row][col].className =='clicked8' || this.arr[row][col].flag){
			return;
		}
		if(this.arr[row][col].adjminenum == 0 && !(this.arr[row][col].mine)){
			cell[row][col].className = 'clicked';
			if(row > 0){
				this.Expand(cell,row-1,col);
				if(col > 0){
					this.Expand(cell,row-1,col-1);
				}
				if(col < this.width-1){
					this.Expand(cell,row-1,col+1);
				}
			}
			if(col > 0){
				this.Expand(cell,row,col-1);
			}
			if(col < this.width-1){
				this.Expand(cell,row,col+1);
			}
			if(row < this.height-1){
				this.Expand(cell,row+1,col);
				if(col > 0){
					this.Expand(cell,row+1,col-1);
				}
				if(col < this.width-1){
					this.Expand(cell,row+1,col+1);
				}
			}
		}//recursively calls for it to go out to all squares if there is no mine near it
		else if(!(this.arr[row][col].mine)) {
			this.Click(cell, row, col);
			return;
		}
	}
	/**
	 * Runs the expansion and checks for bombs in the cell clicked on. Pre: the cells and board are already created; Post: bombs are placed randomly throughout the board.
	 * @function
	 * @param {int} bombsLeft - The amount of bombs yet to be placed.
	 * @returns - nothing
	 */
	placeBombs(bombsLeft){
		let x = 0;
		let y = 0;
		while(bombsLeft > 0){
			x = Math.floor(Math.random() * this.height);
			y = Math.floor(Math.random() * this.width);
			if(!(this.arr[x][y].mine)){
				this.arr[x][y].mine = true;
				bombsLeft --;
				if(x > 0){
					this.arr[x-1][y].adjminenum++;
					if(y > 0){
						this.arr[x-1][y-1].adjminenum++;
					}
					if(y < this.width-1){
						this.arr[x-1][y+1].adjminenum++;
					}
				}
				if(y > 0){
					this.arr[x][y-1].adjminenum++;
				}
				if(y < this.width-1){
					this.arr[x][y+1].adjminenum++;
				}
				if(x < this.height-1){
					this.arr[x+1][y].adjminenum++;
					if(y > 0){
						this.arr[x+1][y-1].adjminenum++;
					}
					if(y < this.width-1){
						this.arr[x+1][y+1].adjminenum++;
					}
				}
			}
		}
	}
}
