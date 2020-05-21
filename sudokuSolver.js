var sudokuSolver = function(){
	console.time('sudokuSolver');
	var sudoku = [[5,3,0,0,7,0,0,0,0],
				  [6,0,0,1,9,5,0,0,0],
				  [0,9,8,0,0,0,0,6,0],
				  [8,0,0,0,6,0,0,0,3],
				  [4,0,0,8,0,3,0,0,1],
				  [7,0,0,0,2,0,0,0,6],
				  [0,6,0,0,0,0,2,8,0],
				  [0,0,0,4,1,9,0,0,5],
				  [0,0,0,0,8,0,0,7,9]];

	var getSquare = function(i,j){
		if (i < 3){
			if (j < 3){
				return 1;
			}
			else if (j < 6){
				return 2;
			}
			else{
				return 3;
			}
		}
		else if (i < 6){
			if (j < 3){
				return 4;
			}
			else if (j < 6){
				return 5;
			}
			else{
				return 6;
			}
		}
		else {
			if (j < 3){
				return 7;
			}
			else if (j < 6){
				return 8;
			}
			else{
				return 9;
			}
		}
	}
	// нужно составить карту всех нулей и возможных их значений
	var zeroMap = [];

	// предварительно создадим наборы значений, которые могут быть в строке, столбце и квадрате
	var rowPossible	= [[true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],

					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],

					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true]];

	var colPossible	= [[true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],

					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],

					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true]];

	var squarePossible=[[true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],

					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],

					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true],
					   [true,true,true,  true,true,true,  true,true,true]];
	
	for (var i = 0; i < 9; i++){
		for (var j = 0; j < 9; j++){
			if (sudoku[i][j] > 0){
				rowPossible[i][sudoku[i][j] - 1] = false;
				colPossible[j][sudoku[i][j] - 1] = false;
				squarePossible[getSquare(i,j) - 1][sudoku[i][j] - 1] = false;
			}
		}
	}

	for (var i = 0; i < 9; i++){
		for (var j = 0; j < 9; j++){
			//console.log(sudoku[i][j]);
			if (sudoku[i][j] == 0){
				var el = {
					row : i,
					col : j,
					square : getSquare(i,j),
					values : []
				}
				for (var k = 0; k < 9; k++){
					el.values.push(rowPossible[i][k] && colPossible[j][k] && squarePossible[el.square - 1][k]);
				}
				zeroMap.push(el);
			}
		}
	}

	for (var i = 0; i< zeroMap.length; i++){
		var c = 0;
		var val = 0;
		for (var j = 0; j< 9;j++){
			if (zeroMap[i].values[j]) { c++; val = j;}
		}
		if (c == 1){
			console.log(zeroMap[i].row +1, zeroMap[i].col +1, val +1);
		}
	}
	debugger;
}

	console.timeEnd('sudokuSolver');