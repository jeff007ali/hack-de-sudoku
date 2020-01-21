window.onload=function(){
	var tbs=document.getElementsByClassName("tb");
	
	for(var i=0;i<tbs.length;i++)
	{
		tbs[i].addEventListener("keypress", function (evt) {
			if (evt.which < 48 || evt.which > 57)
			{
				evt.preventDefault();
			}
		});
	}
};

function solve(table){
	var current = {
            row: 0,
            col: 0
        }; 
	
	//if there is no blank place then Table is full -> return true
	if(!isBlankPlace(table,current))
		return true;
	
	//fill 1 to 9 places
	for(var num=1;num<=9;++num)
	{
		if(isValid(table,current.row,current.col,num))
		{
			//insert num 
			table[current.row][current.col]=num;
			//Recursion 
			if(solve(table))
				return true;
			//else remove inserted num and make it 0 again
			table[current.row][current.col]=0;
		}
	}
	// if can't solve
	return false;
}

//Make array of numbers which are present in Sudoku grid
function makeAnArray()
{
	var noOfArray = [];
		
	for(var i=0;i<9;i++)
	{
		var innerRow=[];
		for(var j=0;j<9;j++)
		{	
			var cellContent=getValue(i,j);
			innerRow.push(cellContent);
		}
		noOfArray.push(innerRow);
	}
	//var oriNoOfArray=noOfArray;
	sessionStorage.setItem("oriNoOfArray",JSON.stringify(noOfArray));
	
	if(!solve(noOfArray))
	{
		alert("Not able to solved !!");
	}
	else{
		var oriNoOfArray=JSON.parse(sessionStorage.getItem("oriNoOfArray"));
		fillupSudoku(noOfArray,oriNoOfArray);
	}
}

function getValue(row,col)
{
	var cv;
	var cellValue=document.getElementById('tb'+row+col).value;
	if(cellValue!="")
	{
		cv=parseInt(cellValue);
	}
	else{
		cv=0;
	}
	return cv;
}

function setValue(row,col,val,colour)
{
	if(val!=null && val!=undefined)
	{
		document.getElementById('tb'+row+col).value = val;
		document.getElementById('tb'+row+col).style.color=colour;
	}
}

//Check if black place is present or not
function isBlankPlace(table,current)
{
	for(var r=0;r<9;r++)
	{
		for(var c=0;c<9;c++)
		{
			if(table[r][c]==0)
			{
				current.row=r;
				current.col=c;
				return true;
			}
		}
	}
	return false;
}

//Is inserting num in particular cell is valid in row or column or inner box?
function isValid(table,r,c,num)
{
	return (!isPresentInRow(table, r, num) &&
            !isPresentInColumn(table, c, num) &&
            !isPresentInBox(table, r - r%3, c-c%3, num));
}

//Check num is present in Row
function isPresentInRow(table, r, num)
{
	for(var c=0;c<9;c++)
		if(table[r][c]==num)
			return true;
	return false;
}

//Check num is present in Column
function isPresentInColumn(table, c, num)
{
	for(var r=0;r<9;r++)
		if(table[r][c]==num)
			return true;
	return false;
}

//Check num is present in inner 3*3 box
function isPresentInBox(table,startR,startC,num)
{
    for(var r=0; r<3; r++)
        for(var c=0; c<3; c++)
            if(table[r+startR][c+startC] == num)
                return true;
    return false;
}

//Fill sudoku with complete solution
function fillupSudoku(updatedTable,originalTable)
{
	for(var r=0;r<9;r++)
	{
		for(var c=0;c<9;c++)
		{
			var n=updatedTable[r][c];
			var o=originalTable[r][c];
			
			if(n==o)
			{
				setValue(r,c,n,"black");
			}
			else{
				setValue(r,c,n,"red");
			}
		}
	}
}

//Clear sudoku
function clearSudoku()
{
	for(var r=0;r<9;r++)
	{
		for(var c=0;c<9;c++)
		{
			setValue(r,c,"","black");
		}
	}
}