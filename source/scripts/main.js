// --------------------------------
// ** ATTENTION EVENT ORGANIZERS **
// add your groups to this array!
// find your group name by looking
// at your meetup group's url, and
// dont' forget the comma at the end
// --------------------------------
var meetups = [
	'A2-CocoaHeads',
	'A2-Cust-Experience',
	'A2-Cust-Support-Success',
	'A2-Experience-Design-with-Agile-Lean-UX',
	'a2-game-designers',
	'a2civictech',
	'a2entrepreneurs',
	'a2magento',
	'a2newtech',
	'Agile-Groupies',
	'allhandsactive',
	'Ann-Arbor-C-Meetup',
	'Ann-Arbor-Chapter-of-the-American-Statistical-Association',
	'Ann-Arbor-Design-Group',
	'Ann-Arbor-Detroit-NLPers-A2D-NLP',
	'Ann-Arbor-Detroit-Startup-Meetup',
	'Ann-Arbor-FinTech-Meetup',
	'Ann-Arbor-Gophers',
	'Ann-Arbor-Hadoop-User-Group-A2HUG',
	'Ann-Arbor-Mobile-Development-Meetup',
	'ann-arbor-php',
	'Ann-Arbor-PyLadies',
	'Ann-Arbor-R-User-Group',
	'Ann-Arbor-Raspberry-Pi-Projects',
	'Ann-Arbor-Scala-Enthusiasts-User-Group-Meeting',
	'Ann-Arbor-Web-Analytics-Wednesday',
	'AnnArborComputerSociety',
	'Apache-Apex-Ann-Arbor-Meetup',
	'AWS-Michigan',
	'Balanced-Team-Ann-Arbor',
	'connectedcar',
	'Craftsman-Guild',
	'Duo-Tech-Talks',
	'Ember-A2D',
	'Fanzoo-Learn-Something',
	'Free-Code-Camp-Ann-Arbor',
	'gdg-a3',
	'Girl-Develop-It-Ann-Arbor',
	'Machine-Learning-Data-Science-and-Industry',
	'Meteor-Ann-Arbor',
	'Michigan-Ethereum-Meetup',
	'midrupal',
	'MoMoa2',
	'Predictive-Analytics-S-E-Michigan',
	'Quantified-Self-Ann-Arbor',
	'SEM-JS',
	'Criteo-Labs-Tech-Talks-Ann-Arbor',
	'Ann-Arbor-Coffee-House-Coders',
	'Ann-Arbor-Software-Co-Workers',
	'PyData-Ann-Arbor',
	'AnnArborFP',
	'a2mobilitytech',
	'eCommerce-Ann-Arbor',
	'Product-Hunt-Ann-Arbor',
	'Nightlife-Arcade',
	'Power-User-Show-Tell',
	'orchestructure',
	'Write-the-Docs-A2',
	'a2a11y',
	'Crypto-Community',
	'Scaled-Agile-Framework-SAFe-Southeast-Michigan',
	'Build-Smarter-Continuous-Integration-Delivery-Quality',
	'Ann-Arbor-District-Library-Secret-Lab'
]

// ================================================================

// takes a meetup group id and gets an array of Meetup API events for that group
var getEventsForGroup = function(group, callback) {
	$.ajax({
		url: 'https://api.meetup.com/'+group+'/events',
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			format: "json"
		},
		success: function(response) {
			var events = response.data;

			// filter out dead meetup groups
			if (events.length > 0) {
				console.log('got '+events.length+' events for '+group);
				callback(null, events);
			} else {
				callback(null, []);
			}
		}
	});
}

// takes an array of events from the Meetup API and renders it to the DOM using FullCalendar
var renderCalendar = function(events) {

	// format Meetup API => FullCalendar
	var events = events.map(function(event){
		return({
			title: event['name'],
			start: new moment(event['time']),
			url: event['link'],
		});
	});

	// render with FullCalendar
	$('#calendar').fullCalendar({
		defaultDate: moment().format('YYYY-MM-DD'),
		editable: true,
		eventLimit: true,
		events: events,
		navLinks: true,
		eventClick: function(calEvent, jsEvent, view) {
			if (calEvent.url) {
				window.open(calEvent.url);
				return false;
			}
		}
	});

}

$(document).ready(function() {

	// COMMUNITY PAGE

	if (window.location.pathname.includes('community')) {
		// community page sticky sidebar
		$('.sticky').Stickyfill();
	}

	// CALENDAR PAGE

	// TODO - maybe get events by meetup category and zip?
	// currently fails because it needs an API key and we have no server atm
	// Cam says...
	// categories based on
	// https://secure.meetup.com/meetup_api/console/?path=/2/categories
	// We should be able to pass in category id as a parameter to the
	// Meetup API, but it still returns all events, not just tech (34)
	// events. I'll debug that more later.

	if (window.location.pathname.includes('calendar')) {

		// for each group, call getEventsForGroup and render the collective result
		async.map(meetups, getEventsForGroup, function(err, events) {

			if (err) {
				alert('Whoops, couldn\'t get a list of events--try again soon!')
				console.error('error', err)
			}

			// events is now an array of arrays of events (one array per group)
			// need to flatten it to a single array of events
			// https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
			var events = [].concat.apply([], events)

			renderCalendar(events)
		})
	}

});
