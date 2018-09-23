window.onload = function () {
	var imgs = document.querySelectorAll(".memory-table tr td img");
	
	lucky();
	addIDs(imgs);
	showAll();

	imgs.forEach(function(img) {
		img.onclick = actionClick;
	});
}

var cardsIDs = [];
var clickedIDs = [];
var firstClick = -1;
var secondClick = -1;
var counter = 0;
var pairs = [
	[1,  2],
	[3,  4],
	[5,  6],
	[7,  8],
	[9,  10],
	[11, 12],
	[13, 14],
	[15, 16],
	[17, 18],
	[19, 20],
	[21, 22],
	[23, 24]
];


function showAll() {
	var cards_length = document.querySelectorAll(".memory-table tr td img").length;

	for (var i = 0; i < cards_length; i++) {
		showCard(i + 1);
	}

	setTimeout(function() {
		for (var i = 0; i < cards_length; i++) {
			hideCard(i + 1);
		}
	}, 2000);
}


function showCard(id) {
	if (this.id != undefined || this.id != null)
		id = this.id;
	
	var card = document.getElementById(id);
	card.src = "img/cards/" + card.id + ".png";
}


function hideCard(id) {
	if (this.id != undefined || this.id != null)
		id = this.id;
	
	var card = document.getElementById(id);
	card.src = "img/default/background.png";
}


function swapCard() {
	var imgA = document.getElementById(firstClick);
	var imgB = document.getElementById(secondClick);
	
	if (check()) {
		imgA.style.opacity = 0.2;
		imgB.style.opacity = 0.2;
		clickedIDs.push(firstClick);
		clickedIDs.push(secondClick);
	} else {
		setTimeout(function(){
			imgA.src = "img/default/background.png";
			imgB.src = "img/default/background.png";
		}, 500);
	}
	
	counter = 0;
	firstClick = -1;
	secondClick = -1;
}


function actionClick(e) {
	
	if (firstClick == -1) {
		firstClick = this.id;
	} else {
		secondClick = this.id;
	}

	if (invalidClick(firstClick)) {
		firstClick = -1;
		return;
	} else if (invalidClick(secondClick)) {
		secondClick = -1;
		return;
	} else if (firstClick == secondClick) {
		// TODO...
	}

	showCard(this.id);
	counter++;

	if (counter == 2) {
		swapCard();
	}

	if (gameOver()) {
		happyAnimation();
	}
}


function invalidClick(click) {
	var invalid = false;
	for (i = 0; i < clickedIDs.length; i++) {

		if (clickedIDs[i] == click) {
			invalid = true;
			break;
		}
	}

	return invalid;
}


function lucky() {
	while(cardsIDs.length < 24){
		var id = Math.floor(Math.random() * 24)+1;

		if(cardsIDs.indexOf(id) == -1)
			cardsIDs.push(id);
	}
}


function addIDs(elements) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].id = cardsIDs[i];
	}
}


function check() {
	var IDA = firstClick;
	var IDB = secondClick;
	var matchID = -1;

	for (var i = 0; i < pairs.length; i++) {
		if (IDA == pairs[i][0]) {
			matchID = pairs[i][1];
			break;
		}
		else if (IDA == pairs[i][1]) {
			matchID = pairs[i][0];
			break;
		}
	}

	if (IDB == matchID) {
		return true;
	} else {
		return false;
	}
}

function gameOver() {
	return clickedIDs.length/2 == pairs.length;
}

function happyAnimation() {
	var cards = document.querySelectorAll(".memory-table tr td img");
	var index = 1;
	
	cards.forEach(function(card) {
		setDelay(index, card);
		index++;
	});

	var bg = document.getElementsByTagName("body")[0];
	bg.style.background = "rgb(59, 0, 77)";
}

function setDelay(i, card) {
	setTimeout(function(){
		card.style.opacity = 1;
		card.src = card.src = "img/happy/" + (i) + ".png";
	}, 300 * i);
}
