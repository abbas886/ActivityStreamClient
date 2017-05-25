var app = angular.module('myApp', ['ngRoute','ngCookies']);

app.config(function($routeProvider) {
	
	  $routeProvider

	  .when('/', {
	    templateUrl : 'activity_stream_components/User/login.html',
	    controller: "UserController"
	    
	  })
	  .when('/toregister', {
	    templateUrl : 'activity_stream_components/User/register.html',
	    controller: "UserController"
	    
	  })
	  .when('/tologin', {
	    templateUrl : 'activity_stream_components/User/login.html',
	    controller: "UserController"
	    
	  })
	   .when('/home', {
	    templateUrl : 'activity_stream_components/Home/user_home.html',
	    controller: "UserController"
	    
	  })
	  
	 

	  .otherwise({redirectTo: '/'});
	});

app.run( function ($rootScope, $location,$cookieStore, $http,UserService) {
console.log("Refreshing....")
	 $rootScope.$on('$locationChangeStart', function (event, next, current) {
		 console.log("$locationChangeStart")
		
	    if(next===current && $rootScope.selectedCircle!='')
	    	{
	    	 UserService.refresh();
	    	}
	    
	      
			
	 }
	       );
	 
	 
	 // keep user logged in after page refresh
    $rootScope.currentUser = $cookieStore.get('currentUser') || {};
    if ($rootScope.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser; 
    }

});
