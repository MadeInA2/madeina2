$(document).ready(function() {

	// sticky sidebar on Community page
	$('.sticky').Stickyfill();

	var base_events_url = "https://api.meetup.com/2/open_events";
	var params = 'callback=?&sign=true&zip=48103';
	var api_key = '1';
	var feed_url = base_events_url + '?' + params + '&' + api_key;
	events = [];
	$.getJSON(feed_url, function (data) {
		for(var i=0; i<data.results.length; i++) {
			let item = data.results[i];
			var event = {
				title: item['name'],
				start: new moment(item['time']),
				url: item['event_url'],
			}
			events.push(event);
		}

		$('#calendar').fullCalendar({
			defaultDate: moment().format('YYYY-MM-DD'),
			editable: true,
			eventLimit: true,
			events: events,
			navLinks: true,
			eventClick: function(calEvent, jsEvent, view) {
				$(this).css('border-color', 'red');
			}
		});
	});
});
