window.onload = dateJS;

function dateJS() {
	var	elDate = document.getElementById('date'),
		elOptions = document.getElementById('options'),
		dateFormats = ["MDY", "DMY", "YMD"],
		today = new Date();

	CreateOptions();
	DisplayDate();


	function DisplayDate(format) {
		var formattedDate = '';
		
		switch (format) {
			case "MDY":
				formattedDate += (today.getMonth() + 1) + "/"
					+ today.getDate() + "/"
					+ today.getFullYear();
				break;
			case "DMY":
				formattedDate += today.getDate() + "/"
					+ (today.getMonth() + 1) + "/"
					+ today.getFullYear();
				break;
			case "YMD":
				formattedDate += today.getFullYear() + "/"
					+ (today.getMonth() + 1) + "/"
					+ today.getDate();
				break;
			default:
				formattedDate += (today.getMonth() + 1) + "/"
					+ today.getDate() + "/"
					+ today.getFullYear();
				break;
		};
		elDate.innerHTML = formattedDate;
	}

	function CreateOptions() {
		if (elOptions) {
			//Create a radio button for each date format option in array
			for (var i = 0; i < dateFormats.length; i++) {
				var elDateFormat = document.createElement('input');
				var value = dateFormats[i];
				elDateFormat.name = 'dateFormats';
				elDateFormat.value = value;
				elDateFormat.type = 'radio';
				elDateFormat.onclick = function() {
					DisplayDate(this.value);
				};

				var label = document.createElement('label');
				label.appendChild(elDateFormat);
				label.appendChild(document.createTextNode(dateFormats[i]));

				var div = document.createElement('div');
				div.setAttribute('class', 'radio-inline');
				div.appendChild(label);
				elOptions.appendChild(div);
			};	
		}
		else {
			DisplayDate('MDY');
		};
	}

}