window.onload = ListJS;

function ListJS() {
	var listDiv = document.getElementById('list'),
		formDiv = document.getElementById('form');

	//List and input are used across multiple functions, so I put in global space to make available without having to getElement each time I use them
	var list = document.createElement('table'),
		input = document.createElement('input');

	//Functions to be performed on pageload
	createForm();
	createListHeader();
	listDiv.appendChild(list);

	function createForm() {
		//Using div instead of form to avoid page reload on submit
		var form = document.createElement('div'),
			addBtn = document.createElement('button');

		form.setAttribute('class', 'form-inline');
		input.setAttribute('class', 'form-control');
		addBtn.setAttribute('class', 'btn btn-primary btn');

		addBtn.addEventListener('click', addRow, false);
		
		addBtn.appendChild(document.createTextNode('Add Item'));
		form.appendChild(input);
		form.appendChild(addBtn);
		formDiv.appendChild(form);
	}

	function createListHeader() {
		//insertCell and insertRow do not work with thead and th elements
		var thead = list.createTHead(),
			firstCell = document.createElement('th'),
			secondCell = document.createElement('th');

		list.setAttribute('class', 'table');
		firstCell.setAttribute('class', 'col-md-10');
		firstCell.appendChild(document.createTextNode('Item'));
		secondCell.appendChild(document.createTextNode('Delete Button'));

		thead.appendChild(firstCell);
		thead.appendChild(secondCell);		
	}

	function addRow() {	
		var newRow = list.insertRow(),
			itemCell = newRow.insertCell(0),
			delCell = newRow.insertCell(1);

		//Should do some sort of input validation
		itemCell.appendChild(document.createTextNode(input.value));

		clearInput();

		//Could break this out into another function, but cannot think of where I would reuse this
		var delBtn = document.createElement('button');
		delBtn.setAttribute('class', 'btn btn-danger btn-sm');
		delBtn.appendChild(document.createTextNode('Delete'));
		delBtn.addEventListener('click', deleteRow, false);

		delCell.appendChild(delBtn);

		input.focus();
	}

	function clearInput() {
		input.value = null;
	}

	function deleteRow() {
		//Using parentNode requires specific markup; getParentByTag removed that requirement
		//var rowIndex = this.parentNode.parentNode.rowIndex;
		var rowIndex = getParentByTag(this, 'tr').rowIndex;
		list.deleteRow(rowIndex);		
	}

	function getParentByTag(el, tag) {
		//Checks for parent element with specified tag
		//Should add a check so if el is not inside desired element it does not error out
		if (el.parentNode.tagName.toLowerCase() === tag) {
			return el.parentNode;
		}
		else {
			return getParentByTag(el.parentNode, tag);
		};
	}

}