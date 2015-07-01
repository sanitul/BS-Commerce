'use strict';

angular.module('mean.shopAdmin').config(['$meanStateProvider',
    function($meanStateProvider) {
        $meanStateProvider
            .state('Order', {
                abstract: true,
                url: '/Order',
                template: '<ui-view/>'
            })
            .state('Order.List', {
                url: '/List',
                templateUrl: 'shopAdmin/views/order/order-list.html',
                controller: 'orderListController'
            });
    }
]);