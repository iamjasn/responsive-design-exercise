'use strict';

var app = angular.module('app', ['youtube-embed'])
    .controller('VideoCtrl', function($scope) {
        $scope.mainVideo = 'MUg83dKDxw4';
        $scope.modalShown = false;
        $scope.toggleModal = function(id) {
            $scope.modalShown = !$scope.modalShown;
            $scope.video = id;
        };
    })
    .directive('modalDialog', function() {
        return {
            restrict: 'E',
            scope: {
              show: '='
            },
            replace: true,
            transclude: true,
            link: function(scope) {
                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>x</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
          };
});
