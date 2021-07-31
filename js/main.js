let x=y=25;
const SIZE=25;
   let figure = [];
      let posX=5;
      let posY=2;
  let speed=1000;

  //let keyStroke;
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
        var ctx = canvas.getContext('2d');}



// ctx.strokeRect(0,0,300,600);

function draw() {
      
     

        ctx.fillStyle = 'rgb(200, 0, 0)';
         ctx.strokeRect(0,0,SIZE*10, SIZE*25);
        ctx.fillRect(x, y, SIZE, SIZE);


 
      
    }


  function clear() {
    
    ctx.clearRect( x,  y, SIZE , SIZE);


  }



   // function move(e){console.log(e);}

let X=[];
 
for(let i=0; i<10; i++) { 
      X[i]= new Array();
      for (let j=0; j<25; j++){
        X[i][j]=0;
      }


}

function  gameOver(){
  time.clearInterval();
}



 // }
 
 function  drawSquare(x, y   ) {
        ctx.fillStyle = `rgb(0,0,0)`;
        ctx.fillRect(x*SIZE, y*SIZE, SIZE, SIZE);

 }

  function  drawEmptySquare(x, y   ) {
        ctx.fillStyle = `rgb(255, 0, 255)`;
        ctx.fillRect(x*SIZE, y*SIZE, SIZE, SIZE);

 }
  // function  clearSquare(x, y) {
  //       ctx.clearRect(x*SIZE, y*SIZE, SIZE, SIZE);

 //}


function addTetramino() {
  for (element of figure) {
  X[posX + element[0]][posY + element[1]] = 2;

}
}
function removeTetramino() {
  for (element of figure) {
  X[posX + element[0]][posY + element[1]] = 0;

}
}

function drawBoard(){
for (i=0;i<10;i++)
  for (let j=0;j<25; j++){
    if (X[i][j]!==0) drawSquare(i,j );
    else drawEmptySquare(i,j )

  }
 

 }

 function deleteRow(row){
  for (let j=row; j>0;j--){
    for(let i=0;i<10;i++){
      X[i][j]=X[i][j-1];
    }
  }

 }
function checkBoard() {
  
  for (let k=0 ; k<10; k++ ) {if (X[k][2]===1) {gameOver();break;}}

  for (let j=0;j<25; j++){
    count=0;
   for(let i=0;i<10;i++){
    count=X[i][j]+count;}
     if (count===10) deleteRow(j);
  }
 
    

}
 function addBoard() {
  for (element of figure) {
  X[posX + element[0]][posY + element[1]] = 1;}

  
 checkBoard();
 newTetramino=true;
}

function rotate(figure){
  for (let coord of figure){
    help=coord[0];
    coord[0]=-coord[1]
    coord[1]=help;
  }
}

function moveLeft(){
  if (figure.every(element=>{return (element[0]+posX-1)>=0}) && (figure.every(element => { return (X[posX + element[0]-1][posY + element[1]]) !==1}))) 
   {posX=posX-1};
}

function moveRigth(){

  if (figure.every(element=>{return (element[0]+posX+1)<10})  && (figure.every(element => {return (X[posX + element[0]+1][posY + element[1]]) !==1})))
     {posX=posX+1};
};

function moveDown(){
 if (figure.every(element=>{return (element[1]+posY+1)<24}) && (figure.every(element => {return (X[posX + element[0]][posY + element[1]+1]) !==1})))
  {posY=posY+1;}  
  else {addBoard();
        newTetramino=true;
        play();}


};


  let newTetramino=true;
 let tetramino;
     let keyStroke = window.addEventListener("keydown", function (event) {
      if (event.keyCode === 37) {removeTetramino() ; 
                                moveLeft();
                                addTetramino() ; 
                                drawBoard();
                                }
      if (event.keyCode === 38) { if (tetramino !==2 ) 
                                  {
                                  removeTetramino()   ;
                                 rotate(figure);   
                                   addTetramino();
                                   drawBoard()}
                                 }

      if (event.keyCode === 39) {{removeTetramino() ; 
                                moveRigth();
                                addTetramino() ; 
                                drawBoard();
                                }
                                }
      if (event.keyCode === 40) { removeTetramino() ;
                                  moveDown();
                                  addTetramino();
                                  drawBoard(); }
    });
   

  function play() {
  if (newTetramino){
   tetramino = Math.floor((Math.random()*7));
  
  console.log(tetramino);
     posX=5;
     posY=2;
   newTetramino=false;
   

  switch (tetramino) 
    {case 0: figure = [[-1,1], [0,1], [0,0] ,[1,0]]; //z
      break;
      case 1: figure = [[-1,-1], [0,-1], [0,0] ,[1,0]]; // reverse z
      break;
      case 2: figure = [[-1,1], [0,1], [-1,0] ,[0,0]]; // square
      break;
      case 3: figure = [[0,1], [0,0], [0,-1] ,[1,-1]]; //L
      break;
      case 4: figure = [[0,1], [0,0], [0,-1] ,[ -1,-1 ]]; // reverse L
      break;
      case 5: figure = [[-1,0], [0,0], [0,1] ,[1,0]]; //T
      break;
      case 6: figure = [[0, 2], [0, 1], [0,0] ,[0,-1]]; // I
       break;
    }
 
 

}
 

}
 let time=setInterval( ()=>{ play();

                            drawBoard();
                            removeTetramino(); 
                            moveDown(); 
                            addTetramino();
                            drawBoard() }, 
                            speed);

 