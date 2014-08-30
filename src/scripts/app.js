var showModal = function() {
    var modal = $('#modal');
    modal.trigger('openModal');
    modal.find('.counter').text("4");
    var timer;
    var decreaseCounter = function() {
        clearTimeout(timer);
        var counter = modal.find('.counter').text();
        counter = parseInt(counter);
        if (isNaN(counter)) {
            return;
        }
        if (counter === 1) {
            modal.trigger('closeModal');
            $('#modal').find('.counter').text("NaN");
            window.location.href = 'http://ya-dizayner.livejournal.com/';
        } else {
            counter = counter - 1;
            $('#modal').find('.counter').text(counter);
            timer = setTimeout(decreaseCounter, 1000);
        }
    };
    timer = setTimeout(decreaseCounter, 1000);
};

$(document).ready(function() {

    "use strict";

    $(function() {
        $('#modal').easyModal({
            top: 100,
            overlayOpacity: 0.3,
            overlayColor: "#333",
            onClose: function() {
                $('#modal').find('.counter').text("NaN");
            }
        });
    });

    $(".fancybox").fancybox();

    $('.fancybox-thumbs').fancybox({
        prevEffect : 'none',
        nextEffect : 'none',

        closeBtn  : true,
        arrows    : true,
        nextClick : true,

        helpers : {
            title: {
                type: "inside"
            },
            thumbs : {
                width  : 50,
                height : 50
            }
        }
    });

    setupVerticalMenu();
});
