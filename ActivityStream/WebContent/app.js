var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	
	  $routeProvider

	  .when('/', {
	    templateUrl : 'activity_stream_components/User/login.html',
	    
	  })
	  .when('/toregister', {
	    templateUrl : 'activity_stream_components/User/register.html',
	    
	  })
	  .when('/tologin', {
	    templateUrl : 'activity_stream_components/User/login.html',
	    
	  })
	   .when('/home', {
	    templateUrl : 'activity_stream_components/Home/home.html',
	    
	  })
	  
	 

	  .otherwise({redirectTo: '/'});
	});

