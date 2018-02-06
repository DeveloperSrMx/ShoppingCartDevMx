App.controller('registerAndBuyController', ['$scope', '$state','$stateParams',
    function ($scope, $state, $stateParams) {

    //GOOGLE API FUNCTIONS:
    var autocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        postal_code: 'short_name'
    };

    function initAutocomplete() {
        // Create the autocomplete object:
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            { types: ['geocode'] });

        // When the user selects an address from the dropdown, populate the address/fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }
    }

    //This function is necessary because the GOOGLE API script is loading before the DOM:
    setTimeout(function () {
        initAutocomplete();
    }, 1000);

    $scope.quantityPriceArray = $stateParams.data.quantityPriceArray;
    if ($stateParams.data.discount !== undefined)
        $scope.discount = $stateParams.data.discount;
    else
        $scope.discount = 0;

    if ($stateParams.data.total !== undefined)
        $scope.total = $stateParams.data.total;
    else
        $scope.total = 0;

    if ($stateParams.data.quantityPriceArray !== undefined)
        $scope.totalItems = $stateParams.data.quantityPriceArray.length;
    else
        $scope.totalItems = 0;

    //Method to back to shopping cart:
    $scope.backToShopping = function () {
        $state.go('/');
    }

    //detect the card type:
    $scope.ccinfo = { type: undefined }

    //Congratulations:
    $scope.congratulations = function () {
        $state.go('/congratulations');
    }

}]);