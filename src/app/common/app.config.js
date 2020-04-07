function config(ParseProvider) {
  ParseProvider.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
  ParseProvider.initialize(
    'UZwpFbGYPWGGKsVAt5vRzPbH1lSdX6u77OF3KrD5', // This is your Application ID
    'IpK6jyzdSSOGfqfM5SbA90UmakjLChfbEjcaPFBS' // This is your Javascript key
  );
}

angular.module('common').config(config);