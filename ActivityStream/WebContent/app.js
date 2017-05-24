var app = angular.module('myApp', ['ngRoute']);

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
	    templateUrl : 'activity_stream_components/Home/home.html',
	    
	  })
	  
	 

	  .otherwise({redirectTo: '/'});
	});

