/* 
 * Created on : Sep 21, 2015
 * Author     : gmanor
 */

define(["app", "backbone.marionette"], function (Spor, Marionette) {
    var API = {
        currentView: null,
        renderToPage: function (view, args) {
            var self = this;
            if(self.currentView && self.currentView.close){
                self.currentView.close();
            }
            require([view], function (View) {
                self.currentView = new View(args);
                $('#page-container').html(self.currentView.$el);
            });
        }
    };
    var SporRouter = Marionette.AppRouter.extend({
        controller: API,
        routes: {
            "": function () {
                this.controller.renderToPage('HomeView');
            },
            "play(/:level)": function (level) {
                this.controller.renderToPage('PlaygroundView', {level: level});
            },
            "levels": function (level) {
                this.controller.renderToPage('LevelsView', {level: level});
            }
        }
    });
    return SporRouter;
});