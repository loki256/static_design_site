$(document).ready(function() {
    "use strict";

    function Model() {

        this.enableMap = {};

        this.testElement = function(category, name) {
            return this.enableMap[category] == name;
        };

        this.setElement = function(category, name) {
            this.enableMap[category] = name;
        };

        var headerId = $('#header-content .header-content-label').attr('id');
        this.setElement('header-content', headerId);

        var verticalId = $('#vertical-content .vertical-label').attr('id');
        this.setElement('vertical-content', verticalId);

        var mainId = $('#main-content .main-label').attr('id');
        this.setElement('main-content', mainId);

        this.isEnabled = function(name) {
            if (this.enableMap[name]) {
                return true;
            }
            return false;
        };

        $(".header-menu a").bind("click", function(event) {
            var name = event.target.text;
            var action = actions.getAction(name);
            if (action) {
                action();
            }
            return false;
        });

        $("#vertical-content a").bind("click", function(event) {
            var action = actions.getAction(event.target.alt);
            if (action) {
                action();
            }
            return false;
        });
    }

    var reinitModel = function() {
        model = new Model();
    };


    function Actions() {

        this._callback_map = {};

        this._ajaxRequest = function(url, selector, callback) {
            $.ajax({
                url: url,
                dataType: "html",
                async: false,
                success: function(msg) {
                    $(selector).html(msg);
                    if (callback) {
                        callback();
                    }
                }
            });
        };

        this._testDomAjaxWrapper = function(category, id, url, selector) {
            if (!model.testElement(category, id)) {
                context._ajaxRequest(url, selector, function() {
                    model.setElement(category, id);
                    reinitModel();
                });
            }
        };

        var context = this;

        this._callback_map['Галлерея'] = function() {
            context._testDomAjaxWrapper(
                'main-content',
                'maincontent_photo',
                'public/maincontent_photo.html',
                '#main-content');
            context._testDomAjaxWrapper(
                'vertical-content',
                'verticalcontent_proj',
                'public/verticalcontent_proj.html',
                '#vertical-content');
            context._testDomAjaxWrapper(
                'header-content',
                'photo_headercontent',
                'public/photo_headercontent.html',
                '#header-content');
        };

        this._callback_map['Проектирование'] = function() {
            context._testDomAjaxWrapper(
                'main-content',
                'text_maincontent',
                'public/text_maincontent.html',
                '#main-content');
            context._testDomAjaxWrapper(
                'vertical-content',
                'verticalcontent_stuff',
                'public/verticalcontent_stuff.html',
                '#vertical-content');
            context._testDomAjaxWrapper(
                'header-content',
                'photo_headercontent',
                'public/photo_headercontent.html',
                '#header-content');
        };

        this._callback_map['Декор'] = function() {
        };

        this._callback_map['Проект 1'] = function() {
            context._testDomAjaxWrapper(
                'header-content',
                'headercontent_proj1',
                'public/project1/headercontent.html',
                '#header-content');

            context._testDomAjaxWrapper(
                'main-content',
                'maincontent_proj1',
                'public/project1/maincontent.html',
                '#main-content');

            context._testDomAjaxWrapper(
                'vertical-content',
                'verticalcontent_proj1',
                'public/project1/verticalcontent.html',
                '#vertical-content');
        };

        this._callback_map['Проект 2'] = function() {
            context._testDomAjaxWrapper(
                'header-content',
                'headercontent_proj2',
                'public/project2/headercontent.html',
                '#header-content');

            context._testDomAjaxWrapper(
                'main-content',
                'maincontent_proj2',
                'public/project2/maincontent.html',
                '#main-content');

            context._testDomAjaxWrapper(
                'vertical-content',
                'verticalcontent_proj2',
                'public/project2/verticalcontent.html',
                '#vertical-content');
        };

        this.getAction = function(name) {
            return this._callback_map[name];
        };
    }

    var actions = new Actions();
    var model;
    reinitModel();

    setupVerticalMenu();
    actions.getAction('Галлерея')();
    //actions.getAction('Проектирование')();
    //actions.getAction('Проект 1')();

});
