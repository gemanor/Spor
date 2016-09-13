/* 
 * Created on : Sep 21, 2015
 * Author     : gmanor
 */

define(['jquery', 'underscore', 'backbone', 'iscroll', 'text!templates/Levels.html', 'BaseView', 'LevelsCollection'],
        function ($, _, Backbone, IScroll, tpl, BaseView, LevelsCollection) {
            var view = BaseView.extend({
                className: 'clearfix levelsContainer',
                events: {
                    "tap .link[data-href]": "levelClicked"
                },
                template: tpl,
                pageTitle: "Levels",
                headerSettings: {text: '<span class="fa fa-trophy"></span> '+_$_.t('levels')+'', hide: false, showLevelsBtn: false, showProgressBar: false},
                levelClicked: function (e) {
                    var path = $(e.currentTarget).attr('data-href');
                    if (window.analytics) {
                        window.analytics.trackEvent('Play', 'Start level', (parseInt(path.split('/').pop()) + '  | From levels screen'));
                    }
                    Backbone.history.navigate(path);
                },
                initialize: function (args) {
                    var self = this;
                    self.collection = new LevelsCollection;
                    self.collection.fetch();
                    this.viewParams = {levels: 150, levelsCollection: self.collection.toJSON(), colors: ["e91e63", "f0c41a", "2c3e50", "f16eaa", "7f8c8d", "2fcc72", "955ca5", "e74d3d", "2980b9", "03a678", "20528b", "e67f23", "e2423f", "605448", "f15b5b", "cc0500", "ffcb0d", "333333"]};
                    return BaseView.prototype.initialize.call(this);
                },
                afterRender: function () {
                    var self = this;
                    self.iscroll = new IScroll('.levelsContainer', {mouseWheel: true, scrollbars: false, tap: true, freeScroll: true, scrollX: true});
                }
            });
            return view;
        });