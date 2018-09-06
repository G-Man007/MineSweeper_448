class mineField {
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.arr = [];
        for(let i = 0; i < width; i++){
            this.arr.push([false]);
            for(let j = 0; j < height; j++){
                this.arr[i][j] = false;
            }
        }
    }
}
