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
        this.arr = [];
		let cells = height * width;
		let x = new Tile();
        for(let i = 0; i < width; i++){
            this.arr.push([x]);
            for(let j = 0; j < height; j++){
                this.arr[i][j] = x;
				/*if(numBombs > 0){
	                this.arr[i][j].mine = Math.random() <= (numBombs / cells));
					numBombs --;
	            }
				cells --;*/
            }
        }
		while(numBombs > 0){
			for(let i = 0; i < width; i++){
	            for(let j = 0; j < height; j++){
					this.arr[i][j].mine = false;
					numBombs --;
	            }
	        }
		}
    }
	//console.log(numBombs);
}
