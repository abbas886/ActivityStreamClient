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
							
							self.userStream = {
									
									"userID" : "",
				              		"senderID" : "",
				              		"circleID" : "",
				              		"streamType" : "",
				              		"tag" : "",
				              		"message" : "",
				              		"postedDate" : "",
							}
							
							self.myInBox =  []
			              		

			              	
							self.myInBox =  {
			              		"userID" : "",
			              		"senderID" : "",
			              		"circleID" : "",
			              		"streamType" : "",
			              		"tag" : "",
			              		"message" : "",
			              		"postedDate" : "",

			              	}
							self.myCircles = []
							self.userHome=
								{
									"myCircles" : [],
									"myInBox"  : [],
									              "errorCode" : "",
									              "errorMessage" : ""
								}
							
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

													self.userHome = d;
													console
															.log("user.errorCode: "
																	+ self.user.errorCode)
													if (self.userHome.errorCode == "404")

													{
														alert(self.userHome.errorMessage)

														self.user.id = "";
														self.user.password = "";

													} else
														{
														self.myCircles = self.userHome.myCircles;
														$rootScope.myCircles = self.userHome.myCircles;

														$rootScope.myInBox = self.userHome.myInBox;

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
