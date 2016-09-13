define(["backbone", "backbone.localstorage", "LevelModel"],
        function (Backbone, BackboneLocalStorage, LevelModel) {
            var LevelsCollection = Backbone.Collection.extend({
                localStorage: new BackboneLocalStorage("Levels"),
                model: LevelModel
            });

            return LevelsCollection;
        });