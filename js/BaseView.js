/* 
 * Created on : Sep 21, 2015
 * Author     : gmanor
 */

define(['jquery', 'underscore', 'backbone.marionette', 'backbone', 'HeaderView'],
        function ($, _, Marionette, Backbone, HeaderView) {
            var view = Marionette.View.extend({
                tagName: 'div',
                className: 'clearfix baseContainer',
                viewParams: {},
                events: {
                },
                initialize: function (args) {
                    var self = this;
                    this.render();
                },
                childViews: [],
                close: function (e) {
                    var self = this;
                    for (var i = 0; i < self.childViews.length; i++) {
                        self.childViews[i].remove();
                    }
                    self.remove();
                    self.unbind();
                },
                header: null,
                pageTitle: "Default",
                template: "",
                render: function () {
                    var self = this;
                    if (self.headerSettings && self.headerSettings.hide === false) {
                        self.header = new HeaderView(self.headerSettings);
                        self.childViews.push(self.header);
                    }
                    if (window.analytics) {
                        window.analytics.trackView(self.pageTitle);
                    }
                    self.$el.html(_.template(self.template)(self.viewParams));
                    _.defer(function () {
                        self.afterRender();
                    });
                    return this;
                },
                afterRender: function () {
                }
            });
            return view;
        });