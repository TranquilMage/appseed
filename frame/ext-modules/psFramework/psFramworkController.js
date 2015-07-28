"use strict";

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