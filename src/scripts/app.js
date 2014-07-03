$(document).ready(function() {
    
    "use strict";

    function Model(state) {

        this.state = state;

        this.setState = function(id) {
            this.state = id;
        };

        this.testState = function(id) {
            return this.state == id;
        };

        $(".header-menu a").bind("click", function(event) {
            var name = event.target.text;
            var action = actions.getAction(name);
            if (action) {
                action();
            }
            return false;
        });

        $(".vertical-content a").bind("click", function(event) {
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
                    if ($(".vertical-content", msg).length) {
                        $(".vertical-content").replaceWith($(".vertical-content", msg));
                    }

                    if (callback) {
                        callback();
                    }
                }
            });

        };

        this._domAjaxWrapper = function(id, url) {
            if (!model.testState(id)) {
                context._ajaxRequest(url, function() {
                    model.setState(id);
                    reInitModel(id);
                });
            }
        };

        var context = this;

        this._callback_map['Галерея'] = function() {
            context._domAjaxWrapper(
                'Галерея',
                'public/gallery.html');
        };

        this._callback_map['Обо мне'] = function() {
            context._domAjaxWrapper(
                'Обо мне',
                'public/about.html');
        };

        this._callback_map["Контакты"] = function() {
            context._domAjaxWrapper(
                'Контакты',
                'public/contacts.html');
        };

        this._callback_map['Декор'] = function() {
        };

        this._callback_map['Блог'] = function() {
            window.location.href = 'http://ya-dizayner.livejournal.com/';
        };

        this._callback_map['Проект 1'] = function() {
            context._domAjaxWrapper(
                'project1',
                'public/project1/content.html');
        };

        this._callback_map['Проект 2'] = function() {
            context._domAjaxWrapper(
                'project2',
                'public/project2/content.html');
        };

        this.getAction = function(name) {
            return this._callback_map[name];
        };
    }

    var actions = new Actions();
    var model;
    reInitModel();

    //actions.getAction('Галлерея')();
    actions.getAction('Обо мне')();
    //actions.getAction('Проект 1')();

});
