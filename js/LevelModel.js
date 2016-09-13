define(["backbone"],
        function (Backbone, BackboneLocalStorage) {
            var LevelModel = Backbone.Model.extend({
                idAttribute: 'level'
            });

            return LevelModel;
        });