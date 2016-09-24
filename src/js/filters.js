netavitoApp.filter('rangePriceFilter', function() {
  return function(items, min, max) {
      var filtered = [];
      angular.forEach(items, function(item, key) {
          if(item.price <= max && item.price >= min) { 
              filtered.push(item);
          }
      });
      return filtered;
  };
});
netavitoApp.filter('rangeSquareFilter', function() {
  return function(items, min, max) {
      var filtered = [];
      angular.forEach(items, function(item, key) {
          if(item.square <= max && item.square >= min) { 
              filtered.push(item);
          }
      });
      return filtered;
  };
});
netavitoApp.filter('roomCountFilter', function() {
	return function(items, rc1, rc2, rc3, rc4, rc5, rc6){
		var filtered =[],
		i = undefined;
		if(rc1 == i && rc2 == i && rc3 == i && rc4 == i && rc5 == i && rc6 == i){
			return items;
		}else{
			angular.forEach(items, function(item, key){
				j = item.roomcount;
				if(j == rc1 || j == rc2 ||j == rc3 ||j == rc4 ||j == rc5 ||j == rc6 ){
					filtered.push(item)
				}
			});
			return filtered;
		}
	};
});
netavitoApp.filter('areaFilter', function() {
	return function(items, ra1, ra2, ra3, ra4) {
		var filtered =[],
		i = undefined;
		if(ra1 == i && ra2 == i && ra3 == i && ra4 == i){
			return items;
		}else{
			angular.forEach(items, function(item, key){
				j = item.area;
				if(j == ra1 || j == ra2 ||j == ra3 ||j == ra4 ){
					filtered.push(item)
				}
			});
			return filtered;
		}
	};
});
netavitoApp.filter('startFrom', function(){
  return function(input, start){
    start = +start;
    return input.slice(start);
  }
})