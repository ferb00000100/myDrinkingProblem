

$(document).ready(function () {

	// Display the date and Time
	var dateTime = moment().format('LLL');
	$('.date').append(dateTime);


	// Assign the click event to the <ul> tag so you only have one click event.  If you assigned it to the
	// <li> tag you would have a click event for every <li> element added affecting performance.
	// You specify the "selector", in this case "li" in the on click function. The li element will bubble up
	// to the parent to get the click event.

	$('#favoriteList').on('click', 'li', function () {
		// event.preventDefault();
		$(this).fadeOut(500);
		var brewery = this.childNodes[2];

		console.log(brewery);
		localStorage.removeItem(localStorage.key(this));

	});
	function init() {
		for(var i =0; i < localStorage.length; i++){
			var getFavBrew = localStorage.getItem(localStorage.key(i));
			// console.log(localStorage.getItem(localStorage.key(i)));
			// var outputFavBrew = getFavBrew[1];
			// console.log(getFavBrew);
			var mylist = $('#favoriteList');
			var favBrew = $('<li>');

			$('.favorites').append(mylist);
			mylist.append(favBrew);
			// favBrew.append(name + ' <a data-index=' + i + ' class="btn-floating btn-small' +
			favBrew.append(name + ' <a data-index='+ i +' class="btn-floating btn-small' +
				' waves-effect' +
				' brown' +
				' darken-1"><i' +
				' class="material-icons">-</i></a>' );
			favBrew.append(getFavBrew);
		}
	}
	function saveFavs(breweryArray){
		// debugging
		// console.log(breweryArray);
		$('.add').on('click', function () {
			// var selectedIndex = $(this);
			//This will grab the value of the index
			var selectedIndex = $(this).data('index');
			var selectedState = breweryArray[selectedIndex].state;
			// console.log(selectedIndex);
			// console.log(breweryArray[selectedIndex]);
			var favBrewName = breweryArray[selectedIndex].breweryName;
			var favBrewUrl = breweryArray[selectedIndex].breweryUrl;
			var favBrew = $('<li>');
			// favBrew.append('<a id="link" href="'+ favBrewUrl +'" target="_blank" >' + favBrewName + '</a>'+'<br>');
			$('.favorites').append(favBrew);
			favBrew.append(name + ' <a data-index=' + selectedIndex + ' class="btn-floating btn-small' +
				' waves-effect' +
				' brown' +
				' darken-1"><i' +
				' class="material-icons">-</i></a>');
			favBrew.append(favBrewName);
			// localStorage.setItem(selectedState, favBrewName);
			// var storageIndex = selectedIndex * 13;
			// var id = selectedState+selectedIndex;
			// var storageItem = [{id: selectedState + selectedIndex, name:favBrewName}];
			// localStorage.setItem(id , JSON.stringify(storageItem));

			localStorage.setItem(selectedState + selectedIndex, favBrewName);


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

			saveFavs(breweryArray);

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

	init();
});


