App.controller('shoppingCartController', ['$scope', 'shoppingCartService', '$state',
    function ($scope, shoppingCartService, $state) {    
        
    //Variables:
    var noOfItems = 0;    
    $scope.quantityPriceArray = [];
    $scope.items = [];
    $scope.code = "";
    $scope.totalItems = 0;
    $scope.subTotal = 0;
    $scope.total = 0;
    $scope.discount = 0;    

    //Get total:
    function getTotal() {
        for (var i = 0; i < noOfItems; i++) {
            var n = $scope.items[i].name;
            var q = parseInt($scope.items[i].quantity, 10);
            var p = parseInt($scope.items[i].price, 10);
            var op = parseInt($scope.items[i].original_price, 10);
            $scope.subTotal += p;

            var obj = {
                'name': n,
                'qty': q,
                'price': p,
                'original_price': op
            };
            $scope.quantityPriceArray.push(obj);
            $scope.totalItems += q;
        }
        $scope.total = $scope.subTotal - $scope.discount;
    }

    //Factory to get data (dummy from JSON File):
    shoppingCartService.$getAvailableItems().
        then(function (response) {
            $scope.items = response.data.items;
            noOfItems = $scope.items.length;
            getTotal();
        });

    //Method to increment quantity for each item:
    $scope.increment = function (item, index) {
        item.quantity++;
        $scope.calculate(item.quantity, index);
    };

    //Method to decrement quantity for each item:
    $scope.decrement = function (item, index) {
        item.quantity--;
        $scope.calculate(item.quantity, index);
    };

    //Method to calculate all when you add or remove items to the shopping cart:
    $scope.calculate = function (newQuantity, index) {
        var inc_Dec_Quantity = 0;
        var inc_Dec_Price = 0;
        var priceQuantityObj = $scope.quantityPriceArray[index];
        var previousQuantity = priceQuantityObj.qty;
        var previousItemPrice = priceQuantityObj.price * previousQuantity;
        var newItemPrice = priceQuantityObj.price * newQuantity;
        $scope.quantityPriceArray[index].qty = newQuantity;
        $scope.quantityPriceArray[index].price = (priceQuantityObj.original_price * newQuantity);
        inc_Dec_Quantity = newQuantity - previousQuantity;
        inc_Dec_Price = newItemPrice - previousItemPrice;
        $scope.totalItems += inc_Dec_Quantity;
        $scope.subTotal += inc_Dec_Price;
        $scope.total = $scope.subTotal - $scope.discount;
    };

    //If exists a promotion code you can get a discount:
    $scope.applyCode = function (code) {
        var disc = 0;
        if (code === "s3")
            disc = $scope.subTotal * 0.05;

        $scope.discount = disc;
        $scope.total = $scope.subTotal - $scope.discount;
    };    

    //Method to go to the register form:
    $scope.continue = function () {
        var objTransfer = {};
        var objSender = {};
        objSender.quantityPriceArray = $scope.quantityPriceArray;
        objSender.total = $scope.total;
        objSender.discount = $scope.discount;
        objTransfer.data = objSender;
        $state.go('/registerAndBuy', objTransfer);
    }
}]);

