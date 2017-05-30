'use strict';

app
		.controller(
				'CircleController',
				[
						'$scope',
						'$location',
						'$rootScope',
						'$http',
						'$cookieStore',
						'CircleService',
						'UserService',
						
						function($scope, $location, $rootScope,$http,$cookieStore,CircleService,UserService) {
							console.log("CircleService...")
						 var self = this;
							
							self.circleUser = {
									"id":"",
									"userID":"",
									
									"circleID":""
							}
								
							self.users=[]
							self.user = {
									id : '',
									name : '',
									password : '',
									errorCode : '',
									errorMessage : ''
														
								};
														
							
							self.circleUsers=[]
						self.circle ={
								
								"name" : "",
								"adminID": "",
								"createdDate":"",
								"status" :""
						
						}
						self.circles=[]
						
						self.circle_name=''
							
						self.createCircle = function()
						{
							  var currentTime = new Date();
							   var currentTimeString = currentTime.toUTCString();
							   self.circle.createdDate=currentTimeString
							   self.circle.adminID=$rootScope.currentUser.id
							   self.circle.status='A'
							CircleService.createCircle(self.circle)
							
							CircleService.getCircles()
									.then(
											function(d)
											{
												//self.circles = d;
												$rootScope.circles=d
												
												$location.path("circle")		
											}
									)
							   
							   $location.path("circle")	
						}
						
						self.getCircleUsers = function(circleName)
						{
							CircleService.getCircleUsers(circleName)
							.then(
											function(d)
											{
												$rootScope.selectedCircle = circleName
												$rootScope.circleUsers=d
												
												$location.path("circle")		
											}
									)
						}
						
						self.getOtherUsers = function()
						{
							UserService.getAllUsers()
							.then(
											function(d)
											{
												$rootScope.users = d
												
												var allUserIds = _.pluck($rootScope.users, "id");
												var existingUserIds = _.pluck($rootScope.circleUsers, "userID");
												var otherUserIds= _.difference(allUserIds,existingUserIds);
												
												$rootScope.otherUserIds = otherUserIds
												
												$location.path("circle")		
											}
									)
						}

						
						self.addUserToCircle = function(userID)
						{
							var circleID =$rootScope.selectedCircle
							CircleService.addUserToCircle(circleID,userID)
							.then(
											function(d)
											{
												$rootScope.selectedCircle = circleID
												$rootScope.circleUsers=d
												
												$location.path("circle")		
											}
									)
							
						}
						
						self.removeUserFromCircle = function(userID)
						{
							var circleID =$rootScope.selectedCircle
							CircleService.removeUserFromCircle(circleID,userID)
							.then(
											function(d)
											{
												$rootScope.selectedCircle = circleID
												$rootScope.circleUsers=d
												
												$location.path("circle")		
											}
									)
							
						}


							
							
						
						 
						} ]);
