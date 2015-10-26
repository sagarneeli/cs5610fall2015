(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    //FormService.$inject = ['$timeout', '$filter', '$q'];

    //function FormService($timeout, $filter, $q)
    function FormService()
    {
        var forms = [];

        var formService = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return formService;

        function createFormForUser(userId, form, callback) {

            form.id = guid();
            form.userId = userId;
            // save to local storage
            forms.push(form);
            callback(form);

        }


        function findAllFormsForUser(userId, callback) {

            var allForms = [];

            for (var x = 0; x < forms.length; x++) {
                var currentForm = forms[x];
                if (currentForm.userId === userId) {
                    allForms.push(currentForm);
                }
                //else {
                //    allForms = [];
                //}
            }
            callback(allForms);

        }


        function deleteFormById(formId, callback) {

            var forms = getForms();
            for (var i = 0; i < forms.length; i++) {
                var form = forms[i];
                if (form.id === formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);

        }


        function updateFormById(formId, newForm, callback) {

            var forms = getForms();
            for (var i = 0; i < forms.length; i++) {
                var currentForm = forms[i];
                if (currentForm.id === newForm.id) {
                    for (var property in currentForm) {
                        if (currentForm[property]) {
                            currentForm[property] = newForm[property];
                        }
                    }
                    //currentForm = newForm;
                    break;
                }
            }
            callback(currentForm);

        }


        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }


        function getForms() {
            return forms;
        }

    }
})();