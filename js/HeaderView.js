/* 
 * Created on : Sep 21, 2015
 * Author     : gmanor
 */

define(['jquery', 'underscore', 'backbone', 'text!templates/Header.html'],
        function ($, _, Backbone, tpl) {
            var view = Backbone.View.extend({
                tagName: 'header',
                className: 'clearfix',
                viewParams: {
                    showHomeBtn: true,
                    hide: true,
                    showLevelsBtn: false,
                    showProgressBar: false
                },
                initialize: function (args) {
                    var self = this;
                    args = args || {};
                    _.extend(this.viewParams, args);
                    $('header').remove('');
                    $('body').prepend(self.$el);
                    this.render();
                },
                template: tpl,
                render: function () {
                    var self = this;
                    self.$el.html(_.template(self.template)(self.viewParams));
                    return this;
                }
            });
            return view;
        });