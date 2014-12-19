angular.module('starter.services', ['ionic'])

.factory('Helpers', function($ionicPlatform) {
    return {
        buildUrl: buildUrl,
        handleError: handleError,
        handleDeleteSuccess: handleDeleteSuccess,
        handleSuccess: handleSuccess
    };

    function buildUrl(uri) {
        if (!$ionicPlatform.is('android')){
            return "http://localhost:8080" + uri;
        } else {
            return "http://hashtock.appspot.com" + uri;
        }
    };

    function handleError(response) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return $q.reject("An error occurred.");
        }
        return $q.reject(response.data.message);
    };

    function handleSuccess(response) {
        return response.data;
    };
    function handleDeleteSuccess(object) {
        return function(response) {
            return object;
        }
    };
})

.service('Profile', function ($http, $q, Helpers){
    var profile_base = Helpers.buildUrl('/api/user/');

    return({
        current: current
    });

    function current() {
        var request = $http({
            method: "get",
            url: profile_base
        });

        return request.then(Helpers.handleSuccess, Helpers.handleError);
    }
})

.service('Order', function ($http, $q, Helpers){
    var order_base = Helpers.buildUrl('/api/order/');

    return({
        current: current,
        cancel: cancel,
        buy: buy
    });

    function buy(tag, quantity) {
        var request = $http({
            method: 'POST',
            data: {
                action: 'buy',
                bank_order: true,
                hashtag: tag.hashtag,
                quantity: parseFloat(quantity)
            },
            url: order_base
        });

        return request.then(Helpers.handleSuccess, Helpers.handleError);
    }

    function cancel(order) {
        var request = $http({
            method: 'DELETE',
            url: order_base + order.uuid + '/'
        });

        return request.then(Helpers.handleDeleteSuccess(order), Helpers.handleError);
    }

    function current() {
        var request = $http({
            method: 'GET',
            url: order_base
        });

        return request.then(Helpers.handleSuccess, Helpers.handleError);
    }
})

.service('Tag', function ($http, Helpers){
    var tag_base = Helpers.buildUrl('/api/tag/');

    return({
        all: all
    });

    function all() {
        var request = $http({
            method: 'GET',
            url: tag_base
        });

        return request.then(Helpers.handleSuccess, Helpers.handleError);
    };
})

.service('Opener', function() {
    return function(defaults){
        return({
        _object: null,
        value: angular.copy(defaults) || {},

        isOpen: function isOpen(obj) {
            return this._object == obj;
        },
        open: function open(obj) {
            this._object = obj;
            this.value = angular.copy(defaults);
        },
        close: function close() {
            this._object = null;
            this.value = angular.copy(defaults);
        },
        toggle: function toggle(obj) {
            if(this.isOpen(obj)) {
                this.close();
            } else {
                this.open(obj);
            }
        }
        });
    };
})

;