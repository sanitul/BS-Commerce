'use strict';

angular.module('mean.shopAdmin').controller('orderListController', ['$scope', 'orderService',
    function($scope, orderService) {

        $scope.numberOfDisplayOptions = [10, 15, 20, 50, 100];
        $scope.numberOfDisplay = 10;
        $scope.maxSize = 4;
        $scope.totalItems = 10;
        $scope.currentPage = 1;
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        $scope.searchQuery = {
            startDate: yesterday,
            endDate: new Date()
        };
        $scope.orders = [];
        $scope.dispalayOrders = [];

        orderService.getOrderEnums()
            .$promise
            .then(function(response) {
                $scope.orderStatus = response.orderStatus;
                $scope.shippingStatus = response.shippingStatus;
                $scope.paymentStatus = response.paymentStatus;
            });

        $scope.displayOptionChange = function() {
            var ordersLength = $scope.orders.length;
            if(ordersLength > 0) {
                $scope.displayFrom = 1;
                $scope.displayTo = $scope.numberOfDisplay;

                if(ordersLength === $scope.numberOfDisplay) {
                    $scope.displayTo = ordersLength;
                    $scope.dispalayOrders = $scope.orders;
                }
                else if((ordersLength < $scope.numberOfDisplay) && (ordersLength < $scope.totalItems)) {
                    $scope.searchOrders(ordersLength, ($scope.numberOfDisplay - ordersLength), function() {
                        $scope.displayTo = $scope.orders.length;
                        $scope.dispalayOrders = $scope.orders;
                    });
                }
                else if((ordersLength < $scope.numberOfDisplay) && (ordersLength === $scope.totalItems)) {
                    $scope.displayTo = ordersLength;
                    $scope.dispalayOrders = $scope.orders;
                }
                else if(ordersLength > $scope.numberOfDisplay) {
                    $scope.displayTo = $scope.numberOfDisplay;
                    $scope.dispalayOrders = $scope.orders.slice(0, $scope.numberOfDisplay);
                }
            }
        };

        $scope.defaultSearchOrders = function() {
            if($scope.searchQuery.startDate !== null && $scope.searchQuery.endDate === null) {
                $scope.dateError = 'you should fill up end date';
                return;
            }
            $scope.searchQuery.page = $scope.currentPage;
            $scope.searchQuery.numberOfDisplay = $scope.numberOfDisplay;
            orderService.searchOrders($scope.searchQuery)
                .$promise
                .then(function(response) {
                    $scope.orders = response.orders;
                    $scope.totalItems = response.totalOrders;
                    $scope.dispalayOrders = response.orders;
                    $scope.displayOptionChange();
                });
        };

        $scope.defaultSearchOrders();

        $scope.searchOrders = function(numberOfSkip, numberOfDisplay, callback) {
            if($scope.searchQuery.startDate !== null && $scope.searchQuery.endDate === null) {
                $scope.dateError = 'you should fill up end date';
                return;
            }
            $scope.searchQuery.numberOfSkip = numberOfSkip;
            $scope.searchQuery.numberOfDisplay = numberOfDisplay;
            orderService.searchOrders($scope.searchQuery)
                .$promise
                .then(function(response) {
                    $scope.orders = $scope.orders.concat(response.orders);
                    callback();
                });
        };

        $scope.changePagination =function(pageNo) {
            $scope.displayFrom = (pageNo - 1) * 10 + 1;
            $scope.displayTo = $scope.displayFrom + $scope.numberOfDisplay - 1;

            if($scope.displayTo > $scope.orders.length)
                $scope.displayTo = $scope.displayFrom + ($scope.orders.length - $scope.displayFrom);
            $scope.dispalayOrders = $scope.orders.slice($scope.displayFrom-1, $scope.displayTo);
        };

        $scope.setPage = function (pageNo) {

            if($scope.totalItems > $scope.orders.length) {
                var numberOfSkip = (pageNo -1) * $scope.numberOfDisplay;
                $scope.searchOrders(numberOfSkip, $scope.numberOfDisplay, function() {
                    $scope.changePagination(pageNo);
                });
            } else {
                $scope.changePagination(pageNo);
            }
            $scope.currentPage = pageNo;
        };

    }
]);