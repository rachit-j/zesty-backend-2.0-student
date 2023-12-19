angular.module('myApp.services', [])
.factory('AuthService', function($http) {
	var user = null;
	var TOKEN_KEY = 'jwtToken'; // set token value

  var getJwtToken = function() {
    return localStorage.getItem(TOKEN_KEY); // get token
  };

  var setJwtToken = function(token) {
      localStorage.setItem(TOKEN_KEY, token); // give token
  };

  var removeJwtToken = function() {
      localStorage.removeItem(TOKEN_KEY); // redact token
  };

  var createAuthorizationTokenHeader = function() { // make the header for getting the token
      var token = getJwtToken();
      if (token) {
          return {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json'
          };
      } else {
          return {
            'Content-Type': 'application/json'
          };
      }
  }

  var getUser = function() {
    return $http({
      headers: createAuthorizationTokenHeader(), // utilize that header
      method: 'GET',
      url: 'api/whoami'
    });
  };

  return { // put this on the front page
    getUser: getUser,
    getJwtToken: getJwtToken,
    setJwtToken: setJwtToken,
    removeJwtToken: removeJwtToken,
    createAuthorizationTokenHeader: createAuthorizationTokenHeader
  };
});