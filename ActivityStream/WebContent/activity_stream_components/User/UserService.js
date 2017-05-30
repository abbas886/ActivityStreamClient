app.factory('UserService',['$http', '$rootScope', function($http,$rootScope){
	var userService=this;
	var BASE_URL="/ActivityStreamRestServices"
		console.log('UserService')
		
		
		userService.userStream = {
									
									"userID" : "",
				              		"senderID" : "",
				              		"circleID" : "",
				              		"streamType" : "",
				              		"tag" : "",
				              		"message" : "",
				              		"postedDate" : "",
							}
	
	userService.stream = {
		"id":"",
		"parentID":"",
		"receiverID" : "",
  		"senderID" : "",
  		"circleID" : "",
  		"streamType" : "",
  		"tag" : "",
  		"message" : "",
  		"postedDate" : "",
}
							
	userService.myInBox =  []
			              		

			              	
	userService.myInBox =  {
			              		"userID" : "",
			              		"senderID" : "",
			              		"circleID" : "",
			              		"streamType" : "",
			              		"tag" : "",
			              		"message" : "",
			              		"postedDate" : "",

			              	}
	userService.myCircles = []
	userService.userHome=
								{
									"myCircles" : [],
									"myInBox"  : [],
									              "errorCode" : "",
									              "errorMessage" : ""
								}
	
		userService.validate=function(user){
			console.log('Entering - submit function in userservice')

			return $http.post(BASE_URL + "/validate/",user)
			.then(
                    function(response){
                        return response.data;
                    }
            );
		}
	
	userService.refresh=function(){
		console.log('Calling refresh')
		return $http.get(BASE_URL + "/refresh/")
		.then(
                function(response){
                	userService.userHome = response.data
                	$rootScope.myCircles = userService.userHome.myCircles;

					$rootScope.myInBox = userService.userHome.myInBox;
					$rootScope.userHome = userService.userHome
			
                    return response.data;
                }
        );
	}
	
	userService.getUserHome=function(){
		console.log('Calling getUserHome')
		return $http.get(BASE_URL + "/refresh/")
		.then(
                function(response){
                  return response.data;
                }
        );
	}
	
	userService.send=function(userStream){
		console.log('Calling getUserHome')
		return $http.post(BASE_URL + "/send/",userStream)
		.then(
                function(response){
                  return response.data;
                }
        );
	}
	
	

	userService.getMyCircleMessages=function(circle)
	{
		console.log('Calling getMyCircleMessages' + circle)
		return $http.get(BASE_URL + "/circle_messages/"+circle)
		.then(
                function(response){
                  return response.data;
                }
        );
		
	}
	
	userService.getAllUsers=function()
	{
		console.log('Calling getAllUsers')
		return $http.get(BASE_URL + "/users/")
		.then(
                function(response){
                  return response.data;
                }
        );
		
	}
	
		
		userService.registerUser=function(user){
			return $http.post(BASE_URL + "/register/",user) 
			.then(
                    function(response){
                        return response.data;
                    }
            );
		}
		userService.logout=function(){
        	console.log('logout....')
            return $http.get(BASE_URL+'/logout')
                    .then(
                            function(response){
                            	alert(response.data.errorMessage)
                                return response.data;
                            }
                    );
		}
		
		
		return userService;
	}])