function drawBoard(dimension){
     let lastClicked;
     let grid = clickableGrid(dimension,dimension,function(el,row,col,i){
       el.className='clicked';
     });

     document.body.appendChild(grid);

     function clickableGrid( rows, cols, callback ){
       let i=0;
       let grid = document.createElement('table');
       grid.className = 'grid';
       for (let r=0; r<rows; r++){
         let tr = grid.appendChild(document.createElement('tr'));
         for (let c=0; c<cols; c++){
           let cell = tr.appendChild(document.createElement('td'));
           cell.addEventListener('click',(function(el,r,c,i){
             return function(){ callback(el,r,c,i); }
            })(cell,r,c,i),false);
         }
       }
       return grid;
     }
   }
