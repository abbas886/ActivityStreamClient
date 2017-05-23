'use strict';

app
		.controller(
				'UserController',
				[
						'$scope',
						'$location',
						'$rootScope',
						'$http',
						function($scope, $location, $rootScope) {
							console.log("UserController...")
						 var self = this;
							self.user = {
								id : '',
								name : '',
								password : '',
													
							};
							
							self.userLoggedIn="";

							self.currentUser = {
								id : '',
								name : '',
								password : '',
								
								
							};

							self.users = []; // json array

						
							// self.fatchAllUsers();

							self.createUser = function(user) {
								console.log("createUser...")
								UserService
										.createUser(user)
										.then(
												function(d) {
													alert("Thank you for registration")
													$location.path("/")
												},
												function(errResponse) {
													console
															.error('Error while creating User.');
												});
							};

						

							self.authenticate = function(user) {
								console.log("authenticate...")
								if(user.id=='niit' && user.password=='niit'){
									alert('valid credentials')
									$location.path("/home")
								}
								else
									{
									alert('invalid credentials')
									}
						
							};

							self.logout = function() {
								console.log("logout")
								self.userLoggedIn="false"
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								UserService.logout()
								$location.path('/');

							}

							// self.fetchAllUsers(); //calling the method

							// better to call fetchAllUsers -> after login ???

							self.login = function() {
								{
									console.log('login validation????????',
											self.user);
									self.authenticate(self.user);
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
