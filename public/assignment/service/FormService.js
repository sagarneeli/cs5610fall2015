(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    FormService.$inject = ['$timeout', '$filter', '$q'];

    function FormService($timeout, $filter, $q)
    {
        var formService = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return formService;
    }
})();