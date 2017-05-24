'use strict';

app
		.controller(
				'UserController',
				[
						'$scope',
						'$location',
						'$rootScope',
						'$http',
						'UserService',
						
						function($scope, $location, $rootScope,$http,UserService) {
							console.log("UserController...")
						 var self = this;
							self.user = {
								id : '',
								name : '',
								password : '',
								errorCode : '',
								errorMessage : ''
													
							};
							
								self.createUser = function(user) {
								console.log("createUser...")
								UserService.createUser(user)
										
							};

						

							self.validate = function(user) {
								console.log("authenticate...")
								
								UserService
										.validate(user)
										.then(

												function(d) {

													self.user = d;
													console
															.log("user.errorCode: "
																	+ self.user.errorCode)
													if (self.user.errorCode == "404")

													{
														alert(self.user.errorMessage)

														self.user.id = "";
														self.user.password = "";

													} else
														{
														$location.path("home")
														}
														
										
										
																					
							})};

						
							self.login = function() {
								{
									console.log('login validation????????',
											self.user);
									self.validate(self.user);
									
								}

							};

							self.submit = function() {
								{
									console.log('Saving New User', self.user);
									self.createUser(self.user);
								}
								self.reset();
							};

							self.reset = function() {
								self.user = {
									id : '',
									name : '',
									password : '',
								
								};
								$scope.myForm.$setPristine(); // reset Form
							};

						} ]);
