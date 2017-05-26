'use strict';

app
		.controller(
				'UserController',
				[
						'$scope',
						'$location',
						'$rootScope',
						'$http',
						'$cookieStore',
						'UserService',
						
						function($scope, $location, $rootScope,$http,$cookieStore,UserService) {
							console.log("UserController...")
						 var self = this;
							self.user = {
								id : '',
								name : '',
								password : '',
								errorCode : '',
								errorMessage : ''
													
							};
							
														
							self.currentUser = {
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
							
self.stream = {
									
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

							
							self.getUserHome = function()
							{
								console.log("Calling getUserHome....")
								$rootScope.selectedCircle = "ALL"
									UserService.getUserHome()
									.then(
											function(d)
											{
												self.userHome = d;
												$rootScope.myCircles = self.userHome.myCircles;

												$rootScope.myInBox = self.userHome.myInBox;
												$rootScope.userHome = self.userHome
												$location.path("home")		
											}
									)
																						
							}
						
						  self.send =function()
						  {
							  self.sendMessage(self.stream.message)
						  }
						   self.sendMessage = function(message)
						   {
							   console.log('sending message..')
							   var currentTime = new Date();
							   var currentTimeString = currentTime.toUTCString();
							   self.userStream.postedDate=currentTimeString;
							   self.userStream.streamType='String';
							   self.userStream.tag='Message'
								   self.userStream.message=message
							   UserService.send(self.userStream);
							   console.log('send message successfully')
						   }

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
														$rootScope.userHome = self.userHome
														$rootScope.currentUser = user
														$cookieStore.put(
																'currentUser',
																user);

														$http.defaults.headers.common['Authorization'] = 'Basic '
																+ $rootScope.currentUser;
														

														$location.path("home")
														}
														
										
										
																					
							})};
							
							self.getMyCircleMessages=function(circle)
							{
								
							}

						
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
