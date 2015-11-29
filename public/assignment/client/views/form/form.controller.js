(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("FormController", ['$scope', '$location', '$document', '$rootScope', 'FormService', FormController]);

	//FormController function
	function FormController($scope, $location, $document, $rootScope, FormService){
		$scope.$location = $location;
		$scope.user = $rootScope.user;
		$scope.tableInput = {

		}
		//$scope.formName = "";
		//console.log("$scope", $scope);

		var initForms = function(){
			$scope.error = $scope.success = "";
			if ($scope.user){
				FormService.findAllFormsForUser($scope.user.id)
				.then(function(userForms){
					$scope.forms = userForms;
				})
				.catch(function(error){
					$scope.error = error;
				});
			}
		};
		initForms();

		$scope.addForm = function(formName){
			$scope.error = $scope.success = "";
			//console.log("$scope", $scope);
			//console.log("$scope.formName", $scope.formName);
			var _this = this;
			$scope.error = null;
			if (!formName){
				$scope.error = "Please provide the form name";
			} else if ($scope.user){
				FormService.findAllFormsForUser($scope.user.id)
				.then(function(userForms){
					$scope.forms = userForms;
					var exists = false;
					userForms.forEach(function(form, index){
						if (form.title === formName){
							exists = true;
						}
					});
					if (exists){
						$scope.error = "The entered form name for given user already exists. Please enter a different name";
					} else {
						var newFormObject = {
							title: formName
						}
						FormService.createFormForUser($scope.user.id, newFormObject)
						.then(function(newlyCreatedForm){
							$scope.forms.push(newlyCreatedForm);
							formName = _this.formName = "";
						})
						.catch(function(error){
							$scope.error = error;
						});
					}
				})
				.catch(function(error){
					$scope.error = error;
				});
			} else {
				$scope.error = "Please login to add a new form";
			}
		};

		$scope.updateForm = function(formName){
			$scope.error = $scope.success = "";
			var inputElement = document.getElementById("searchName");
			formName = inputElement.value;
			if (typeof formName === "undefined" || !formName){
				$scope.error = "Please provide a formName";
				$scope.formToUpdate = null;
			} else {
				if ($scope.formToUpdate){
					$scope.formToUpdate.title = formName;
					FormService.updateFormById($scope.formToUpdate.id, $scope.formToUpdate)
					.then(function(updatedForm){
						$scope.success = "Form updated successfully";
						$scope.formToUpdate = null;
						inputElement.value = "";
					})
					.catch(function(error){
						$scope.error = error;
						$scope.formToUpdate = null;
					});
				} else {
					$scope.error = "Please select a form first";
				}
			}
		};

		$scope.deleteForm = function(formId){
			$scope.error = $scope.success = "";
			$scope.error = "";
			if (typeof formId === "undefined"){
				$scope.error = "Please provide an formId to delete";
			} else {
				FormService.deleteFormById(formId)
				.then(function(newFormList){
					$scope.forms = newFormList;
				})
				.catch(function(error){
					$scope.error = error;
				})
			}
		};

		$scope.selectForm = function(form){
			$scope.error = $scope.success = "";
			var _this = this;
			$scope.formToUpdate = null;
			$scope.error = "";
			if (!form){
				$scope.error = "Please provide a form for selecting";
			} else {
				var selectedForm;
				$scope.forms.forEach(function(f, index){
					if (f.title == form.title){
						selectedForm = f;
					}
				});
				if (selectedForm){
					var inputElement = document.getElementById("searchName");
					inputElement.value = selectedForm.title;
					$scope.formToUpdate = selectedForm;
				} else {
					$scope.error = "no form found with name " + formName;
				}
			}
		};

		$scope.gotoFormFields = function(form){
			$scope.error = $scope.success = "";
			//update rootscope user
			$scope.selectedForm = $rootScope.selectedForm = form;
			//broadcast login auth event for listeners to update loggedin user
			$rootScope.$broadcast('selectedForm', form);
			var target = "/user/"+$scope.user.id+"/form/"+form.id+"/fields";
			//Navigate to profile : user/:userId/form/:formId/fields
			$location.path( target );
			//$location.path( "/user" );
		};

		//listen for login/sigin to grab logged in user
		$rootScope.$on("auth", function(event, user){
			$scope.error = $scope.success = "";
			$scope.error = null;
			$scope.user = $rootScope.user = user;
			if ($scope.user){
				FormService.findAllFormsForUser($scope.user.id)
				.then(function(userForms){
					$scope.forms = userForms;
				})
				.catch(function(error){
					$scope.error = error;
				});
			}
		});

	};

})();
