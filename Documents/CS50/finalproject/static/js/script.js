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
	
	function computer() {
		
	}

	control();

	$('.restart').click(function() {
		control();
	});
});
