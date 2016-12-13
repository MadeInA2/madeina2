$(document).ready(function() {

	// sticky sidebar on Community page
	$('.sticky').Stickyfill();

	var base_events_url = "https://api.meetup.com/2/open_events";
	var params = 'callback=?&sign=true&zip=48103&fields=category';
	var api_key = '1';
	var feed_url = base_events_url + '?' + params + '&' + api_key;
	events = [];
	$.getJSON(feed_url, function (data) {
        console.log(data.results.length + ' events returned');

		var printed = false;
		for(var i=0; i<data.results.length; i++) {
			// categories based on
			// https://secure.meetup.com/meetup_api/console/?path=/2/categories
			// We should be able to pass in category id as a parameter to the
			// Meetup API, but it still returns all events, not just tech (34)
			// events. I'll debug that more later.
			if(data.results[i].group.category.id != 34) {
				if(!printed) {
					console.log('Removing events');
					printed = true;
				}
				data.results.splice(i, 1);
				i--;
				continue;
			}
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
