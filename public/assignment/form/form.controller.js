(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope, $scope)
    {
        var user = $rootScope.loggedInUser;
        var selectedForm = {};
        var isSelected = false;
        $scope.forms = [];

        function init() {
            if (user == null) {
                user = {
                    id : '12345'
                };
            }
            FormService.findAllFormsForUser(user.id, function (forms) {
                $scope.forms = forms;
            });
        }

        //$scope.newForm = {};

        init();

        $scope.addForm = function () {
            //var form = {
            //    name : $scope.newForm.name
            //};

            FormService.createFormForUser(user.id, $scope.newForm, function(form) {
                $scope.forms.push(form);
            });
        }

        $scope.updateForm = function () {
            if (isSelected == false) {
                return;
            }
            selectedForm.name = $scope.newForm.name;
            FormService.updateFormById(selectedForm.id, selectedForm, callback);
            isSelected = false;
        }
        
        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index].id, function (forms) {
                $scope.forms.splice(index, 1);
            });
        }

        $scope.selectForm = function (index) {
            selectedForm = $scope.forms[index];
            isSelected = true;
        }

    }
})();