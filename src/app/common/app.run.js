function init( $uiRouter){
    var Visualizer = window['ui-router-visualizer'].Visualizer;
    var plugInstance = $uiRouter.plugin(Visualizer);
}

angular.module('common').run(init)