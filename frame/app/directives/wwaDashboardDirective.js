"use strict";

angular.module('app').directive('wwaDashboard', [function () {
    return {
        scope: {
        },
        template: '<ps-dashboard></ps-dashboard>',
        link: function (scope) {

            scope.title = "Dashboard"
            scope.gridsterOpts = {
                columns:12,
                pushing: true, // whether to push other items out of the way on move or resize
                floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
                swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
                margins: [20, 20], // the pixel distance between each widget
                outerMargin: false, // whether margins apply to outer edges of the grid
            };
            scope.widgets = [
                {
                    title: 'title1',
                    sizeX: 3,
                    sizeY: 3,
                    row: 0,
                    col: 0
                },
                {
                    title: 'title2',
                    sizeX: 2,
                    sizeY: 4,
                    row: 0,
                    col: 5
                }
            ];
     }
    }
}]);