 let figure=[];
 let posX2;
 let posY2;
 let X2;
 let obj;
 let score;
 let arr=[];
onmessage = function(e) {
  
 
 
 function copyArr(arr) {
    res=[];
    for (let x=0; x<10;x++){
      res[x]=[...arr[x]];
    }
    return res;
 }


 switch (e.data[1]) 
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

 let X1=copyArr (e.data[0]);

  X2=copyArr(X1); 

function checkLeftEdge(figure){
  return  (figure.every(element=>{ return ( element[0]+posX2     )>=0})) 
  // let result=true;
  // for (let i=0;i< figure.length; i++) {
  //   if ((figure[i][0]+posX2)<0) return false;

  // }
   
  //  return result;
}

function checkRigthEdge(figure){
	return  (figure.every(element=>{return (element[0]+posX2) <10}))
}

function addTetramino1(figure=[]) {
   
  for (element of figure) {

  X2[posX2 + element[0]][posY2 + element[1]] = 2;
	}
}
function removeTetramino1() {
  for (element of figure) {
  X2[posX2 + element[0]][posY2 + element[1]] = 0;

}
}
function addBoard1() {
  for (element of figure) {
  X2[posX2 + element[0]][posY2 + element[1]] = 1;}
}

function drop(figure){
 
 if (figure.every(element=>{return (element[1]+posY2+1)<25}) && (figure.every(element => {return (X2[posX2 + element[0]][posY2 + element[1]+1]) !==1})))
  { removeTetramino1() ; posY2=posY2+1; addTetramino1(); drop(figure);}
  else  addBoard1();
 }

 function deleteRow1(row){
  for (let j=row; j>0;j--){
    for(let i=0;i<10;i++){
      X2[i][j]=X2[i][j-1];
    }
  }
}


function checkBoard1() {
   for (let j=0;j<25; j++){
    count=0;
   for(let i=0;i<10;i++){if (X2[i][j]!==0) count++;
    }
     if (count===10) deleteRow1(j);
  }
}


function rotate1(figure){
	if (e.data[1]!==2) {
  for (let coord of figure){
    help=coord[0];
    coord[0]=-coord[1]
    coord[1]=help;
  }
}
}
function checkBellow(x,y){
         let evl=0;
          for (let j=y; j<25; j++){
            if (X2[x][j] === 0) {evl=evl+(1000);}
          }

return evl;
}
  function checkHole(x){
     let  evl=0;
      for (let j=0; j<25  ; j++){
        if(X2[x][j] !== 0) {evl=evl+checkBellow(x,j); return evl;;} 
      }

      return evl;
  }


  function checkAbove(x,y){
         let evl=0;
          for (let j=y; j>0; j--){
            if (X2[x][j] !== 0) {evl=evl+(10 * (25-j) );}
          }
          return evl;
}

    function checkDepth(x){
     let  evl=0;
      for (let j=25; j>0  ; j--){
        if(X2[x][j] === 0) {evl=evl+checkAbove(x,j); return evl;} 
      }

      return evl;
  }


function evaluate(){
	let evl=0;
   
    // for (let i=0; i<10; i++) { evl=evl+checkHole(i);
                   // }
    // for (let i=0; i<10; i++) { evl=evl+checkDepth(i);
                   // }
 // let multiplyer=1;
  
 //    for (let j=0; j<25; j++){
 //      multiplyer=(25-j) *10;
 //      for (let i=0;i<10;i++){
 //      if (X2[i][j]!==0){
 //        evl=evl+multiplyer ;
 //      }
 //    }
 //  }
  




    for (let j=25;j>0;j--) {
      for (let i=0;i<10;i++) {
        if (X2[i][j] === 1) {evl= evl+  (26-j)*10  ;}
      }
    }

      return evl;
}

    function ply(){ 

    for (let rotation = 0; rotation<4;rotation++)
    	
    {	

    	posX2=5;
    	posY2=3;
    	l=0;
      if (rotation!==0) rotate1(figure);
    	do 
    {	X2=copyArr(X1); 
       
    	  	score=0;
			    posY2=3;
		  
			// addTetramino1(figure);
    		drop(figure);
    		checkBoard1();

    		 score= evaluate();
    		 obj={score, rotation, l}
    		 arr.push({...obj, vector:  'l'});
    		l=l+1;
        posX2--;
    		 	// console.log("L=",l, "X2= ",posX2) 
    		} while (checkLeftEdge(figure))
    		

    	posX2=5;
    	posY2= 3;
    	r=0;
 
    	while (checkRigthEdge(figure)){
    	X2=copyArr(X1); 
    		
    		score=0;
			posY2=3;
			 
			// addTetramino1(figure);
    		 drop(figure);
    		 checkBoard1();
    		 score = evaluate();
    		 obj={score, rotation, r}
    			arr.push({...obj, vector:  'r'});
    		  r=r+1;
    			posX2++;
          // console.log('R=',r)
    		}

    }
}
ply();


  arr.sort((a,b)=>{return a.score-b.score;});
  console.log(arr);


// console.log(arr[0]);
postMessage(arr[0]);
arr=[];
}




































 


