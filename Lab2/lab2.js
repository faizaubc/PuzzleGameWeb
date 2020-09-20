var classNames= [];
var pic3=[];
var pic4=[];
var pic8=[];
var master=[];
var dimensionsize = 3;

class Cell{
     row;
    col;
    url;
    display = true;
    constructor(row, col, url, display )
    {
        this.row = row;
        this.col = col;
        this.url= url;
        this.display = display;
    }
    Show()
    {   var image = document.getElementById("id"+this.row+'_'+this.col);       
        if(this.display)
            image.src= this.url;
        else
            image.src="";
    }
    Bind()
    {    
        var image = document.getElementById("id"+this.row+'_'+this.col);
        var capture = this;
        onkeydown= function(e){       
            let x=0;
            let y=0;
            var obj = FindEmpty(); 
            for (var i = 0; i < dimensionsize; i++) { 
                for (var j = 0; j < dimensionsize; j++) {
                   if( classNames[i][j]==obj)
                   {
                        y =j;
                        x=i;
                        console.log(x+','+y);
                   }               
                }
            }
            if(e.keyCode==40)
            x= x-1;
            else if (e.keyCode==38)
            x = x+1;
            else if (e.keyCode ==39)
            y = y-1;
            else if (e.keyCode ==37)
            y = y+1;      
            if(x >= dimensionsize || y >=dimensionsize ||y < 0 ||x < 0)
            return; 
            else
            {
                var newo= classNames[x][y];
                var temp = obj.url;
                obj.url= newo.url;
                obj.display= true;
                newo.url = temp;
                newo.display= false;
                ShowStatus();
                ShowGrid();
            }
        }
            image.onclick = function(){
                var obj = FindEmpty();              
                console.log("OBJ URL:" +obj.url);
                console.log("This URL:" +capture.url);
                var temp = obj.url;
                 obj.url= capture.url;
                 obj.display= true;
                 capture.url = temp;
                 capture.display= false;
                 ShowStatus();
                 ShowGrid();
                 
              }
    }  
}
function FindEmpty()
{
    for (var i = 0; i < dimensionsize; i++) { 
    for (var j = 0; j < dimensionsize; j++) {
        if(classNames[i][j].display==false)
          return classNames[i][j];      
    }
}
}
window.onload = function(){
    this.LoadImages();
   document.getElementById('brand').onchange= NewPuzzle;
   document.getElementById('checkABS').onclick= ShowOriginal;
}
function ShowOriginal()
{
    document.getElementById("pics").innerHTML = "";
    var grid1 = []; 
    for (var i = 0; i < dimensionsize; i++) {
        grid1.push( [] ); 
        for (var j = 0; j < dimensionsize; j++) {
            let pic;
            pic = new Cell(master[i][j].row, master[i][j].col, master[i][j].url,true);      
            grid1[i].push(pic);    
            var x = document.createElement("img");
            x.setAttribute("id", "id"+master[i][j].row+'_'+master[i][j].col);
            document.getElementById('pics').appendChild(x); 
        }
    }
    if(document.getElementById('checkABS').checked)
    {
    for (var i = 0; i < dimensionsize; i++) { 
        for (var j = 0; j < dimensionsize; j++) {
            master[i][j].Show();
        }
    }
    }
}

function  LoadImages()
{   
    document.getElementById('checkABS').checked= false;
    var sel = document.getElementById('brand');
    for (var i = 0; i < 3; i++)
    {
       for (var j = 0; j < 3; j++)
        {
            let x="./images/images/"+'3'+'-'+i+'-' + j+".png";
            pic3.push(x); 
        }
    }
   
    for (var i = 0; i < 4; i++)
    {
       for (var j = 0; j < 4; j++)
        {
            let x="./images/images/"+'4'+'-'+i+'-' + j+".png" ;
            pic4.push(x ); 
        }
    }
  
    for (var i = 0; i < 8; i++)
    {
       for (var j = 0; j < 8; j++)
        {
            let x="./images/images/"+'8'+'-'+i+'-' + j +".png";
            pic8.push(x); 
        }
    }

     if(sel.selectedIndex ==0)
     dimensionsize = 3;
    else if(sel.selectedIndex ==1)
     dimensionsize = 4; 
    else  if(sel.selectedIndex ==2)
     dimensionsize = 8;
}

function NewPuzzle()
{
    var sel = document.getElementById('brand');
    document.getElementById("pics").innerHTML = "";
    var master1 = [];
  
if(sel.selectedIndex ==0)
    dimensionsize = 3;
else if(sel.selectedIndex ==1)
    dimensionsize = 4;
else  if(sel.selectedIndex ==2)
    dimensionsize = 8;
 
    for (var i = 0; i <dimensionsize; i++) { 
        master1.push( [] );
    } 
if(dimensionsize ==3)
{
    for (var i = 0; i < dimensionsize; i++) { 
 
        for (var j = 0; j < dimensionsize; j++) {
            let val = i*dimensionsize + j; 
            let pic = new Cell(j, i, pic3[val],true);
            master1[i].push(pic);           
        }
    }
    
}
else if (dimensionsize ==4)
{
    for (var i = 0; i < dimensionsize; i++) { 
 
        for (var j = 0; j < dimensionsize; j++) {
            let val = i*dimensionsize + j; 
            let pic = new Cell(j, i, pic4[val],true);
            master1[i].push(pic); 
         
        }
    }
}
else if (dimensionsize ==8)
{
    for (var i = 0; i < dimensionsize; i++) { 

        for (var j = 0; j < dimensionsize; j++) {
            let val = i*dimensionsize + j; 
            let pic = new Cell(j, i, pic8[val],true);
            master1[i].push(pic); 
           
        }
    }
}

    for( var i = 0; i < master1.length; i++)
    {
        master[i]=master1[i].slice(); 
    }
   var working1= [];
   for( var i = 0; i < master1.length; i++)
   {
       working1[i]=master1[i].slice(); 
   }
    working = shuffle(working1);
    var grid1 = []; 

    for (var i = 0; i < dimensionsize; i++) {
        grid1.push( [] ); 
        for (var j = 0; j < dimensionsize; j++) {
            let pic;
            if(i == dimensionsize-1 && j == dimensionsize-1)           
                pic = new Cell(working[i][j].row, working[i][j].col, working[i][j].url,false);           
            else          
            pic = new Cell(working[i][j].row, working[i][j].col, working[i][j].url,true);          
            grid1[i].push(pic); 
                 
            var x = document.createElement("img");
            x.setAttribute("id", "id"+working[i][j].row+'_'+working[i][j].col);
            document.getElementById('pics').appendChild(x); 
           
        }
    }
   var newdiv = document.getElementById('pics');

   if(dimensionsize ==3)
    newdiv.style.setProperty('grid-template-columns',`repeat(${dimensionsize},${164}px)`);
  if(dimensionsize == 4)
  newdiv.style.setProperty('grid-template-columns',`repeat(${dimensionsize},${122}px)`);
 if(dimensionsize ==8)
 newdiv.style.setProperty('grid-template-columns',`repeat(${dimensionsize},${62}px)`);

 classNames= grid1.slice();
 for (var i = 0; i < dimensionsize; i++) { 
    for (var j = 0; j < dimensionsize; j++) {
        classNames[i][j].Bind();     
    }
}
 ShowGrid();
}
function ShowStatus()
{
    let count = 0;
    for (var i = 0; i < dimensionsize; i++) { 
        for (var j = 0; j < dimensionsize; j++) {
            if(classNames[i][j].url == master[i][j].url)
            {
                    count ++;
            }
        }
    }
    if(count == dimensionsize*dimensionsize)
    {
     for (var i = 0; i < dimensionsize; i++) { 
        for (var j = 0; j < dimensionsize; j++) {
            classNames[i][j].display = true;
        }
        }
    }
    ShowGrid();
}
function ShowGrid()
{
    for (var i = 0; i < dimensionsize; i++) { 
        for (var j = 0; j < dimensionsize; j++) {
            console.log(classNames[i][j].url);
            classNames[i][j].Show();
           
        }
    }
}
function shuffle(array) {
   for(var i= 0; i < array.length ;i ++ )
   {
       for(var j = 0; j < array[i].length; j++){
       var i1= Math.floor(Math.random()* array.length);
       var j1 =Math.floor( Math.random()*array[i].length);

       var temp = array[i][j];
       array[i][j]= array[i1][j1];
       array[i1][j1]= temp;
       }
   }
   return array;
  }
  
