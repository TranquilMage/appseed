

angular.module("psFramework", ["psMenu", "psDashboard"])


angular.module('psFramework').directive('psUserProfileSmall', function () {
    return {
        templateUrl: 'ext-modules/psFramework/psUserProfile/psUserProfileSmallTemplate.html'
    };
});


angular.module('psFramework').directive('psUserProfile', function () {
    return {
        templateUrl: 'ext-modules/psFramework/psUserProfile/psUserProfileTemplate.html'
    };
});


angular.module("psDashboard", ["gridster", "ui.bootstrap"]);


angular.module('psDashboard').directive('psWidgetBody',
    ['$compile', '$modal',
    function ($compile, $modal) {
            return {
                templateUrl: 'ext-modules/psDashboard/psWidgetBodyTemplate.html',
                link: function (scope, element, attrs) {
                    var newElement = angular.element(scope.item.template);
                    element.append(newElement);
                    $compile(newElement)(scope);

                    scope.close = function () {
                        scope.widgets.splice(scope.widgets.indexOf(scope.item), 1)
                    };
                    scope.settings = function () {
                        var options = {
                            templateUrl: scope.item.widgetSettings.templateUrl,
                            controller: scope.item.widgetSettings.controller,
                            scope: scope
                        };
                        $modal.open(options);

                        scope.iconClicked = function () {
                            //empty body so that icon clicks aren't intercepted by widget
                        };
                    };
                }
            }
        }
    ]);


angular.module('psDashboard').directive('psDashboard', [function () {
    return {
        templateUrl: 'ext-modules/psDashboard/psDashboardTemplate.html',
        link: function (scope, element, attr) {
            scope.addNewWidget = function (widget) {
                var newWidget = angular.copy(widget.settings);
                scope.widgets.push(newWidget);
            }
        }
      };
}]);


angular.module("psMenu", ["ngAnimate"])


angular.module("psMenu").directive("psMenuItem", function () {
    return {
        require: '^psMenu',
        scope: {
            label: '@',
            icon: '@',
            route: '@',
        },
        templateUrl: "ext-modules/psMenu/psMenuItemTemplate.html",
        link: function (scope, el, attr, ctrl) {
            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            }

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
            }

            el.bind("click", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            })
        }
    };
});


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


angular.module("psMenu").controller("psMenuController",
    ['$scope','$rootScope',
        function ($scope, $rootScope) {

            $scope.showMenu = true;
            $scope.isVertical = true;
            $scope.allowHorizontalToggle = true;

            this.getActiveElement = function (el) {
                return $scope.setActiveElement;
            };

            this.setActiveElement = function (el) {
                $scope.setActiveElement = el;
            };

            this.isVertical = function () {
                return $scope.isVertical;
            };
            
            this.setRoute = function (route) {
                $rootScope.$broadcast('ps-menu-item-selected-event',
                    { route: route });
            };

            this.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            }

            $scope.toggleMenuOrientation = function () {

                //close any open menu
                if ($scope.openMenuScope) {
                       $scope.openMenuScope.closeMenu();
                }

                $scope.isVertical = !$scope.isVertical;

                $rootScope.$broadcast('ps-menu-orientation-change-event',
                    { isMenuVertical: $scope.isVertical });
            };

            angular.element(document).bind('click', function (e) {
                if ($scope.openMenuScope && !$scope.isVertical) {
                    if ($(e.target).parent().hasClass('ps-selectable-item')) {
                        return;
                    }
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });


            $scope.$on('ps-menu-show', function (evt, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalToggle = data.allowHorizontalToggle;
            });
        }
    ]);
angular.module("psDashboard").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/psFrameWork/psFrameworkTemplate.html","<div class=\"ps-title-bar\">\r\n    <div class=\"row\">\r\n        <div class=\"ps-logo-area col-sm-6\">\r\n            <img class=\"ps-icon\" ng-src=\"{{ iconFile }}\" />\r\n            <div class=\"ps-title-area \">\r\n                <p class=\"ps-logo-title\">{{ title }}</p>\r\n                <p class=\"ps-logo-subtitle\">{{ subtitle }}</p>\r\n            </div>\r\n\r\n            <div ng-if=\"menuButtonVisible\"\r\n                 ng-click=\"menuButtonClicked()\"\r\n                 class=\"ps-collapsed-menu pull-right\">\r\n                <button class=\"btn ps-nav-button\" type=\"button\">\r\n                    <i class=\"fa fa-bars\"></i>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"ps-right-side-controls col-sm-6\">\r\n            <ps-user-profile-small></ps-user-profile-small>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"ps-menu-area\"\r\n     ng-show=\"isMenuVisible\"\r\n     ng-class=\"{\'ps-menu-area-vertical\': isMenuVertical, \'ps-menu-area-horizontal\': !isMenuVertical}\">\r\n    <ps-user-profile></ps-user-profile>\r\n    <ng-transclude></ng-transclude>\r\n</div>\r\n<div ng-view class=\"ps-view\" ng-class=\"{\'ps-view-full-width\': !isMenuVertical || !isMenuVisible}\" ></div>");
$templateCache.put("ext-modules/psFrameWork/psUserProfile/psUserProfileSmallTemplate.html","<div class=\"ps-user-profile-small pull-right\">\r\n    <img src=\"images/Me.jpeg\" alt=\"image\" />\r\n    <div>\r\n        <span>Obstolum Triggs</span>\r\n        <button class=\"btn btn-default btn-sm\">\r\n            <i class=\"fa fa-chevron-down\"></i>\r\n        </button>\r\n    </div>\r\n</div>");
$templateCache.put("ext-modules/psFrameWork/psUserProfile/psUserProfileTemplate.html","<div class=\"ps-user-profile\" ng-if=\"isMenuVertical && !isMenuButtonVisible\">\r\n    <img src=\"images/Me.jpeg\" alt=\"user image\" />\r\n    <div>\r\n        <p>Obstolum</p>\r\n        <p>Triggs</p>\r\n        <button class=\"btn btn-default btn-sm\">\r\n            <i class=\"fa fa-chevron-down\"></i>\r\n        </button>\r\n    </div>\r\n</div>");}]);


angular.module("psFramework").controller("psFrameworkController", 
    ['$scope', '$rootScope', '$window', '$timeout','$location',
        function ($scope, $rootScope, $window, $timeout, $location) {

            $scope.menuButtonVisible = true;
            $scope.isMenuVisible = true;
            $scope.isMenuVertical = true;
            $scope.allowHorizontalToggle = true;

            var broadcastMenuState = function () {
                $rootScope.$broadcast('ps-menu-show',
                    {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.menuButtonVisible,
                    });
            };


            $scope.$on('ps-menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;
                $location.path(data.route)
                checkWidth();
                broadcastMenuState();
            });

            $scope.$on('ps-menu-orientation-change-event', function (evt, data) {
                $scope.isMenuVertical = data.isMenuVertical;
                $timeout(function () {
                    $(window).trigger('resize');
                }, 0);
            });

            $($window).on('resize.psFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState();
                });
            });

            $scope.$on("$destroy", function () {
                $(window).off("resize.psFramework"); // release the handler
            })

            var checkWidth = function () {
                var width = Math.max($($window).width(), $(window).innerWidth());
                $scope.isMenuVisible = (width > 768);
                $scope.menuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                //$scope.apply();
            };

   

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                $scope.$apply();
            };

            $timeout(function () {
                checkWidth();
            }, 0);
        }
    ]);


angular.module("psFramework").directive("psFramework", function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@',
        },
        controller: "psFrameworkController",
        templateUrl: "ext-modules/psFramework/psFrameworkTemplate.html",
    };
});