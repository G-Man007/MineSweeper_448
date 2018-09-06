class Tile {
	constructor(){
		this.mine = false;
		this.flag = false;
		this.adjminenum = 0;
		this.cell = 0;
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
		let x = new Tile();
        for(let i = 0; i < width; i++){
            this.arr.push([0]);
            for(let j = 0; j < height; j++){
                this.arr[i][j] = x;
            }
        }
    }
	Click(element,row,col,i,dimension){
		if(element.field.arr[row][col].adjminenum == 0 && element.field.arr[row][col].mine != true){
			element.field.Expand(element,row,col,dimension);
		}
        else if(element.field.arr[row][col].mine == true){
        	element.className = 'bomb';
		}
	}
	Flag(x,y) {
		this.arr[x][y].flag = true;
		flags --;
		if(flags == 0) {

		}
	}
	Expand(element, row, col, dimension) {
		if(element.className == 'clicked'){
			console.log("you did it");
			return;
		}
		if(element.field.arr[row][col].adjminenum == 0){
			element.className = 'clicked';
			if(row > 0){
				element.field.Expand(this.arr[row-1][col].cell,row-1,col,dimension);
				if(col > 0){
					element.field.Expand(this.arr[row-1][col-1].cell,row-1,col-1,dimension);
				}
				if(col > dimension-1){
					element.field.Expand(this.arr[row-1][col+1].cell,row-1,col+1,dimension);
				}
			}
			if(col > 0){
				element.field.Expand(this.arr[row][col-1].cell,row,col-1,dimension);
			}
			if(col < dimension-1){
				element.field.Expand(this.arr[row][col+1].cell,row,col+1,dimension);
			}
			if(row < dimension-1){
				element.field.Expand(this.arr[row+1][col].cell,row + 1,col,dimension);
				if(col > 0){
					element.field.Expand(this.arr[row+1][col-1].cell,row+1,col-1,dimension);
				}
				if(col > dimension-1){
					element.field.Expand(this.arr[row+1][col+1].cell,row+1,col+1,dimension);
				}
			}
		}
	}
}
