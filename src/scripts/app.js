$(document).ready(function() {

    "use strict";

    $(function() {
        $('#modal').easyModal({
            top: 100,
            overlayOpacity: 0.3,
            overlayColor: "#333",
            onClose: function() {
                $('#modal .counter').text("NaN");
            }
        });
    });

    function Model(state) {

        this.state = state;

        this.setState = function(id) {
            this.state = id;
        };

        this.testState = function(id) {
            return this.state == id;
        };

        $(".header-menu a").unbind("click").bind("click", function(event) {
            var name = $(event.target).text();
            var action = actions.getAction(name);
            if (action) {
                action();
            }
            return false;
        });

        $(".horizontal-content a").unbind("click").bind("click", function(event) {
            var action = actions.getAction(event.target.alt);
            if (action) {
                action();
            }
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
    }

    var reInitModel = function(state) {
        model = new Model(state);
        setupVerticalMenu();
    };


    function Actions() {

        this._callback_map = {};
        this._ajaxRequest = function(url, callback) {
            $.ajax({
                url: url,
                dataType: "html",
                async: false,
                success: function(msg) {
                    if ($(".body", msg).length) {
                        $(".body").replaceWith($(".body", msg));
                    }
                    if ($(".header-content", msg).length) {
                        $(".header-content").replaceWith($(".header-content", msg));
                    }
                    if ($(".main-content", msg).length) {
                        $(".main-content").replaceWith($(".main-content", msg));
                    }
                    if ($(".horizontal-content", msg).length) {
                        $(".horizontal-content").replaceWith($(".horizontal-content", msg));
                    }

                    if (callback) {
                        callback();
                    }
                }
            });

        };

        this._domAjaxWrapper = function(url) {
            var id = url;
            if (!model.testState(id)) {
                context._ajaxRequest(url, function() {
                    model.setState(id);
                    reInitModel(id);
                });
            }
        };

        var context = this;

        this._callback_map['Галерея'] = function() {
            context._domAjaxWrapper('public/gallery.html');
        };

        this._callback_map['Обо мне'] = function() {
            context._domAjaxWrapper('public/about.html');
        };

        this._callback_map["Контакты"] = function() {
            context._domAjaxWrapper('public/contacts.html');
        };

        this._callback_map['Декор'] = function() {
        };

        this._callback_map['Блог'] = function() {
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

        this._callback_map['Проект 1'] = function() {
            context._domAjaxWrapper('public/project1/content.html');
        };

        this._callback_map['Проект 2'] = function() {
            context._domAjaxWrapper('public/project2/content.html');
        };

        this.getAction = function(name) {
            return this._callback_map[name];
        };
    }

    var actions = new Actions();
    var model = new Model(null);

    actions.getAction('Галерея')();
});
