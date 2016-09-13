/* 
 * Created on : Sep 21, 2015
 * Author     : gmanor
 */

define(['jquery', 'underscore', 'backbone', 'iscroll', 'text!templates/Instructions.html'],
        function ($, _, Backbone, IScroll, tpl) {
            var view = Backbone.View.extend({
                tagName: 'div',
                className: 'clearfix popupWrapper',
                events: {
                    "click .closeButton": "close"
                },
                viewParams: {
                },
                initialize: function () {
                    var self = this;
                    $('.popupWrapper').remove();
                    self.render();
                },
                template: tpl,
                render: function () {
                    var self = this;
                    self.$el.html(_.template(self.template)(self.viewParams));
                    self.$el.css('display', 'block');
                    $(document).one('backbutton', function(e){self.close(e);});
                    var scrollWrapper = self.$el.find('.scrollWrapper');
                    _.defer(function () {
                        self.iScroll = new IScroll(scrollWrapper[0], {mouseWheel: true, scrollbars: true, click: true});
                    });
                    return this;
                },
                close: function (e) {
                    var self = this;
                    if(self.closeTimestamp == e.timeStamp){
                        return;
                    }
                    self.closeTimestamp = e.timeStamp;
                    if (self.iScroll) {
                        self.$el.css('-webkit-transform', 'translate(0, -100%)');
                        setTimeout(function () {
                            self.iScroll.destroy();
                            self.iScroll = null;
                            $('.popupWrapper').remove();
                        }, 500);
                    }
                }
            });
            return view;
        });