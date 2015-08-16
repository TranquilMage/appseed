"use strict";

angular.module('app').directive('wwaDashboard', ['$localStorage', function ($localStorage) {
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

            scope.widgetDefinitions = [
                {
                    title: 'Temperatue',
                    settings: {
                        title: 'First',
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizey: 2,
                        template: '<wwa-temperature></wwa-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Employee',
                    settings: {
                        title: 'Second',
                        sizeX: 5,
                        sizeY: 3,
                        template: '<wwa-employee></wwa-employee>',
                        widgetSettings: {
                            id: 5000,
                            templateUrl: 'app/dialogs/wwaSelectEmployeeTemplate.html',
                            controller: 'wwaSelectEmployeeController'
                        }
                    }
                },
                {
                    title: 'Inventory',
                    settings: {
                        title: 'Third',
                        sizeX: 5,
                        sizeY: 3,
                        template: '<wwa-inventory></wwa-inventory>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
            ];
            scope.widgets =$localStorage.widgets || [];

            scope.$watch('widgets', function () {
                $localStorage.widgets = scope.widgets;

            }, true);
     }
    }
}]);