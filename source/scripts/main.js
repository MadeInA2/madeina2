$(document).ready(function() {

	// sticky sidebar on Community page
	$('.sticky').Stickyfill();

	const base_events_url = "https://api.meetup.com/2/open_events";
	const params = 'callback=?&sign=true&zip=48103';
	const api_key = '1';
	const feed_url = base_events_url + '?' + params + '&' + api_key;
	events = [];
	$.getJSON(feed_url, function (data) {
		for(var i=0; i<data.results.length; i++) {
			let item = data.results[i];
			const event = {
				title: item['name'],
				start: new Date(item['time']),
				url: item['event_url'],
			}
			events.push(event);
		}

		$('#calendar').fullCalendar({
			defaultDate: '2016-10-22',
			editable: true,
			eventLimit: true,
			events: events,
			navLinks: true,
			eventClick: function(calEvent, jsEvent, view) {
				console.log('Event: ' + calEvent.title);
				console.log('View: '+ view.name);
				$(this).css('border-color', 'red');
			}
		});
	});
});
