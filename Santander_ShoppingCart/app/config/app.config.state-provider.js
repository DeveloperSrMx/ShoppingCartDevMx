/**
 * Configure the Routes
 */
App.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	//routes
	$stateProvider		
        .state('/', {
            url: '/',
            templateUrl: 'app/components/shoppingCart/shoppingCartView.html',
            controller: 'shoppingCartController'
        })
        .state('/registerAndBuy', {
            url: '/registerAndBuy',
            templateUrl: 'app/components/registerAndBuy/registerAndBuyView.html',
            controller: 'registerAndBuyController',
            params: { data: {}}
        })
        .state('/congratulations', {
            url: '/congratulations',
            templateUrl: 'app/components/congratulations/congratulationsView.html'
        })
		//default route
		$urlRouterProvider.otherwise('/');
	}
]);
