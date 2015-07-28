"use strict";

angular.module("psMenu").directive("psMenu", ['$timeout', function ($timeout) {
    return {
        transclude: true,
        scope: {
        },
        controller: "psMenuController",
        templateUrl: "ext-modules/psMenu/psMenuTemplate.html",
        link: function (scope, el, attr) {
            var item = el.find('.ps-selectable-item:first');
            $timeout(function () {
                item.trigger('click');
            });
        }
    };
}]);