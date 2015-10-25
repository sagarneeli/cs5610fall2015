(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope, $scope)
    {
        var user = $rootScope.loggedInUser;
        $scope.newForm = {};

        function init() {
            if (user == null) {
                user = {
                    id: '12345'
                };
            }
            FormService.findAllFormsForUser(user.id, function (forms) {
                $scope.forms = forms;
            });
        }

        init();
        var userId = user.id;

        $scope.addForm = function() {
            FormService.createFormForUser(userId, $scope.newForm, function(form) {
                $scope.forms.push(form);
                $scope.newForm = {};
            });
        }

        $scope.updateForm = function() {
            if ($scope.selectedForm) {
                FormService.updateFormById($scope.selectedForm.id, $scope.newForm, function(form) {
                    $scope.selectedForm.name = $scope.newForm.name;
                });
            }
        }

        $scope.deleteForm = function(index) {
            FormService.deleteFormById($scope.forms[index].id, function(forms){
                $scope.forms.splice(index, 1);
                //$scope.forms = forms;
            });
        }

        $scope.selectForm = function(index) {
            $scope.selectedForm = $scope.forms[index];
            $scope.newForm.name = $scope.selectedForm.name;
        }
    }
})();