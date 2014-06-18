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
            return false;
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

        this._callback_map['Галлерея'] = function() {
            context._domAjaxWrapper(
                'Галлерея',
                'public/gallery.html');
        };

        this._callback_map['Проектирование'] = function() {
            context._domAjaxWrapper(
                'Проектирование',
                'public/development.html');
        };

        this._callback_map['Декор'] = function() {
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

    actions.getAction('Галлерея')();
    //actions.getAction('Проектирование')();
    //actions.getAction('Проект 1')();

});
