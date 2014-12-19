angular.module('starter.controllers', [])

.controller('ProfileCtrl', function($scope, Profile) {
    Profile.current().then(function (profile) {
        $scope.profile = profile;
    });
})

.controller('CurrentOrdersCtrl', function($scope, Order, Opener) {
    $scope.opener = Opener();

    $scope.refresh = function refresh() {
        Order.current().then(function (orders) {
            $scope.orders = orders;
        });
    };

    $scope.refresh();

    $scope.cancel = function cancel(order) {
        Order.cancel(order).then(function (order) {
            $scope.opener.close();
            var index = $scope.orders.indexOf(order);
            if (index > -1) {
                $scope.orders.splice(index, 1);
            }
            // reenable when controller's cache will be modified
            // $scope.refresh();
        });
    };
})

.controller('BankCtrl', function($scope, Tag, Order, Opener) {
    $scope.opener = Opener({quantity: 0});

    Tag.all().then(function (tags) {
        $scope.tags = tags;
    });

    $scope.buy = function buy(tag, quantity) {
        Order.buy(tag, quantity).then(function (order) {
            $scope.opener.close();
        });
    }
})
