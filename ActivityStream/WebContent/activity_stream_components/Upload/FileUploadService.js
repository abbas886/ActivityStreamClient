 app.service('FileUploadService', ['$http', function ($http) {
	 console.log('FileUploadService')
            this.uploadFileToUrl = function(file, uploadUrl){

               var fd = new FormData();
               fd.append('file', file);
            
               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })
            
               .success(function(response){
            	   alert('Successfully uploaded the file')
               })
            
               .error(function(errorResponse){
            	   alert('Not able to  uploaded the file')
            	
               });
            }
         }]);
 
 