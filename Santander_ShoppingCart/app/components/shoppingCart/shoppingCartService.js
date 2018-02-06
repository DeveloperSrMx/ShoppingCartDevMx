App.factory('shoppingCartService', function ($http) {

    var getItems = function () {
        return $http.get('app/data/items.json');
    };

    return {
        $getAvailableItems: getItems
    };
});