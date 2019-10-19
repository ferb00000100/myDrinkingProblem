

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
	var baseBrewerydbURL ="https://api.openbrewerydb.org/breweries?";
	// var baseBrewerydbURL ="https://api.openbrewerydb.org/breweries?by_city=denver";
	var brewerydb = baseBrewerydbURL;



	$.ajax({
		url: brewerydb,
		method: "GET"
	}).then(function (response) {
		console.log(response);
		response = JSON.stringify((response));
		$('#city').text(response);
		// for ( var i = 0; i < 10; i++){
		// console.log(response.restaurants[i]);
		// console.log(response.restaurants[i].restaurant.name);
		// console.log(response.restaurants[i].establishment[i]);
		// }
	});

$('.demo').dropkick({

	/**
	 * Called once after the DK element is inserted into the DOM.
	 * The value of `this` is the Dropkick object itself.
	 *
	 * @config initialize
	 * @type Function
	 *
	 */
	initialize() {},

	/**
	 * Whether or not you would like Dropkick to render on mobile devices.
	 *
	 * @default false
	 * @property {boolean} mobile
	 * @type boolean
	 *
	 */
	mobile: true,

	/**
	 * Called whenever the value of the Dropkick select changes (by user action or through the API).
	 * The value of `this` is the Dropkick object itself.
	 *
	 * @config change
	 * @type Function
	 *
	 */
	change() {},

	/**
	 * Called whenever the Dropkick select is opened. The value of `this` is the Dropkick object itself.
	 *
	 * @config open
	 * @type Function
	 *
	 */
	open() {},

	/**
	 * Called whenever the Dropkick select is closed. The value of `this` is the Dropkick object itself.
	 *
	 * @config close
	 * @type Function
	 *
	 */
	close() {},

	// Search method; "strict", "partial", or "fuzzy"
	/**
	 * `"strict"` - The search string matches exactly from the beginning of the option's text value (case insensitive).
	 *
	 * `"partial"` - The search string matches part of the option's text value (case insensitive).
	 *
	 * `"fuzzy"` - The search string matches the characters in the given order (not exclusively).
	 * The strongest match is selected first. (case insensitive).
	 *
	 * @default "strict"
	 * @config search
	 * @type string
	 *
	 */
	search: "strict",

	/**
	 * Bubble up the custom change event attached to Dropkick to the original element (select).
	 */
	bubble: true

});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
// 	$('#dropdown').on(ontoggle)
// 	document.getElementById("myDropdown").classList.toggle("show");
// }

// Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
// 	if (!event.target.matches('.dropbtn')) {
// 		var dropdowns = document.getElementsByClassName("dropdown-content");
// 		var i;
// 		for (i = 0; i < dropdowns.length; i++) {
// 			var openDropdown = dropdowns[i];
// 			if (openDropdown.classList.contains('show')) {
// 				openDropdown.classList.remove('show');
// 			}
// 		}
// 	}
// }