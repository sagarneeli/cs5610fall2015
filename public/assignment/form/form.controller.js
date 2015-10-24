(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $location, $rootScope, $scope)
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
            FormService.updateFormById($scope.currentForm.id, $scope.newForm, function (form) {
                
            });
        }

    }
})();