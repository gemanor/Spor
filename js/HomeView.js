/* 
 * Created on : Sep 21, 2015
 * Author     : gmanor
 */

define(['jquery', 'underscore', 'backbone', 'BaseView', 'LevelsCollection', 'InstructionsView', 'text!templates/Home.html'],
        function ($, _, Backbone, BaseView, LevelsCollection, InstructionsView, tpl) {
            var view = BaseView.extend({
                className: 'clearfix homeContainer',
                events: {
                    "click .startPlay": "startPlay",
                    "click .openInstructionsPopup": "showInstructions",
                    "click .shareGame": "shareGame"
                },
                afterRender: function () {
                    setTimeout(function () {
                        navigator.splashscreen.hide();
                    }, 2000);
                },
                template: tpl,
                pageTitle: "Home screen",
                shareGame: function () {
                    window.plugins.socialsharing.share(_$_.t('play_share_title'), _$_.t('play_share_title'), 'www/img/sporbanner.jpg', 'http://www.innomind.io/spor');
                },
                showInstructions: function () {
                    var self = this;
                    self.instructionsPopup = new InstructionsView();
                    self.childViews.push(self.instructionsPopup);
                    self.$el.append(self.instructionsPopup.render().$el);
                },
                startPlay: function () {
                    this.collection = new LevelsCollection;
                    this.collection.fetch();
                    var localStorageLevel = (this.collection.length + 1);
                    if (window.analytics) {
                        window.analytics.trackEvent('Play', 'Start level', (localStorageLevel + ' | From home screen'));
                    }
                }
            });
            return view;
        });