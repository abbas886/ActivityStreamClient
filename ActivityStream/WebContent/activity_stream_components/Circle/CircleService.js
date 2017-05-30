app.factory('CircleService',['$http', '$rootScope', function($http,$rootScope){
	var circleService=this;
	var BASE_URL="/ActivityStreamRestServices"
		console.log('CircleService')
		
		
	circleService.getCircles=function(){
		console.log('Calling getCircles')
		return $http.get(BASE_URL + "/circles/")
		.then(
                function(response){
                	$rootScope.circles=response.data
                  return response.data;
                }
        );
	}
	
	circleService.getCircleUsers=function(circleName){
		console.log('Calling getCircles')
		return $http.get(BASE_URL + "/circleUsers/"+circleName)
		.then(
                function(response){
                	/*$rootScope.circles=response.data*/
                  return response.data;
                }
        );
	}
	
	
	circleService.createCircle=function(circle){
		console.log('Calling createCircle')
		return $http.post(BASE_URL + "/circle/create/",circle)
		.then(
                function(response){
                	 return response.data;
                }
        );
	}

		return circleService;
	}])