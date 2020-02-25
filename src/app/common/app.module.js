angular
  .module('common', [
    'ui.router',
    'ngMaterial',
  ])
  .run(function () {
    console.log("common module")
  });