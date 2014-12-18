angular.module('starter.controllers', [])

.controller('ProfileCtrl', function($scope, Profile) {
    Profile.current().then(function (profile) {
        $scope.profile = profile;
    });
})

.controller('CurrentOrdersCtrl', function($scope, OrdersRes) {
    $scope.orders = OrdersRes.current();
})

.controller('BankCtrl', function($scope, TagRes, Order) {
    $scope.tags = TagRes.all();
    $scope.opened = {
        quantity: 0,
        hashtag: null,
    };

    $scope.isOpen = function isOpen(tag) {
        return tag.hashtag == $scope.opened.hashtag;
    };
    $scope.open = function open(tag) {
        $scope.opened = {
            quantity: 0,
            hashtag: tag.hashtag,
        };
    };
    $scope.close = function close() {
        $scope.opened = {
            quantity: 0,
            hashtag: null,
        };
    };
    $scope.toggle = function toggle(tag) {
        if($scope.opened.hashtag == tag.hashtag) {
            $scope.close();
        } else {
            $scope.open(tag);
        }
    };

    $scope.buy = function buy(tag, quantity) {
        Order.buy(tag, quantity).then(function (order) {
            $scope.close();
        });
    }
})
