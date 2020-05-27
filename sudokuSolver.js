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
    
    // номер квадрата по координатам
	var getSquare = function(i,j){
		return 3*Math.trunc(i/3) + Math.trunc(j/3);
	}

	// проверяет корректность решения через сумму в строках, стобцах и квадратах
	var checkSolution = function(sudoku){
		
		// проверка столбцов и строк
		for (var i = 0; i < 9; i++){
			var row_sum = 0;
			var col_sum = 0;
			for (var j = 0; j < 9; j++){
				row_sum += sudoku[i][j];
				col_sum += sudoku[j][i];
			}
			if (row_sum !== 45 || col_sum !== 45) return false;
		}

		// проверка квадратов 
		for (var k = 0; k< 3; k++){
			for (var h = 0; h < 3; h++){

				var square_sum = 0;
				for (var i = 0; i < 3; i++){
					for (var j = 0; j < 3; j++){
						square_sum += sudoku[i + 3*k][j + 3*h];
					}
				}

				if (square_sum !== 45) return false;
			}
		}

		return true;
	}

	// нужно составить карту всех нулей и возможных их значений
	var zeroMap = [];
	var squareMap = Array.from(Array(9), () => new Array());

	// предварительно создадим наборы значений, которые могут быть в строке, столбце и квадрате
	var rowPossible  = Array(...Array(9)).map(() => (Array(...Array(9)).map(() => true)));
	var colPossible	= Array(...Array(9)).map(() => (Array(...Array(9)).map(() => true)));
	var squarePossible = Array(...Array(9)).map(() => (Array(...Array(9)).map(() => true)));

	// уберем из возможных значений те, что уже заполнены
	for (var i = 0; i < 9; i++){
		for (var j = 0; j < 9; j++){
			if (sudoku[i][j] > 0){
				rowPossible[i][sudoku[i][j] - 1] = false;
				colPossible[j][sudoku[i][j] - 1] = false;
				squarePossible[getSquare(i,j)][sudoku[i][j] - 1] = false;
			}
		}
	}
	
	var createZeroMap = function(){
		for (var i = 0; i < 9; i++){
			for (var j = 0; j < 9; j++){
				if (sudoku[i][j] == 0){
					var el = {
						row : i,
						col : j,
						square : getSquare(i,j),
						values : []
					}
					for (var k = 0; k < 9; k++){
						el.values.push(rowPossible[i][k] && colPossible[j][k] && squarePossible[el.square][k]);
					}
					zeroMap.push(el);
					squareMap[el.square].push(el);
				}
			}
		}
	}
	createZeroMap();
	
	while(zeroMap.length > 0){
		debugger;
		for (var i = 0; i< zeroMap.length; i++){
			var c = 0;
			var val = 0;
			for (var j = 0; j< 9;j++){
				if (zeroMap[i].values[j]) { c++; val = j;}
			}
			if (c == 1){
				sudoku[zeroMap[i].row][zeroMap[i].col] = val+1;
				rowPossible[zeroMap[i].row][val] = false;
				colPossible[zeroMap[i].col][val] = false;
				squarePossible[zeroMap[i].square][val] = false;
			}
		}

		for (var s = 0; s < 9; s++){
			for (var i = 0; i < 9; i++){
				var unique = 0;
				var si = 0;
				for (var v = 0; v < squareMap[s].length; v++){
					if (squareMap[s][v].values[i]) {
						unique++;
						if (unique == 1) si = v;
						else si = -1;
					} 
				}
				if (s == 0 && i == 8) debugger;
				if (si > -1 && unique > 0){
					sudoku[[squareMap[s][si].row]][squareMap[s][si].col] = i+1; 
				}
			}

		}

		zeroMap = [];
		squareMap = Array.from(Array(9), () => new Array());
		
		createZeroMap();
	}

	console.timeEnd('sudokuSolver');
	console.table(sudoku);
	return checkSolution(sudoku);
}