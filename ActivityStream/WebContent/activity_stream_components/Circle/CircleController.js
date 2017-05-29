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
						
						function($scope, $location, $rootScope,$http,$cookieStore,CircleService) {
							console.log("CircleService...")
						 var self = this;
							
							
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
							
							
						
						 
						} ]);
