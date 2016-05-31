declare var app;

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('list', {
        template:'<h1>Hello World of Pokemon</h1>',
        
    })
}]);