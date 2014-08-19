window.onload = Calendar;

function Calendar() {

	//All variables can be created in a single statement, but I broke them up for my ability to read it
	var elCalendar = document.getElementById('calendar'),
		elMonthOpt = document.getElementById('monthOpt'),
		elYearOpt = document.getElementById('yearOpt');

	//Month select and year input elements are created here to make available to multiple functions within script without passing as parameter
	var monthSelect = document.createElement('select'),
		monthlyCalendar = document.createElement('table'),
		yearInput = document.createElement('input');

	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		today = new Date();

	//Functions called onload
	addCalendar();

	//All functions that append to page should be called here
	function addCalendar() {
		createMonthSelect();
		createYearInput();
		createUpdateButton();
		createMonthlyCalendar(today.getMonth(), today.getFullYear());
	}

	function getDaysInMonth(month, year) {
		var totalDays;
		switch(month) {
			//January, March, May, July, August, October, December
			case 0:
			case 2:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
				totalDays = 31;
				break;
			//April, June, September, November
			case 3:
			case 5:
			case 8:
			case 10:
				totalDays = 30;
				break;
			//February: check if leap year
			case 1:
				if (isLeapYear) {
					totalDays = 29;
				}
				else {
					totalDays = 28;
				};
				break;
		};
		return totalDays;
	}//End getDaysInMonth

	function isLeapYear(year) {
		var leapYear;
		if (year % 400 === 0) {
			leapYear = true;
		}
		else if (year % 100 === 0) {
			leapYear = false;
		}
		else if (year % 4 === 0) {
			leapYear = true;
		}
		else {
			leapYear = false;
		};
		return leapYear;
	}//End isLeapYear

	function getMonthName(i) {
		return months[i];
	}

	function getDayName(i) {
		return days[i];
	}

	//Returns the number of calendar weeks in requested month
	function getWeeksInMonth (month, year) {
		var numOfDays = getDaysInMonth(month, year),
			firstDayIndex = new Date(year, month, 1).getDay();
		//Always round up to account for incomplete weeks
		return Math.ceil((numOfDays + firstDayIndex) / 7);
	}

	function createMonthlyCalendar (month, year) {
		var firstDayIndex = new Date(year, month, 1).getDay(),
			numOfWeeks = getWeeksInMonth(month, year),
			numOfDays = getDaysInMonth(month, year);

		//Clear our any prior calendar data
		monthlyCalendar.innerHTML = '';
		monthlyCalendar.id = 'monthlycalendar';
		//Dependent on Bootstrap 3.0 for formatting
		monthlyCalendar.setAttribute('class', 'table table-striped');

		//Create row for each calendar week
		var cells = [];
		for (var i = 0; i < numOfWeeks; i++) {
			var week = monthlyCalendar.insertRow(i);
			for (var j = 0; j < 7; j++) {
				var day = week.insertCell(j);
				cells.push(day);
			};
		};

		//x is equivalent of i - firstDayIndex; used for day part of date
		var x = 1;
		//Start looping at index of first day so that first day is put on correct day of week
		for (var i = firstDayIndex; i < numOfDays + firstDayIndex; i++) {
			//Assign x as date
			cells[i].innerHTML = x;
			cells[i].id = getDateId(x, month, year);
			//Class is assigned here and not when cells are created to avoid tagging unfilled cells
			cells[i].setAttribute('class', 'date');
			x++;
		};

		//Create header row with day of week
		var thead = monthlyCalendar.createTHead();
		var headRow = thead.insertRow(0);
		for (var i = 0; i < 7; i++) {
			var day = headRow.insertCell(i);
			day.innerHTML = days[i].toString().substring(0,2);
		};
		
		elCalendar.appendChild(monthlyCalendar);
	}//End createMonthlyCalendar

	function getDateId(day, month, year) {
		return year + BelowTenFormat(month) + BelowTenFormat(day);
	}

	function createMonthSelect() {
		//Select element created at beginning of script to be available to multiple functions without being passed as a parameter
		for (var i = 0; i < 12; i++) {
			var month = document.createElement('option');
			month.text = months[i];
			month.value = i;
			monthSelect.add(month);
		};

		monthSelect.onchange = function() {
			elCalendar.removeChild(monthlyCalendar);
			createMonthlyCalendar(monthSelect.selectedIndex, yearInput.value);
		};

		monthSelect.value = today.getMonth();
		
		elMonthOpt.appendChild(monthSelect);
	}

	function createYearInput() {
		yearInput.value = today.getFullYear();
		//Stlying changes are not necessary
		yearInput.style.textAlign = 'center';
		yearInput.style.width = '75px';
		
		elYearOpt.appendChild(yearInput);
	}

	function createUpdateButton() {
		var updateBtn = document.createElement('button');
		//Bootstrap dependency
		updateBtn.setAttribute('class', 'btn btn-primary btn-sm inline');
		updateBtn.innerHTML = 'Update Year';

		updateBtn.onclick = function() {
			elCalendar.removeChild(monthlyCalendar);
			createMonthlyCalendar(monthSelect.selectedIndex, yearInput.value);
		};

		elYearOpt.appendChild(updateBtn);
	}

}

function BelowTenFormat(i) {
	if (i < 10)
		i = "0" + i;
	return i;
};