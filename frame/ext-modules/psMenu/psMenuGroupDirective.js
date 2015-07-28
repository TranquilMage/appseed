"use strict";

angular.module("psMenu").directive("psMenuGroup", function () {
    return {
        require: '^psMenu',
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
            //route: '@'
        },
        templateUrl: "ext-modules/psMenu/psMenuGroupTemplate.html",
        link: function (scope, el, attr, ctrl) {
            scope.isOpen = false;
            scope.closeMenu = function () {
                    scope.isOpen = false;
            };

            scope.clicked = function () {
                scope.isOpen = !scope.isOpen;

                if (el.parents('.ps-subitem-section').length === 0) {
                    scope.setSubmenuPosistion();
                }

                ctrl.setOpenMenuScope(scope)
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
            }

           /* el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                })
            })*/

            scope.setSubmenuPosistion = function () {
                var pos = el.offset();
                $('.ps-subitem-section').css({'left': pos.left + 20, 'top': 36})
            }
        }
    };
});