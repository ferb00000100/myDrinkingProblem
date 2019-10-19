

// Parameters
// by_city
// by_name
// by_state
// by_type
// by_tag
// by_tags
// sort  + for ascending - for descending comma separated  example: sort=-name,+type,city

	var city = 'denver';
	var name = '';
	var state = '';
	var type = '';
	var tag = '';
	var tags = '';
	var byCity = 'by_city';
	var byName = 'by_name';
	var byState = 'by_state';
	var byType = 'by_type';
	var byTag = 'by_tag';
	var byTags = 'by_tags';
	var selection = [];
	// var baseBrewerydbURL ="https://api.openbrewerydb.org/breweries?";
	// var brewerydb = baseBrewerydbURL;


	function outputResults() {


	}

	function getResults(selectedState){
		var baseBrewerydbURL ="https://api.openbrewerydb.org/breweries?by_state="+selectedState;
		$.ajax({
		url: baseBrewerydbURL,
		method: "GET"
		}).then(function (response) {
			console.log(response);
			outputResults = {
				"Name": response[0].name,
				"Phone Number": response[0].phone,
				"State": response[0].state,
				"Address": response[0].street,
				"Web URL": response[0].website_url
			}
		console.log(outputResults);
		// response = JSON.stringify((response));
		});
	}

	function getState() {
		var selectedState = $( "select#states" ).val();
		// console.log(selectedState);
		getResults(selectedState);
	}

$( "select" ).change( getState );
// getState();

// test


