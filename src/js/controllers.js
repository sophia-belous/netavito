var netavitoApp = angular.module('netavitoApp', ['ngRoute','angularFileUpload','ymaps','angularRangeSlider']);
var favorite = [];
netavitoApp.config(function(ymapsConfig) {
    //включим кластеризацию
    ymapsConfig.clusterize = true;
})
netavitoApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/page', {
        templateUrl: 'views/page.html',
        controller: 'pageCtrl'
      })
      .when('/page/:pageId', {
        templateUrl: 'views/page.html',
        controller: 'pageCtrl'
      })
      .when('/rents', {
        templateUrl: 'views/rentsmap.html',
        controller: 'getRentsCtrl'
      })
      .when('/rents/:rentid', {
        templateUrl: 'views/rentCart.html',
        controller: 'rentCartCtrl'
      })
      .when('/favorite', {
        templateUrl: 'views/favorite.html',
        controller: 'favoriteCtrl'
      })
 			.when('/cabinet', {
        templateUrl: 'views/cabinetindex.html',
        controller: 'cabinetIndexCtrl'
      })     
      .when('/cabinet/pay', {
        templateUrl: 'views/cabinetpay.html',
        controller: 'cabinetPayCtrl'
      })  
     	.when('/cabinet/add', {
        templateUrl: 'views/cabinetadd.html',
        controller: 'cabinetAddCtrl'
      }) 
      .when('/cabinet/option', {
        templateUrl: 'views/cabinetoption.html',
        controller: 'cabinetOptionCtrl'
      }) 
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'indexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
netavitoApp.controller('headerCtrl', function(favoriteRent,$scope){
		$scope.baseUrl = "http://NETAvito.ru";
		$scope.logo = "img/tmp_logo.png";
		$scope.content = "Главная";
		$scope.favCount = function(){
			favRent = favoriteRent.get.length
			if(favRent == 0){
				return ''
			} else {
				return favRent;
			}
		};

});


netavitoApp.controller('headerMinCtrl', function(favoriteRent,$scope){
		$scope.baseUrl = "http://NETAvito.ru";
		$scope.logo = "img/tmp_logo.png";
		$scope.content = "Главная";
		$scope.favCount = function(){
			favRent = favoriteRent.get.length
			if(favRent == 0){
				return ''
			} else {
				return favRent;
			}
		};
		$scope.toggleShowHeader = function(){
			if($scope.showHeaderBtn == true){
				$scope.showHeaderBtn = false;
				$scope.isShowHeader = true
			}else{
				$scope.showHeaderBtn = true;
				$scope.isShowHeader =false
			}
		}	
		$scope.showHeaderBtn = true;

			$scope.showPopUpMsg = false;
  $scope.openPopUp = function() {
		$scope.showPopUpMsg = true;
  }
	$scope.closePopUp = function(){
		$scope.showPopUpMsg = false;
	}
	$scope.setPopupSwitch = function(v){
		$scope.popupSwitch = v;
	};
});
netavitoApp.controller('indexCtrl', function($scope){
		$scope.baseUrl = "http://NETAvito.ru";
		$scope.logo = "img/tmp_logo.png";
		$scope.content = "Главная";
});
netavitoApp.controller('newRentCtrl', function($scope){
		$scope.__currency = '₽';
		$scope.__square = 'м²';
		$scope.newrent = {
			title:"Новые объявления",
			count:10,
			rents: [

     {'id':'113',
     'img':'img/rents/place.jpg',
     'type':'2х комнатная квартира',
     'adres':'ул. Металлургов',
     'price':'13000',
     'square':'32'},
     {'id':'114',
     'img':'img/rents/place.jpg',
     'type':'2х комнатная квартира',
     'adres':'ул. Металлургов',
     'price':'19000',
     'square':'31'},
     {'id':'115',
     'img':'img/rents/place.jpg',
     'type':'Торговая площадь',
     'adres':'ул. Маршала Жукого',
     'price':'8000',
     'square':'17'},
     {'id':'116',
     'img':'img/rents/place.jpg',
     'type':'2х комнатная квартира',
     'adres':'ул. Верхняя с самым боьшим названием',
     'price':'53000',
     'square':'37'},
     {'id':'117',
     'img':'img/rents/place.jpg',
     'type':'2х комнатная квартира',
     'adres':'пр. Гагарина',
     'price':'33000',
     'square':'37'}]
		};
			$scope.addFavorite = function(id){
				favorite.push(id);
				alert(id);
			};


});

netavitoApp.controller('pageCtrl', function($scope){
		$scope.baseUrl = "http://NETAvito.ru";
		$scope.logo = $scope.baseurl + "img/logo.png";
		$scope.content = "Вот так";
		
});
netavitoApp.controller('rentsTableItemCtrl', function($scope,$timeout){
		//home true - жилое
		//home false - комерческое
		$scope.__currency = '₽';
		$scope.__square = 'м²';
		$scope.buttonShowNumber = 'Показать номер';
		$scope.showNumber = function(number){
			  $scope.buttonShowNumber = number;
		};
		$scope.isShowInfo = false
		$scope.buttonShowInfo = 'Показать полную информацию';
		$scope.isShowInfoButton = function(img){
			if(img.length > 0){
				return true
			} else {
				$scope.isShowInfo = true;
				return false
			}
		};
		$scope.showInfo = function(img){
				if($scope.buttonShowInfo === 'Показать полную информацию'){
			  	$scope.buttonShowInfo = 'Показать фото';
			  	$scope.isShowInfo = true;
				}else{
					$scope.buttonShowInfo = 'Показать полную информацию';
					$scope.isShowInfo = false;
				}
		};
		$scope.infoList = function(v){
		 	return v	? 'true' : 'false'
		};
		$scope.renItemMap = function(map){
			$scope.geoObject = [{
            geometry:{
                type:'Point',
                coordinates:map
            }
          }]
      return $scope.geoObject[0]

		};
		var _map;
		$scope.afterMapInitItem = function(map){

    	$scope.yamap = map;

		};
	$scope.createItemGeoObjects = function(rent){
    		var point = rent;
				return {
            geometry:{
                type:'Point',
                coordinates:[32.0402,54.7807]
            }}
				}

	var arrayImg = [],i
    $scope.currentPhoto = function(img) {
    	arrayImg = img
    	if(i == undefined){
    		i = 0
    	$scope.current = img[i]
    	}
    	return $scope.current
    }
    $scope.nextPhoto = function(img){
        i = $scope.getIndex(img.indexOf($scope.current), 1);
        $scope.current = img[i];
    },
    $scope.prevPhoto = function(img){
        i = $scope.getIndex(img.indexOf($scope.current), -1);
        
        $scope.current = img[i];
    },
    $scope.getIndex = function(currentIndex, shift){
        var len = arrayImg.length;
        return (((currentIndex + shift) + len) % len)
    }
    $scope.rentType = function(unity){
    	if(unity != undefined){
    		return ' | '+ unity
    	}

    }
});

netavitoApp.controller('itemRentsMapCtrl', function($scope){
		$scope.__currency = '₽';
		$scope.__square = 'м²';



});
netavitoApp.controller('rentsMapCtrl', function($scope, $http){

		//home true - жилое
		//home false - комерческое

///////filters vars/////////////
		
///////filters vars/////////////
		/*var createGeoObjects = function(points){
				var geoObjects = [];
    		var point ;
				for(var i = 0, ii = points.length; i < ii; i++){
					 point = points[i].map;
					 geoObjects.push({
            geometry:{
                type:'Point',
                coordinates:point
            },
            properties:{
                balloonContentBody: points[i].adres + '<br>' + points[i].price + $scope.__currency,
                clusterCaption: points[i].adres
            }
        });
				$scope.geoObjects = geoObjects;
				}
			};
			
		$scope.applyFilter = function(){
			createGeoObjects($scope.rentsFiltered);
			filterPrice();
		};

		$scope.center = [32.04,54.78];
		$scope.enter = function(e){
		    var target = e.get('target');
		    if (typeof target.getGeoObjects != 'undefined') {
		        // Событие произошло на кластере.
		        target.options.set('preset', 'islands#invertedPinkClusterIcons');
		    } else {
		        // Событие произошло на геообъекте.
		        target.options.set('preset', 'islands#pinkIcon');
		    }
		};
		$scope.leave = function(e){
		    var target = e.get('target');
		    if (typeof target.getGeoObjects != 'undefined') {
		        // Событие произошло на кластере.
		        target.options.set('preset', 'islands#invertedVioletClusterIcons');
		    } else {
		        // Событие произошло на геообъекте.
		        target.options.set('preset', 'islands#violetIcon');
		    }
		};*/

});
netavitoApp.controller('rangeSliderCtrl', function($scope){
 $scope.minRangeSlider = {
        minValue: 10,
        maxValue: 90,
        options: {
            floor: 0,
            ceil: 100,
            step: 1
        }
    };

});

netavitoApp.controller('rentCartCtrl', function(getRentsService, $scope, $routeParams, $filter, $timeout) {
	$scope.rentid = $routeParams.rentid;
	getRentsService.async().then(function() {
    $scope.rents = getRentsService.data();

  });

	$scope.showdetails = function(fish_id) {
	     $scope.rentCart = $filter('filter')($scope.rents, {id: fish_id}, true)[0];
	 
	 }
	 var arrayImg = [],i
	$timeout(function() {
		$scope.showdetails($scope.rentid);
	console.log($scope.rentCart);
	$scope.bigCartImg = $scope.rentCart.img[0];
	
   $scope.currentPhoto = function(img) {
   	arrayImg = img
   	if(i == undefined){
   		i = 0
   	$scope.current = img[i]
   	}
   	return $scope.current 
   }
	
	}, 30)
	$scope.infoList = function(v){
	 	return v	? 'true' : 'false'
	};
	$scope.buttonShowNumber = 'Показать номер';
	$scope.showNumber = function(number){
		  $scope.buttonShowNumber = number;
	};

   $scope.nextBigImg = function(img){
       i = $scope.getIndex(img.indexOf($scope.current), 1);
       $scope.current = img[i];
   }
   $scope.prevBigImg = function(img){
       i = $scope.getIndex(img.indexOf($scope.current), -1);
       
       $scope.current = img[i];
   }
   $scope.getIndex = function(currentIndex, shift){
       var len = arrayImg.length;
       return (((currentIndex + shift) + len) % len)
   }
});
netavitoApp.controller('cabinetIndexCtrl',  function(getRentsService, $scope, $routeParams, $filter, $timeout){
	
});
netavitoApp.controller('cabinetPayCtrl',  function(getRentsService, $scope, $routeParams, $filter, $timeout){
	
});
netavitoApp.controller('cabinetAddCtrl',  function(getRentsService, $scope, FileUploader, $routeParams, $filter, $timeout){
	$scope.addRent = {
		"id":undefined,
		"img":undefined,
		"type":undefined,
		"roomcount":undefined,
		"unity": undefined,
		"homeless": undefined,
		"category": undefined,
		"building": undefined,
		"city": "Смоленск",
		"adres":undefined,
		"area":undefined,
		"map":[],
		"price":undefined,
		"square":undefined,
		"payments":undefined,
		"rem":undefined,
		"time":undefined,
		"flor":undefined,
		"maxflor":undefined,
		"filterflor":undefined,
		"material":undefined,
		"heating":undefined,
		"number":undefined,
		"numbers":[],
		"propnewhome":undefined,
		"propfurniture":undefined,
		"proptv": undefined,
		"propfridge": undefined,
		"propwasher": undefined,
		"propmicrowave": undefined,
		"propkitchen":undefined,
		"propbalcony":undefined,
		"propelevator":undefined,
		"propinternet": undefined,
		"propparking":undefined,
		"propconditioning":undefined,
		"propphone":undefined,
		"propappliances": undefined,
		"propsmoking": undefined,
		"propanimal":undefined,
	};
$scope.mapClick = function(e){
	var coords = e.get('coords');
	$scope.addRent.map = coords;
	$scope.myPlacemark ={
		geometry:{
                  type:'Point',
                  coordinates:coords
              }
		
	}
	console.log($scope.addRent.map)
};
$scope.addPhone = function(number){
	$scope.addRent.number = undefined;
	if(number == undefined){
	}else{
		if($scope.addRent.numbers.indexOf(number) < 0){
			$scope.addRent.numbers.push(number);
			//Номер уже добавлен
		}else{
			
		}
	}
};
$scope.removePhone = function(number,FileUploader){
	$scope.addRent.numbers.splice($scope.addRent.numbers.indexOf(number), 1)
};
///////ulpader/////////
 	var uploader = $scope.uploader = new FileUploader({
 	    url: 'upload.php'
 	});
 	// FILTERS
 	uploader.filters.push({
 	    name: 'customFilter',
 	    fn: function(item /*{File|FileLikeObject}*/, options) {
 	        return this.queue.length < 10;
 	    }
 	});
 	// CALLBACKS
 	uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
 	    console.info('onWhenAddingFileFailed', item, filter, options);
 	};
 	uploader.onAfterAddingFile = function(fileItem) {
 	    console.info('onAfterAddingFile', fileItem);
 	};
 	uploader.onAfterAddingAll = function(addedFileItems) {
 	    console.info('onAfterAddingAll', addedFileItems);
 	};
 	uploader.onBeforeUploadItem = function(item) {
 	    console.info('onBeforeUploadItem', item);
 	};
 	uploader.onProgressItem = function(fileItem, progress) {
 	    console.info('onProgressItem', fileItem, progress);
 	};
 	uploader.onProgressAll = function(progress) {
 	    console.info('onProgressAll', progress);
 	};
 	uploader.onSuccessItem = function(fileItem, response, status, headers) {
 	    console.info('onSuccessItem', fileItem, response, status, headers);
 	};
 	uploader.onErrorItem = function(fileItem, response, status, headers) {
 	    console.info('onErrorItem', fileItem, response, status, headers);
 	};
 	uploader.onCancelItem = function(fileItem, response, status, headers) {
 	    console.info('onCancelItem', fileItem, response, status, headers);
 	};
 	uploader.onCompleteItem = function(fileItem, response, status, headers) {
 	    console.info('onCompleteItem', fileItem, response, status, headers);
 	};
 	uploader.onCompleteAll = function() {
 	    console.info('onCompleteAll');
 	};
 	console.info('uploader', uploader);
//////////end-uploader
});
netavitoApp.controller('cabinetOptionCtrl',  function(getRentsService, $scope, $routeParams, $filter, $timeout){
	
});
netavitoApp.controller('paginationCtrl', function($scope){
  $scope.currentPage = 0;
  $scope.itemsPerPage = 5;
  $scope.items = [];
  for(var i=0; i<25; i++){
    $scope.items.push('Product ' + i);
  }
  $scope.firstPage = function() {
    return $scope.currentPage == 0;
  }
  $scope.lastPage = function() {
    var lastPageNum = Math.ceil($scope.items.length / $scope.itemsPerPage - 1);
    return $scope.currentPage == lastPageNum;
  }
  $scope.numberOfPages = function(){
    return Math.ceil($scope.items.length / $scope.itemsPerPage);
  }
  $scope.startingItem = function() {
    return $scope.currentPage * $scope.itemsPerPage;
  }
  $scope.pageBack = function() {
    $scope.currentPage = $scope.currentPage - 1;
  }
  $scope.pageForward = function() {
    $scope.currentPage = $scope.currentPage + 1;
  }
});