var setupVerticalMenu = function() {

    var scrollStep = 140;

    var scrollMenuUp = function() {
        $("#vertical-content").scrollTo('-=' + scrollStep + 'px', {axis:"y"});
    };

    var scrollMenuDown = function() {
        $("#vertical-content").scrollTo('+=' + scrollStep + 'px', {axis:"y"});
    };

    $("#scrollUp").bind("click", function(event) {
        event.preventDefault();
        scrollMenuUp();
    });

    $("#scrollDown").bind("click", function(event) {
        event.preventDefault();
        scrollMenuDown();
    });

    $("#scrollDown").mousedown(function(event) {
        console.log("scrollDown");
        scrollMenuDown();
    });


    $('#vertical-content').bind("mousewheel", function(event) {
        event.preventDefault();
        if (event.originalEvent.wheelDelta == "120") {
            scrollMenuUp();
        } else {
            scrollMenuDown();
        }
    });
};

