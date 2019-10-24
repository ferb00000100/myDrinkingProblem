

$(document).ready(function () {

	// Display the date and Time
	var dateTime = moment().format('LLL');
	$('.date').append(dateTime);


	// Incomplete Need to add favorites
	// function saveFavorites(index) {
	// 	myClass = index;
	// 	console.log(index);
	// 	var selectedFav = $('<p>')
	// 	$('#favorites').append(selectedFav);
	//
	// 	$(myClass).append(selectedFav);

			// ' <a class="btn-floating btn-small waves-effect waves-light #1065A8"><i' +
			// ' class="remove material-icons">-</i></a>' + '<br>');

	// }

	// getResults will run the Ajax query to grab the state selected brewery information.
	// it will open a modal with the results.  Once it is closed the data will be removed.
	function getResults(selectedState) {
		var baseBrewerydbURL = "https://api.openbrewerydb.org/breweries?by_state=" + selectedState;
		$.ajax({
			url: baseBrewerydbURL,
			method: "GET"
		}).then(function (response) {
			// console.log(response);
			var array = response;
			var breweryArray = [];
			array.forEach(function (e, i) {
				i = JSON.stringify(i);
				// console.log("this is i "+ i);
				// console.log("this is e "+ e.name);
				$('.modal').modal({
					dismissible: true
				});

				var name = e.name;
				var number = e.phone;
				var state = e.state;
				var address = e.street;
				var url = e.website_url;
				var breweries = $('<div data-index=' + i + '>');
				var brewList = $('<p>');

				// Append the <p> to the <div>
				breweries.append(brewList);

				// Format phone number
				number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
				$('.brew-title').html(selectedState);

				// $('.brew-title').html(selectedState);
				// $('.breweries').append(brewList);

				// Verify address,  If not print "No Address Provided"
				if (address === ''){
					address = 'No Address Provided';
				}
				// brewList.append(name + '<br>');
				// Add data-index to assocaite the button to the paragraph
				brewList.append(name + ' <a data-index=' + i + ' class="add btn-floating btn-small waves-effect' +
					' waves-light' +
					' red"><i' +
					' class="material-icons">+</i></a>' + '<br>');
				brewList.append(address + ', ' + state + '<br>');
				brewList.append('<a id="link" href="'+ url +'" target="_blank" >view web site</a>'+'<br>');
				brewList.append(number);
				brewList.append('<hr>');
				$('.breweries').append(breweries);

				$('.modal').modal('open');

				var breweryObject = {state:state, breweryName:name, breweryUrl:url, breweryPhone:number};
				breweryArray.push(breweryObject);

			});

			// debugging
			// console.log(breweryArray[1]);
			$('.add').on('click', function () {
				// var selectedIndex = $(this);

				//This will grab the value of the index
				var selectedIndex = $(this).data('index');
				// console.log(selectedIndex);
				console.log(breweryArray[selectedIndex]);
			});

		});

	}

	// getState will take the input of the selector and run the getResults function
	function getState() {

		var selectedState = $("select#states").val();
		// console.log(selectedState);
		getResults(selectedState);
	}

// on selection of the city the get State function runs.
	$("select").change(getState);

// this function clears out the breweries from previous searches to avoid stacking
	$('.modal-close').on('click', function () {
		$('.breweries').empty();
	});


});


