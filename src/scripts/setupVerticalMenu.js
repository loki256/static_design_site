var setupVerticalMenu = function() {

    var scrollStep = 140;

    (function($) {
        $.fn.hasHorizontalScrollBar = function() {
            // dom way didn't work because of ajax
            return this.children().length >= 9;
        };
    })(jQuery);

    if (!$('.horizontal-content').hasHorizontalScrollBar()) {
        $('.scroll-left').hide();
        $('.scroll-right').hide();
    } else {
        $('.scroll-left').show();
        $('.scroll-right').show();
    }


    var scrollMenuLeft = function() {
        $(".horizontal-content").scrollTo('-=' + scrollStep + 'px', {axis:"x"});
    };

    var scrollMenuRight = function() {
        $(".horizontal-content").scrollTo('+=' + scrollStep + 'px', {axis:"x"});
    };

    $(".scroll-left").bind("click", function(event) {
        event.preventDefault();
        scrollMenuLeft();
    });

    $(".scroll-right").bind("click", function(event) {
        event.preventDefault();
        scrollMenuRight();
    }).mousedown(function(event) {
        console.log("scroll left");
        scrollMenuRight();
    });


    $('.horizontal-content').bind("mousewheel", function(event) {
        event.preventDefault();
        if (event.originalEvent.wheelDelta == "120") {
            scrollMenuLeft();
        } else {
            scrollMenuRight();
        }
    });
};

