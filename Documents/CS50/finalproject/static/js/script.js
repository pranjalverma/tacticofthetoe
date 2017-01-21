/*
 * Main js script for tacticofthetoe.com
 *
 * CS50 Final Project
 * author: Pranjal Verma
 *
 */

$(function() {

	var player,
	player1 = 'x', 
	player2 = 'o', 
	board,
	turn,
	totalBoxes = 9,
	win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

	function switchPlayer() {
		turn = !turn;

		if (player === player1) 
			player = player2;
		else if (player === player2)
			player = player1;
	}

	function control() {
	 	$('.board').children().children().removeClass();

	 	$('.restart').children().removeClass().addClass('btn btn-lg btn-default');
	 	board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	 	player = player1;
	 	turn = true; /* for player1 */

	 	for (var i = 0; i < totalBoxes; i++) {
			$('.box._' + i).one('click', function() {
				board[i] = turn ? 1 : -1;
				$(this).children().addClass(player);

				endGame();
				switchPlayer();
			});
		}
	}

	function endGame() {
		for (var i = 0; i < win.length; i++) {
			var wset = win[i],
				check = board[wset[0]] + board[wset[1]] + board[wset[2]];

			if (check === 3 || check === -3) {
				gameOver(check === 3 ? player1 : player2);
				return true;
			}
		}

		var count = 0;
		for(var j = 0; j < totalBoxes; j++) {
			if (board[j] !== 0) {
				count++;
			}
		}

		if (count === 9) {
			gameOver('tie');
			return true;
		}
		return false;
	}

	function gameOver(string) {
		if (string === player1 || string === player2)
			alert(string + ' won!');
		else if (string === 'tie') 
			alert("It's a tie!");
	}

	function computerPlay() {
        if (isGameOver()) {
            return;
        }
        var i,
            j,
            k,
            max,
            chosen,
            firstSquare,
            count = 0;
        turn = false;
        updateTurn();
        playAudio('note-high');
        for (i = totalSquares; i--;) {
            if (board[i] !== 0) {
                count++;
                if (count === 1) {
                    firstSquare = i;
                }
            }
        }
        if (count < 2 && Math.random() > 0.2) {
            do {
                chosen = Math.floor(Math.random() * totalSquares);
            } while (chosen === firstSquare);
        } else {
            for (i = totalSquares; i--;) {
                for (j = totalSquares; j--;) {
                    if (board[j] !== 0) {
                        continue;
                    }
                    board[j] = 1;
                    if (isGameOver()) {
                        updateBoard(player2, j);
                        return;
                    }
                    board[j] = 0;
                }
                if (board[i] !== 0) {
                    continue;
                }
                board[i] = 1;
                var min = null,
                    temp = board.concat();
                for (j = totalSquares; j--;) {
                    if (temp[j] !== 0) {
                        continue;
                    }
                    temp[j] = -1;
                    for (k = win.length; k--;) {
                        if (temp[win[k][0]] + temp[win[k][1]] + temp[win[k][2]] === -3 && Math.random() > playerChance) {
                            board[i] = 0;
                            board[j] = 1;
                            updateBoard(player2, j);
                            isGameOver();
                            return;
                        }
                    }
                    var max2 = 0,
                        min2 = 0,
                        tempMax = temp.concat(),
                        tempMin = temp.concat();
                    for (k = totalSquares; k--;) {
                        if (tempMax[k] === 0) {
                            tempMax[k] = 1;
                        }
                        if (tempMin[k] === 0) {
                            tempMin[k] = -1;
                        }
                    }
                    for (k = win.length; k--;) {
                        if (tempMax[win[k][0]] + tempMax[win[k][1]] + tempMax[win[k][2]] === 3) {
                            max2++;
                        }
                        if (tempMin[win[k][0]] + tempMin[win[k][1]] + tempMin[win[k][2]] === -3) {
                            min2++;
                        }
                    }
                    var d = max2 - min2;
                    min = min == null ? d : (min > d ? d : min);
                    temp[j] = 0;
                }
                if (max == null || max < min) {
                    max = min;
                    chosen = i;
                }
                board[i] = 0;
            }
        }
        board[chosen] = 1;
        updateBoard(player2, chosen);
        isGameOver();
    }

	control();

	$('.restart').click(function() {
		control();
	});
});
