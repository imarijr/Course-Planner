function config(ParseProvider, $locationProvider) {
  ParseProvider.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
  ParseProvider.initialize(
    '0dbje6gd8OgSaOXLyjDB862HBHyCR6y16iFA3tU3', // This is your Application ID
    'ry5B2cpFIEwnMu4BQSmhvPPikMQjJQ83Pdhno5RC' // This is your Javascript key
  );
  $locationProvider.hashPrefix('');
}

angular.module('common').config(config);