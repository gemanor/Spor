/* 
 Created on : Sep 20, 2015, 8:03:59 AM
 Author     : gmanor
 */
require.config({
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr',
        'backbone.marionette': 'vendor/marionette/lib/core/backbone.marionette',
        'backbone.localstorage': 'vendor/backbone.localstorage/backbone.localstorage',
        'text': 'vendor/requirejs-text/text',
        'iscroll': 'vendor/iscroll/iscroll',
        'polyglot': 'vendor/polyglot/polyglot.min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        iscroll: {
            exports: 'IScroll'
        },
        marionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        },
        polyglot: {
            exports: 'Polyglot'
        }
    },
    deps: ['jquery', 'underscore']
});

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    onDeviceReady();
}

function getAdMobId() {
    var admobid = 'ca-app-pub-5351121465456147/1855785048';
    if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = 'ca-app-pub-5351121465456147/7278903045';
    }
    return admobid;
}

function onDeviceReady() {
    require(['app'], function (Spor) {
        var app = new Spor();
        app.start();
    });
}