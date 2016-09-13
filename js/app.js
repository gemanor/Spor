/* 
 Created on : Sep 20, 2015, 8:04:33 AM
 Author     : gmanor
 */

define(["backbone.marionette", "router", "jquery", "backbone", "underscore", "polyglot"], function (Marionette, DermaCompareRouter, $, Backbone, _, Polyglot) {
    var Spor = Marionette.Application.extend({
        initialize: function () {
            new DermaCompareRouter();
            if (window.AdMob) {
                window.AdMob.prepareInterstitial({
                    adId: window.getAdMobId(),
                    autoShow: false
                });
            }
        },
        navigate: function (route, options) {
            options || (options = {});
            Backbone.history.navigate(route, options);
        },
        getCurrentRoute: function () {
            return Backbone.history.fragment;
        },
        onBeforeStart: function () {
            var RegionContainer = Marionette.LayoutView.extend({
                el: "#app-body",
                regions: {
                    dialog: "#dialog-region",
                    flash: "#flash",
                    container: "#app-container"
                }
            });
            Spor.regions = new RegionContainer();
            Spor.regions.dialog.onShow = function (view) {
                var self = this;
                var closeDialog = function () {
                    self.stopListening();
                    self.empty();
                    self.el.dialog("destroy");
                };

                this.listenTo(view, "dialog:close", closeDialog);

                this.el.dialog({
                    modal: true,
                    title: view.title,
                    width: "auto",
                    close: function (e, ui) {
                        closeDialog();
                    }
                });
            };
        },
        onStart: function () {
            var startAppWithLang = function (lang) {
                var availiableLangs = ['en', 'he', 'ja', 'ko'];
                var locale = lang.value && availiableLangs.indexOf(lang.value.substr(0, 2)) >= 0 ? lang.value.substr(0, 2) : 'en';
                if (locale == 'he') {
                    $('body').addClass('rtl');
                }
                $.getJSON('nls/' + locale + '.json', function (data) {
                    window._$_ = new Polyglot({phrases: data});
                    if (window.analytics) {
                        window.analytics.startTrackerWithId('UA-75348614-1');
                    }
                    AppRate.preferences.openStoreInApp = true;
                    AppRate.preferences.useLanguage = locale;
                    AppRate.preferences.storeAppURL.android = 'market://details?id=com.gabree.spor';
                    AppRate.preferences.storeAppURL.ios = '1100712025';
                    AppRate.preferences.displayAppName = 'Spor';
                    AppRate.preferences.usesUntilPrompt = 4;
                    AppRate.preferences.promptAgainForEachNewVersion = false;
                    AppRate.promptForRating(false);
                    if (Backbone.history) {
                        Backbone.history.start();
                    }
                });
            };
            if (navigator.globalization) {
                navigator.globalization.getPreferredLanguage(startAppWithLang, startAppWithLang);
            } else {
                startAppWithLang('en');
            }
        }
    });

    return Spor;
});

