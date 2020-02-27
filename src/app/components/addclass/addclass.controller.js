function AddClassController($state) {
    var ctrl = this;
    console.log("add class controller")
    ctrl.doSecondaryAction = function(event) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('Secondary Action')
            .textContent('Secondary actions can be used for one click actions')
            .ariaLabel('Secondary click demo')
            .ok('Neat!')
            .targetEvent(event)
        );
      };
  }
  
angular
    .module('components.addclass')
    .controller('AddClassController', AddClassController);