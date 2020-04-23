angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root">\n    <div ui-view></div>\n</div>');
$templateCache.put('./app-nav.html','<header>\n  <md-toolbar>\n      <div class="md-toolbar-tools" layout="row" layout-align="space-between center">\n          <div>\n              <a href="#"><i class="material-icons">home</i></a>\n          </div>\n          <div>\n              <h3>Course Planner</h3>\n          </div>\n      </div>\n  </md-toolbar>\n</header>');
$templateCache.put('./app.html','<div class="root">\n  <div>\n    <div ui-view></div>\n  </div>\n</div>');
$templateCache.put('./home.html','<app-nav></app-nav>\n<md-input-container class="md-block" flex-gt-sm>\n    <h2>Choose your major to get started.</h2>\n    <label>My Major</label>\n    <md-select ng-model="majorChosen" ng-change="onChange()">\n      <!-- stateful component -->\n      <md-option ng-repeat="major in $ctrl.majors" value="{{major}}">\n        {{major}}\n      </md-option>\n    </md-select>\n  </md-input-container>\n\n  <md-button md-no-ink class="md-go-button" ng-click = "saveMajor()" href="#!/semesters">Go</md-button>');
$templateCache.put('./addclass.html','<!-- stateful component -->\n  <md-input-container class="md-block-addclass" flex-gt-sm>\n      <h1 class="additional-options">Additional Class Options</h1> \n    <!-- stateless component -->\n    <md-list-item ng-repeat="course in $ctrl.allClasses" value="{{course.attributes.courseName}}" class="secondary-button-padding-class">\n      <p>{{course.attributes.courseName}}</p>\n      <md-button class="md-secondary" ng-click="$ctrl.addCourseToSemesterWrapper($event, course.attributes.courseName)" href="#!/semesters">add class</md-button>\n    </md-list-item>\n  </md-input-container>\n');
$templateCache.put('./deleteclass.html','<!-- stateful component -->\n<md-input-container class="md-block-addclass" flex-gt-sm>\n    <h1 class="additional-options">Remove Class</h1> \n  <!-- stateless component -->\n  <md-list-item ng-repeat="course in $ctrl.allClasses" value="{{course.attributes.courseName}}" class="secondary-button-padding-class">\n    <p>{{course.attributes.courseName}}</p>\n    <md-button class="md-secondary" ng-click="$ctrl.removeCourseFromSemester($event, course.attributes.courseName)" href="#!/semesters">remove class</md-button>\n  </md-list-item>\n</md-input-container>\n');
$templateCache.put('./semesters.html','<app-nav></app-nav>\n<div class="course-map">\n    <md-content layout-padding>\n        <div ng-show="$ctrl.classWarning" class="warning-text">\n            One or more classes need adjusting to satisfy prerequisite requirements. \n        </div>\n        <!-- Grid List to Keep even layout -->\n        <md-grid-list  md-cols-sm="1" md-cols-md="1" md-cols-lg="2" md-cols-gt-lg="3" md-cols=1 md-row-height-md="1:1" md-row-height="1.2:1"\n            md-gutter-gt-md="16px" md-gutter-md="8px" md-gutter="4px">\n            <!-- Each Tile holds a list of semester courses -->\n            <!-- stateful component -->\n            <md-grid-tile ng-repeat="(key, semester) in $ctrl.models.semesters">\n                <!-- ui-sortable allows drag drop sorting of \n                    arrays courseMap is the drag drop group -->\n                    <!-- stateless component -->\n                <md-list ui-sortable="$ctrl.courseMap" class="course-list" ng-model="semester">\n                    <md-subheader class="md-no-sticky">Semester {{$index+1}}</md-subheader>\n                    <!-- repeats each class in a semester -->\n                    <md-list-item ng-repeat="item in semester" class="md-2-line course">\n                        <div class="md-list-item-text">\n                            {{item}}\n                        </div>\n                        <md-divider></md-divider>\n                    </md-list-item>\n                    <!-- display the running total of credits for each semester-->\n                    <div style="margin: 30px"></div>\n                    <p>Credits: {{$ctrl.models.creditTotal[$index]}}\n                    <md-button style="float: right; margin-top: -10px" ng-click = "$ctrl.deleteClass($event, key)">Delete Class</md-button>\n                    <md-button style="float: right; margin-top: -10px" ng-click = "$ctrl.addClass($event, key)">Add Class</md-button></p>\n                </md-list>\n            </md-grid-tile>\n        </md-grid-list>\n    </md-content>\n</div>');}]);