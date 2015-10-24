(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope, $scope)
    {
        var userId = $rootScope.loggedInUser.id;
        $scope.newForm = {};

        FormService.findAllFormsForUser(userId, function (forms) {
            $scope.forms = forms;
        });

        $scope.addForm = function () {
            FormService.createFormForUser(userId, $scope.newForm, function(form) {
                $scope.forms.push(form);
                $scope.newForm = {};
            });
        }

        $scope.updateForm = function () {
            FormService.updateFormById($scope.selectedForm.id, $scope.newForm, function (form) {
                
            });
        }
        
        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index].id, function (forms) {
                $scope.forms.splice(index, 1);
            });
        }

        $scope.selectForm = function (index) {
            $scope.selectedForm = $scope.forms[index];
            $scope.newForm = $scope.selectedForm;
        }

    }
})();