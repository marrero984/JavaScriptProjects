window.onload = SimonSays;

function SimonSays() {
	//Initialize variables
	var	quads = document.getElementsByClassName('quad'),
		statusDisplay = document.getElementById('status'),
		startBttn = document.createElement('button'),
		colors = [],
		simonColors = [],
		clickCounter = 0;

	//Set up start button created in variables above
	//Button is created here instead of being added directly to the markup like the other elements because it makes it easier to attach the simonsTurn function.  Alternatives required defining the function globally to make it accessible outside of the scope of SimonSays
	startBttn.id = "startButton";
	startBttn.onclick = function() {
		simonsTurn();
	};
	startBttn.innerHTML = "Start";
	startBttn.setAttribute('class', 'btn btn-default');
	statusDisplay.appendChild(startBttn);

	for (var i = 0; i < 4; i++) {
		//Get quad ID's and assign as colors
		//This ensures quads can be named anything and will still match colors indices
		colors[i] = quads[i].id;
		quads[i].addEventListener("click", getColorClicked, false);
	};

	function getColorClicked() {
		//If color doesn't match Simon's reset all
		//Ideally would be broken out into a separate function to be reused by a reset button
		if (colors.indexOf(this.id) !== simonColors[clickCounter]) {
			statusDisplay.innerHTML = "Wrong  <br/>";
			simonColors = [];
			clickCounter = 0;
			statusDisplay.appendChild(startBttn);
		}
		//If correct and number of clicks is less than number of Simon's colors, 
		//	increment user's clicks
		else if (clickCounter !== simonColors.length - 1) {
			statusDisplay.innerHTML = "Correct...";
			clickCounter++;
		}
		//If correct and end of user's turn
		//	reset clickcounter, and start Simon's turn
		else {
			statusDisplay.innerHTML = "Simon's Turn.";
			clickCounter = 0;
			simonsTurn();
		};
	}//End of getColorClicked

	function addSimonColor() {
		//Adds random color index for Simon
		var i = Math.floor(Math.random() * 4);
		simonColors.push(i);
	}

	function flashColor(index) {
		var originalClass = quads[index].className;
		quads[index].className += " quadactive";
		setTimeout(function() {
	 		quads[index].className = originalClass;
		}, 1000);
	}

	function simonsTurn() {
		addSimonColor();
		var i = 0;
		var turn = setInterval(function() {
			//Flash only if 
			if (i < simonColors.length) {
				flashColor(simonColors[i]);
				i++;
			}
			else {
				clearInterval(turn);
				statusDisplay.innerHTML = "Your turn";
			};
		}, 1500);
	}

}//End SimonSays()