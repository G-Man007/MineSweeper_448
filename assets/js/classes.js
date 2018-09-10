class Tile {
	constructor(){
		this.mine = false;
		this.flag = false;
		this.adjminenum = 0;
	}
}
class mineField {
    constructor(height, width, numBombs){
        this.height = height;
        this.width = width;
		this.bombs = numBombs;
		this.flags = numBombs;
        this.arr = [];
		let cells = height * width;
		let cellsLeft = height * width;
        for(let i = 0; i < width; i++){
            this.arr.push([0]);
            for(let j = 0; j < height; j++){
                this.arr[i][j] = new Tile();
            }
			for(let j = 0; j < height; j++){
				this.arr[i][j].mine = this.placeBombs(numBombs,cellsLeft);
				cellsLeft--;
				if(this.arr[i][j].mine == true){
						numBombs--;
				}
			}
        }//populates the array couldn't get adding mines to work

    }
	Click(cell,row,col,i,dimension){
		if(this.arr[row][col].adjminenum == 0 && this.arr[row][col].mine != true){
			this.Expand(cell,row,col,dimension);
		}
        else if(this.arr[row][col].mine == true){
        	cell[row][col].className = 'bomb';
		}//need statements for if the adjacent mines are >0 but works now
	}
	Flag(x,y) {
		this.arr[x][y].flag = true;
		flags --;
		if(flags == 0) {

		}
	}
	Expand(cell, row, col, dimension) {
		if(cell[row][col].className == 'clicked'){
			return;
		}//temporary until we get adjacent mine numbers working
		if(this.arr[row][col].adjminenum == 0 && !(this.arr[row][col].mine)){
			cell[row][col].className = 'clicked';
			if(row > 0){
				this.Expand(cell,row-1,col,dimension);
				if(col > 0){
					this.Expand(cell,row-1,col-1,dimension);
				}
				if(col > dimension-1){
					this.Expand(cell,row-1,col+1,dimension);
				}
			}
			if(col > 0){
				this.Expand(cell,row,col-1,dimension);
			}
			if(col < dimension-1){
				this.Expand(cell,row,col+1,dimension);
			}
			if(row < dimension-1){
				this.Expand(cell,row + 1,col,dimension);
				if(col > 0){
					this.Expand(cell,row+1,col-1,dimension);
				}
				if(col > dimension-1){
					this.Expand(cell,row+1,col+1,dimension);
				}
			}
		}//recursively calls for it to go out to all squares if there is no mine near it
	}
	placeBombs(bombsLeft, cellsLeft){
		if(bombsLeft > 0){
		 return(Math.random() <= (bombsLeft / cellsLeft));
	   }
	   return false;
	}
}
