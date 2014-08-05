window.onload = clockJS;

function clockJS() {

	var elClock = document.getElementById('clock'),
		elOptions = document.getElementById('options'),
		timeFormatId = 'timeFormat',
		use24format = false;
	
	//Initialize
	CreateTimeFormatOption(); //Options must be added before display for hourformat to work
	AddHourFormatEventListener();
	DisplayTime();  //Added to avoid delay from setInterval on load
	StartClock();	

	function DisplayTime() {
		var time = new Date();
		var hours = HourFormat(time.getHours());
		var minutes = FormatBelowTen(time.getMinutes());
		var seconds = FormatBelowTen(time.getSeconds());

		elClock.innerHTML = hours + ":" + minutes + ":" + seconds;
	}

	function AddHourFormatEventListener() {
		elOptions.onclick = function() {
			use24format = Is24HourFormat();
			//Call displaytime again to instantly refresh the clock instead of waiting for next interval
			DisplayTime();
		};
	}

	function CreateTimeFormatOption() {
		var elTimeFormat = document.createElement('input');
		elTimeFormat.id = timeFormatId;
		elTimeFormat.type = 'checkbox';

		var label = document.createElement('label');
		label.htmlFor = timeFormatId;
		label.appendChild(elTimeFormat);
		label.appendChild(document.createTextNode('24 Hour time format'));

		//Can be removed and label appended directly if not using Bootstrap
		var div = document.createElement('div');
		div.setAttribute('class', 'checkbox-inline');
		div.appendChild(label);

		elOptions.appendChild(div);
	}

	function Is24HourFormat() {
		var elHourFormat = document.getElementById(timeFormatId);
		if (elHourFormat) {
			return elHourFormat.checked;
		}
		//If element is not found, assume 12 hour format
		else {
			return false;
		}
	}

	function HourFormat(hour) {
		//Default JS Date object format is 24 hours
		if (!use24format) {
			//Midnight
			if (hour === 0) {
				hour = 12;
			}
			//Afternoon
			else if (hour > 12) {
				hour -= 12;
			};
		};
		return hour;
	}

	function FormatBelowTen(i) {
		if (i < 10){
			i = "0" + i;
		};
		return i;
	}

	function StartClock() {
		var clock = setInterval(function() {
			DisplayTime();
		}, 1000);
	}

}