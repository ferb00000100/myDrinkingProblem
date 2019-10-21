

$(document).ready(function () {
	var date = moment().format('MM/D/YYYY');
	$('.date').append(date);


	function favorites(x) {
		$('.add').on('click', function () {
			var selectedFav = $('<li>').text(x);

				});

	}



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
			array.forEach(function (e) {
				// console.log(e);
				$('.modal').modal({
					dismissible: true
				});

				var name = e.name;
				var number = e.phone;
				var state = e.state;
				var address = e.street;
				var url = e.website_url;
				var brewList = $('<p>');
				// brewName = $('<link>').text(name);
				// brewName.attr({type: 'button', class: 'brewName'});

				$('.brew-title').html(selectedState);
				$('.breweries').append(brewList);

				brewList.append(name + '<br>');
				brewList.append(address + ', ' + state + '<br>');
				brewList.append(url + '<br>');
				brewList.append(number);
				brewList.append('<hr>');
				$('.modal').modal('open');
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

