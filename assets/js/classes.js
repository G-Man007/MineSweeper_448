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
		this.numberField(height,width);
    }
	numberField(height,width)
	{
		for(let i=0; i<height; i++)
		{
			for(let j=0; j<width; j++)
			{
				if(this.arr[i][j].mine){
					if(i > 0){
						this.arr[i-1][j].adjminenum++;
						if(j > 0){
							this.arr[i-1][j-1].adjminenum++;
						}
						if(j < width-1){
							this.arr[i-1][j+1].adjminenum++;
						}
					}
					if(j > 0){
						this.arr[i][j-1].adjminenum++;
					}
					if(j < width-1){
						this.arr[i][j+1].adjminenum++;
					}
					if(i < height-1){
						this.arr[i+1][j].adjminenum++;
						if(j > 0){
							this.arr[i+1][j-1].adjminenum++;
						}
						if(j < width-1){
							this.arr[i+1][j+1].adjminenum++;
						}
					}
				}
			}
		}
	}
	Click(cell,row,col,i, height, width){
		if(!(this.endgame)){
			if(this.arr[row][col].mine == true){
				cell[row][col].className = 'bomb';
				this.ShowBombs(cell, height, width);
				this.endgame = true;
				window.alert("You Lose");
			}
			else if(this.arr[row][col].adjminenum == 0){
				this.Expand(cell,row,col,i,height, width);
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
	ShowBombs(cell, height, width){
		for(let i = 0; i<height; i++){
			for(let j = 0; j<width; j++){
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

		}
	}
	Expand(cell, row, col, i, height, width) {
		if(cell[row][col].className == 'clicked' || cell[row][col].className == 'clicked1'|| cell[row][col].className == 'clicked2' || cell[row][col].className == 'clicked3'|| cell[row][col].className == 'clicked4'|| cell[row][col].className == 'clicked5'
		 || cell[row][col].className == 'clicked6' || cell[row][col].className == 'clicked7' || cell[row][col].className =='clicked8'){
			return;
		}
		if(this.arr[row][col].adjminenum == 0 && !(this.arr[row][col].mine)){
			cell[row][col].className = 'clicked';
			if(row > 0){
				this.Expand(cell,row-1,col,i,height, width);
				if(col > 0){
					this.Expand(cell,row-1,col-1,i,height, width);
				}
				if(col < width-1){
					this.Expand(cell,row-1,col+1,i,height, width);
				}
			}
			if(col > 0){
				this.Expand(cell,row,col-1,i,height, width);
			}
			if(col < width-1){
				this.Expand(cell,row,col+1,i,height, width);
			}
			if(row < height-1){
				this.Expand(cell,row + 1,col,i,height, width);
				if(col > 0){
					this.Expand(cell,row+1,col-1,i,height, width);
				}
				if(col < width-1){
					this.Expand(cell,row+1,col+1,i,height, width);
				}
			}
		}//recursively calls for it to go out to all squares if there is no mine near it
		else if(!(this.arr[row][col].mine)) {
			this.Click(cell, row, col, i, height, width);
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
