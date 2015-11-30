'use strict';

(function(){
	angular
	.module("FormBuilderApp")
	.controller("FieldController", ['$scope', '$routeParams', '$location', '$rootScope', 'FormService', 'FieldService', FieldController]);

	//FieldController function
	function FieldController($scope, $routeParams, $location, $rootScope, FormService, FieldService){
		$scope.$location = $location;
		$scope.user = $rootScope.loggedInUser;
		$scope.fields = [];
		$scope.newFieldType = "";
		$scope.formID = $routeParams.formId || "";
		$scope.userID = $routeParams.userId || "";


		var slt = {
			"id": null,
			"label": "New Text Field",
			"fieldType": "TEXT",
			"placeholder": "New Field"
		},
		mltf = {
			"id": null,
			"label": "New Text Field",
			"fieldType": "TEXTAREA",
			"placeholder": "New Field"
		},
		date = {
			"id": null,
			"label": "New Date Field",
			"fieldType": "DATE"
		},
		dropdown = {
			"id": null,
			"label": "New Dropdown",
			"fieldType": "OPTIONS",
			"options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
		},
		checkboxes = {
			"id": null,
			"label": "New Checkboxes",
			"fieldType": "CHECKBOXES",
			"options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
		},
		radio = {
			"id": null,
			"label": "New Radio Buttons",
			"fieldType": "RADIOS",
			"options": [{"label": "Option 1", "value": "OPTION_1"}, {"label": "Option 2", "value": "OPTION_2"}, {"label": "Option 3", "value": "OPTION_3"}]
		},
		email = {
			"id": null,
			"label": "New Email Field",
			"fieldType": "EMAIL",
			"placeholder": "New Email Field"
		};

		$scope.newField = {
			"fieldType": $scope.newFieldType,
			"slt": clone(slt),
			"mltf": clone(mltf),
			"date": clone(date),
			"dropdown": clone(dropdown),
			"checkboxes": clone(checkboxes),
			"radio": clone(radio),
			"email": clone(email)
		};

		function clone(source){
			if (source && typeof source === "object"){
				return JSON.parse(JSON.stringify(source));
			} else {
				return null;
			}
		}

		function init() {
			if ($scope.selectedForm) {
				FieldService.getFieldsForForm($scope.selectedForm.id)
				.then(function(fields){
					$scope.fields = fields;
				});
			}
		}
		init();

		$scope.addField = addField;
    $scope.deleteField = deleteField;
    $scope.cloneField = cloneField;

    function addField(fieldType) {
			$scope.error = "";
			if (fieldType){
				$scope.newField.fieldType = fieldType;
				var newFieldObject = clone($scope.newField[fieldType]);
				$scope.fields.push(newFieldObject);

				FieldService.createFieldForForm($scope.selectedForm.id, newFieldObject)
				.then(function(fields){
					$scope.fields = fields;
				});
			} else {
				$scope.error = "Please select a field type to add";
			}
		};

    function deleteField(field) {
			$scope.error = "";
			if (field){
				FieldService.deleteFieldFromForm($scope.selectedForm.id, field.id)
				.then(function(remainingFields){
					$scope.fields = remainingFields;
				});
			} else {
				$scope.error = "Please select a field type to delete";
			}
		}

    function cloneField(field, index){
			var clonedField = clone(field);
			FieldService.cloneField(clonedField, index, $scope.selectedForm.id)
				.then(function(fields){
					$scope.fields = fields;
				});
		}

		$rootScope.$on("auth", function(event, user){
			$scope.user = $rootScope.loggedInUser = user;
		});

		$rootScope.$on("selectedForm", function(event, form){
			$scope.selectedForm = $rootScope.selectedForm = form;
		});

		$scope.$on("$destroy", function() {
			$scope.selectedForm = $rootScope.selectedForm = null;
		});
	};
})();
