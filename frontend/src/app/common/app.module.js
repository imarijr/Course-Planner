angular
  .module('common', [
    'ui.router',
    'ngMaterial',
    'ngParse',
  ])
  .run(function () {
    console.log("common module")
  });