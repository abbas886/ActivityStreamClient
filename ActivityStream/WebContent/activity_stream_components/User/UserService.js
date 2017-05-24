app.factory('UserService',function($http){
	var userService=this;
	var BASE_URL="/ActivityStreamRestServices"
		console.log('UserService')
		
		userService.validate=function(user){
			console.log('Entering - submit function in userservice')

			return $http.post(BASE_URL + "/validate/",user)
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
		
		
		
		return userService;
	})