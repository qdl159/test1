(function(){

	'use strict';

	angular.module('main')
		.controller('LoginCtrl',[ '$http', 'LoginService', '$sce', 
		 function($http, LoginService, $sce){
		 			var scope = this;
					scope.signup = function(user){
						$http.post('/api/login', user).success(function(user){
							scope.username = user.name;
							//TODO: handle error
						});
					};

					scope.login = function(user){
						user.isLogin = true;
						$http.post('/api/login', user).success(function(info){
						if (info.status) {
							scope.username = user.username;
							LoginService.loginModal.close({username: user.username});
							} else {
							//TODO: show error message in login modal
							scope.errmsg = $sce.trustAsHtml('<i>login fail: ' + (info.err || 'unknow error')+ '</i>');	
							}
							
						});
					};
		}])
})();