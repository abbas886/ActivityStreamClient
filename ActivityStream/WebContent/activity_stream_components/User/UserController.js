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
						'CircleService',
						

						function($scope, $location, $rootScope, $http,
								$cookieStore, UserService, CircleService
								) {
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

							/*
							 * self.userStream = {
							 * 
							 * "userID" : "", "senderID" : "", "circleID" : "",
							 * "streamType" : "", "tag" : "", "message" : "",
							 * "postedDate" : "", }
							 */

							self.stream = {

								// "userID" : "",
								"id" : "",
								"receiverID" : "",
								"senderID" : "",
								"circleID" : "",
								"streamType" : "",
								"tag" : "",
								"message" : "",
								"postedDate" : "",
								"attachment" : "",
								"attachmentURL" : "",
							}

							self.myInBox = []

							self.myInBox = {
								"userID" : "",
								"senderID" : "",
								"circleID" : "",
								"streamType" : "",
								"tag" : "",
								"message" : "",
								"postedDate" : "",

							}
							self.myCircles = []
							self.userHome = {
								"myCircles" : [],
								"myInBox" : [],
								"errorCode" : "",
								"errorMessage" : "",
								"circleSize" : ""
							}

							self.circle = {

								"name" : "",
								"adminID" : "",
								"createdDate" : "",
								"status" : ""

							}
							self.circles = []

							self.getCircles = function() {
								console.log("Calling getCircles....")

								CircleService.getCircles().then(function(d) {
									// self.circles = d;
									$rootScope.circles = d

									$location.path("circle")
								})

							}

							self.createUser = function(user) {
								console.log("createUser...")
								UserService.createUser(user)
								.then(
										
								function(d)
								{
									self.user=d
									if(self.user.errorCode=='200')
										{
										alert("Successfully register.  You can login into the application ")
										$location.path("/")
										}
								}
								)

							};

							self.getUserHome = function() {
								console.log("Calling getUserHome....")
								$rootScope.selectedCircle = "ALL"
								UserService
										.getUserHome()
										.then(
												function(d) {
													self.userHome = d;
													$rootScope.myCircles = self.userHome.myCircles;

													$rootScope.myInBox = self.userHome.myInBox;
													$rootScope.userHome = self.userHome
													$location.path("home")
												})

							}

							/*
							 * self.send = function() {
							 * self.sendMessage(self.stream.message) }
							 */
							self.send = function() {
								console.log('sending message..')
								var currentTime = new Date();
								var currentTimeString = currentTime
										.toUTCString();
								self.stream.postedDate = currentTimeString;
								self.stream.streamType = 'String';
								self.stream.tag = 'Message'
								// self.stream.message = message
								self.stream.receiverID = self.selectedUserID;
								self.stream.senderID = $rootScope.currentUser.id
								self.stream.circleID = $rootScope.selectedCircle
								// self.stream.attachmentURL =
								// "D:\Softwares\Server\apache-tomcat-9.0.0.M6\apache-tomcat-9.0.0.M6\Upload"
								UserService.send(self.stream);
								console.log('sent message successfully')

						/*		var formData = new FormData();
								formData.append('file', self.stream.attachment);

								// var file = self.stream.attachment
								FileUploadService.uploadFile(formData);
*/
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

													} else {
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

												})
							};

							self.getMyCircleMessages = function(circle) {
								console.log('getMyCircleMessages' + circle)
								$rootScope.selectedCircle = circle
								UserService
										.getMyCircleMessages(circle)
										.then(

												function(d) {

													self.userHome = d;
													self.myCircles = self.userHome.myCircles;
													$rootScope.myCircles = self.userHome.myCircles;

													$rootScope.myInBox = self.userHome.myInBox;
													$rootScope.userHome = self.userHome
													$location.path("home")
												})
							}

							self.logout = function() {
								console.log("logout")
								self.userLoggedIn = "false"
								$rootScope.myCircles = {};
								$rootScope.myInBox = {};
								$rootScope.userHome = {};
								$rootScope.currentUser = {}
								UserService.logout()
								$location.path('/');

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
								//$scope.myForm.$setPristine(); // reset Form
							};

							self.otherUserIds = []
							self.selectedUserID = ''
							self.isOneToOne = 0
							self.showUsers = function() {
								console.log("Calling function showUsers")
								console.log('self.stream.message'
										+ self.stream.message)
								if (self.stream.message == '@') {

									self.isOneToOne = 1
									UserService
											.getAllUsers()
											.then(

													function(d) {
														self.users = d
														var allUserIds = _
																.pluck(
																		self.users,
																		"id");
														var loggedInUserID = $rootScope.currentUser.id
														self.otherUserIds = _
																.without(
																		allUserIds,
																		loggedInUserID);

														console
																.log(self.otherUserIds)

														self.stream.message = '@'
																+ self.selectedUserID;
													})

								} else {
									self.isOneToOne = 0
								}

							}

							self.setSelectedUser = function() {
								self.stream.message = '@' + self.selectedUserID
										+ "   "
							}

						} ]);
