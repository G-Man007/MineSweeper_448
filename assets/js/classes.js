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
		this.endgame = false;
		let cells = height * width;
		let cellsLeft = height * width;

        for(let i = 0; i < height; i++){
            this.arr.push([0]);
            for(let j = 0; j < width; j++){
                this.arr[i][j] = new Tile();
				this.arr[i][j].mine = this.placeBombs(numBombs,cellsLeft);
				cellsLeft--;
				if(this.arr[i][j].mine == true){
						numBombs--;
				}
            }
        }//populates the array couldn't get adding mines to work
		this.numberField();
    }
	numberField()
	{
		for(let i=0; i<this.height; i++)
		{
			for(let j=0; j<this.width; j++)
			{
				if(this.arr[i][j].mine){
					if(i > 0){
						this.arr[i-1][j].adjminenum++;
						if(j > 0){
							this.arr[i-1][j-1].adjminenum++;
						}
						if(j < this.width-1){
							this.arr[i-1][j+1].adjminenum++;
						}
					}
					if(j > 0){
						this.arr[i][j-1].adjminenum++;
					}
					if(j < this.width-1){
						this.arr[i][j+1].adjminenum++;
					}
					if(i < this.height-1){
						this.arr[i+1][j].adjminenum++;
						if(j > 0){
							this.arr[i+1][j-1].adjminenum++;
						}
						if(j < this.width-1){
							this.arr[i+1][j+1].adjminenum++;
						}
					}
				}
			}
		}
	}
	Click(cell,row,col){
		if(!(this.endgame)){
			if(this.arr[row][col].mine == true){
				cell[row][col].className = 'bomb';
				this.ShowBombs(cell);
				this.endgame = true;
				window.alert("You Lose\nClick reset to try again");
			}
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
			}//need statements for if the adjacent mines are >0 but works now
		}
	}
	ShowBombs(cell){
		for(let i = 0; i<this.height; i++){
			for(let j = 0; j<this.width; j++){
				if(this.arr[i][j].mine){
					cell[i][j].className = 'bomb';
				}
			}
		}
	}
	Flag(x,y) {
		this.arr[x][y].flag = true;
		flags --;
		if(flags == 0) {
			Checkflags();
		}
	}
	Checkflags(){
		for(let i = 0; i<this.height; i++){
			for(let j = 0; j<this.width; j++){
				if(this.arr[i][j].mine && !(this.arr[i][j].flag)){
					return;
				}
			}
		}
		window.alert("You Win\nClick reset to play again");
		this.endgame = true;
	}
	Expand(cell, row, col) {
		if(cell[row][col].className == 'clicked' || cell[row][col].className == 'clicked1'|| cell[row][col].className == 'clicked2' || cell[row][col].className == 'clicked3'|| cell[row][col].className == 'clicked4'|| cell[row][col].className == 'clicked5'
			|| cell[row][col].className == 'clicked6' || cell[row][col].className == 'clicked7' || cell[row][col].className =='clicked8'){
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
				this.Expand(cell,row + 1,col);
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
	placeBombs(bombsLeft, cellsLeft){
		if(bombsLeft > 0){
			return(Math.random() <= (bombsLeft / cellsLeft));
		}
		return false;
	}
}
