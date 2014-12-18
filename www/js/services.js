angular.module('starter.services', ['ngResource'])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('ProfileStatic', function() {
  var data = {
    id: 'mr.fuxi@gmail.com',
    photo: 'img/profile_placeholder.png',
    founds: 1000
  };

  return {
    current: function() {
      return data;
    },
  }
})

.factory('ProfileRes', function($resource) {
    return $resource('http://hashtock.appspot.com/api/user/?format=json');
})

.service('Profile', function ($http, $q){
    var profile_base = 'http://hashtock.appspot.com/api/user/';

    return({
        current: current
    });

    function current() {
        var request = $http({
            method: "get",
            url: profile_base
        });

        return request.then(handleSuccess, handleError);
    }

    function handleError(response) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return $q.reject("An error occurred.");
        }
        return $q.reject(response.data.message);
    }

    function handleSuccess(response) {
        return response.data;
    }
})

.service('Order', function ($http, $q){
    var order_base = 'http://hashtock.appspot.com/api/order/';

    return({
        buy: buy
    });

    function buy(tag, quantity) {
        var request = $http({
            method: "post",
            data: {
                action: 'buy',
                bank_order: true,
                hashtag: tag.hashtag,
                quantity: parseFloat(quantity)
            },
            url: order_base
        });

        return request.then(handleSuccess, handleError);
    }

    function handleError(response) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return $q.reject("An error occurred.");
        }
        return $q.reject(response.data.message);
    }

    function handleSuccess(response) {
        return response.data;
    }
})

.service('OrdersRes', function ($resource){
    var order_base = 'http://hashtock.appspot.com/api/order/?format=json';

    var actions = {
        'current': {
            'method': 'GET',
            'isArray': true
        }
    };

    return $resource(order_base, null, actions);
})

.service('TagRes', function ($resource){
    var tag_base = 'http://hashtock.appspot.com/api/tag/?format=json';

    var actions = {
        'all': {
            'method': 'GET',
            'isArray': true
        }
    };

    return $resource(tag_base, null, actions);
})

;