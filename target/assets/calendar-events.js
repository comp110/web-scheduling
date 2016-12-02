$(document).ready(function() {
	// Setup scheduler event handlers
	scheduler.attachEvent("onEventDrag", function(id, mode, e) {
		console.log(id);
		console.log(mode);
		console.log(e);
	});

	// Don't let users edit events by double clicking
	scheduler.attachEvent("onDblClick", function (id, e){
    	e.preventDefault();
	})
});