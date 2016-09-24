netavitoApp.factory('getRentsService', function($http, $q) {
var deffered = $q.defer();
  var data = [];  
  var getRentsService = {};

  getRentsService.async = function() {
    $http.get('app/json/rents.json')
    .success(function (d) {
      data = d;
      deffered.resolve();
    });
    return deffered.promise;
  };
  getRentsService.data = function() { 
    return data; 
  };

  return getRentsService;
});
netavitoApp.factory('favoriteRent', function() {
  var favoriteList = [];
return {
  get: favoriteList,
  set: function(id){
        if(favoriteList.indexOf(id) < 0){
          favoriteList.push(id);
        } else {
          favoriteList.splice(favoriteList.indexOf(id), 1)
        }
      },
  isIn:function(id){
        if(favoriteList.indexOf(id) < 0){
          return false
        } else {
          return true
        }
      }
  
  }
});


