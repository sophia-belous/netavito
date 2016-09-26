netavitoApp.controller('getRentsCtrl', function(getRentsService,favoriteRent, $location, $scope, $interval) {
	var minMaxPrice;
  getRentsService.async().then(function() {
    $scope.rents = getRentsService.data();
    $scope.Filtered = $scope.$eval("rents | filter:rentQuery |rangePriceFilter:minPrice:maxPrice | rangeSquareFilter:minSquare:maxSquare | roomCountFilter:rentRoomCount1:rentRoomCount2:rentRoomCount3:rentRoomCount4:rentRoomCount5:rentRoomCount6 | areaFilter:rentArea1:rentArea2:rentArea3:rentArea4 |filter:{ category:rentCategoryQuery, time:rentTime,  filterflor:rentFlor,payments:rentPayments,rem:rentRem,material:rentMaterial,heating:rentHeating, propnewhome:PropNewhome, propfurniture:PropFurniture, proptv:PropTv, propfridge:PropFridge, propwasher:PropWasher, propmicrowave:PropMicrowave, propkitchen:PropKitchen, propbalcony:PropBalcony, propelevator:PropElevator, propinternet:PropInternet, propparking:PropParking, propconditioning:PropConditioning, propphone:PropPhone, propappliances:PropAppliances, propsmoking:PropSmoking, propanimal:PropAnimal}");   
    createGeoObjects()
    min = $scope.rents[0].price
   //minmax = minMaxPrice($scope.rentCategoryQuery)
   //$scope.itemsslider[0].value = minmax[0]
   //$scope.itemsslider[1].value = minmax[1]
    var arrayImg = [],i = 0
    $scope.currentPhoto = function(img) {
      arrayImg = img
      if(i == undefined){
        i = 0
      $scope.current = img[i]
      }
      return $scope.current
    }
     var  min = $scope.rents[0].price,
     max = min;
     minMaxPrice = function(category) {
       var myArray = []
       angular.forEach($scope.rents, function(item, key){
         if(item.category == category){
					 console.log(item.category)
				 		console.log(category)	
           if(item.price > max){
             max = item.price
           }
           if(item.price < min){
             min = item.price
           }
         }
       });
       return [min,max]
     }

		//здесь pfrfyxbdftncz обновление выдачи с фильтрацией
		//установка минимальной и максимальной цены в зависимости от категорр
		$scope.$watch('rentCategoryQuery', function(){
			minmax = minMaxPrice($scope.rentCategoryQuery)
			$scope.itemsslider[0].value = minmax[0]
			$scope.itemsslider[1].value = minmax[1]
			$scope.itemsslider[0].value = 3000
			$scope.itemsslider[1].value = 15000
		});
	});	

  var createGeoObjects = function(){
      var geoObjects = [] 
      var points = $scope.Filtered;
      var objects =[]
      for (var i = 0, ii = points.length; i < ii; i++){
          point ={
            coordinates:points[i].map, 
              properties: {
                balloonContent: points[i].adres}, 
              options: {
                preset: 'islands#icon', 
                iconColor: '#27ae60'}
            };
          objects.push(points[i].map)
          geoObjects.push(point);
      }
      $scope.geoObjects = geoObjects

    return $scope.geoObjects
    };
//здесь происходит обновление выдачи с фильтрацией
$interval(function(){
 
  $scope.Filtered = $scope.$eval("rents | filter:rentQuery | rangeSquareFilter:minSquare:maxSquare | rangePriceFilter:itemsslider[0].value:itemsslider[1].value | roomCountFilter:rentRoomCount1:rentRoomCount2:rentRoomCount3:rentRoomCount4:rentRoomCount5:rentRoomCount6 | areaFilter:rentArea1:rentArea2:rentArea3:rentArea4 |filter:{ category:rentCategoryQuery, time:rentTime,  filterflor:rentFlor,payments:rentPayments,rem:rentRem,material:rentMaterial,heating:rentHeating, propnewhome:PropNewhome, propfurniture:PropFurniture, proptv:PropTv, propfridge:PropFridge, propwasher:PropWasher, propmicrowave:PropMicrowave, propkitchen:PropKitchen, propbalcony:PropBalcony, propelevator:PropElevator, propinternet:PropInternet, propparking:PropParking, propconditioning:PropConditioning, propphone:PropPhone, propappliances:PropAppliances, propsmoking:PropSmoking, propanimal:PropAnimal}");   
  createGeoObjects()
  
}, 1000);


 	$scope.__currency = '₽';
	$scope.__square = 'м²';
	$scope.iframeHeight = window.innerHeight + 'px';
	$scope.rents = [];
	
  ///////////////slider//////////////

  $scope.itemsslider = [
    {
      name  : 'Second Item',
      value : 0
    },
    {
      name  : 'Third Item',
      value : 50000
    }];
//////////////endsloder////////////

	$scope.rentCategoryQuery ='1';
	$scope.rentCategory = {
			'kvartira': 1,
			'komnata':2,
			'home':3,
			'ofice':4,
			'torg':5,
			'proizv':6,
			'slkad':7,
			'garage':8
	};


  //Переключение фильтра
	$scope.switchFilter ='';
	$scope.switchFilterFunction = function(name){
		$scope.switchFilter = name;
	};
	$scope.switchFilterCategory = function(){
		if($scope.rentCategoryQuery <=3)
			return 1
		else
			return 2
	}
	$scope.beforeButtonFilter = function(){
		if($scope.switchFilter == undefined){
			return 'Закрыть'
		} else {
			return 'Назад'
		}

	}
	$scope.beforeFilter = function(){
			if($scope.switchFilter == undefined){
				$scope.isShowFilter = false;
			}else{
				$scope.switchFilter = '';
			}
	};

	//end Переключение фильтра
	$scope.filterlist =[ 
  	{'title':'Срок аренды',
  	 'status':'Не важно',
  	 'name':'rentTimeFilter'
  	},
  	{'title':'Район',
  	 'status':'Не важно',
  	 'name':'rentAreaFilter'
  	},	
  	{'title':'Количество комнат',
  	 'status':'Не важно',
  	 'name':'rentRoomCountFilter'
  	},
  	{'title':'Этаж',
  	 'status':'Не важно',
  	 'name':'rentFlorFilter'
  	},	
    {'title':'Площадь',
     'status':'Не важно',
     'name':'rentSquareFilter'
    },  
  	{'title':'Коммунальные услуги',
  	 'status':'Не важно',
  	 'name':'rentPaymentsFilter'
  	},
  	{'title':'Ремонт',
  	 'status':'Не важно',
  	 'name':'rentRemFilter'
  	},
  	{'title':'Типы стен',
  	 'status':'Не важно',
  	 'name':'rentMaterialFilter'
  	},
  	{'title':'Отопление',
  	 'status':'Не важно',
  	 'name':'rentHeatingFilter'
  	},
  	{'title':'Дополнительные параметры',
  	 'status':'Не важно',
  	 'name':'rentDopFilter'
  	}
	];

	
	$scope.isFilterPage = false;
	$scope.showBodyFilter = false;
	$scope.FilterTitle = 'Фильтр';
	$scope.filterItem = function(){
		return $scope.rentFilter;
	}
	$scope.filterQuery = [
		{'rentTime':$scope.rentTime},
		{'rentArea':$scope.rentArea},
		{'rentRoomCoun':$scope.rentRoomCount},
		{'rentFlor':$scope.rentFlor},
    {'rentSquare':$scope.rentSquare},
		{'rentPayments':$scope.rentPayments},
		{'rentRem':$scope.rentRem},
		{'rentMaterial':$scope.rentMaterial},
		{'rentHeating':$scope.rentHeating}
	]
  $scope.getLocation = function(){
  	//	$scope.rentTime = $location.search().rentTime;
  	//	$scope.rentArea = $location.search().rentArea;
  	//	$scope.rentRoomCount = $location.search().rentRoomCount;
  	//	$scope.rentFlor = $location.search().rentFlor;
  	//	$scope.rentPayments = $location.search().rentPayments;
  	//	$scope.rentRem = $location.search().rentRem;
  	//	$scope.rentMaterial = $location.search().rentMaterial;
  	//	$scope.rentHeating = $location.search().rentHeating;
  	//	$scope.PropNewhome = $location.search().PropNewhome;
   	//	$scope.PropFurniture = $location.search().PropFurniture;
   	//	$scope.PropTv = $location.search().PropTv;
   	//	$scope.PropFridge = $location.search().PropFridge;
   	//	$scope.PropWasher = $location.search().PropWasher;
   	//	$scope.PropMicrowave = $location.search().PropMicrowave;
   	//	$scope.PropKitchen = $location.search().PropKitchen;
   	//	$scope.PropBalcony = $location.search().PropBalcony;
   	//	$scope.PropElevator = $location.search().PropElevator;
   	//	$scope.PropInternet = $location.search().PropInternet;
   	//	$scope.PropParking = $location.search().PropParking;
   	//	$scope.PropConditioning = $location.search().PropConditioning;
   	//	$scope.PropPhone = $location.search().PropPhone;
   	//	$scope.PropAppliances = $location.search().PropAppliances;
   	//	$scope.PropSmoking = $location.search().PropSmoking;
   	//	$scope.PropAnimal = $location.search().PropAnimal;
  };
  //сортировка
  $scope.aOrderBy = [
    {
      name: 'Цене',
      status:false,
      reverse:false,
      query: 'price'
    },
        {
      name: 'Площади',
      status:false,
      reverse:false,
      query: 'square'
    },
    {
      name: 'Новые предложения',
      status: true,
      reverse:false,
      query: '!id'
    }  
  ];
  $scope.aOrderByField = undefined
  $scope.aOrderByReverse = false

  $scope.setOrderBy = function(name){
    console.log()
    var i = 0,
    items = $scope.aOrderBy,
    j = items.length;
    for(i;i < j;i++){
      console.log(items[i].status)
      if(items[i].status === true && items[i].name == name){
         items[i].reverse = !items[i].reverse;
        $scope.aOrderByReverse = items[i].reverse 
      }
      if(items[i].name == name){
        items[i].status = true;
        $scope.aOrderByField = items[i].query;
      } else {
        items[i].status = false;
        items[i].reverse = false;
      };
      }
//цогнец сортировки
//

  };
	$scope.setSelectedRentTime = function (value) {
        if ( $scope.rentTime === value) {
             $scope.rentTime = undefined;
        } else {
             $scope.rentTime = value;
             $scope.filterlist[0].status = value;
            // $location.search('rentTime',value);
        }
        $scope.switchFilter = undefined;
    };
	$scope.rentArea = true;
	var rentAreaStatus = [];
	$scope.setClearSelectedRentArea = function(){
		$scope.rentArea = true;
		$scope.rentArea1 = undefined;
		$scope.rentArea2 = undefined;
		$scope.rentArea3 = undefined;
		$scope.rentArea4 = undefined;
    $scope.filterlist[1].status = 'Не важно'; 
	};
	$scope.setSelectedRentArea = function (value) {
    $scope.rentArea = false;
  	//
  	rentAreaStatus.length = 4;
  	switch(value){
  		case 'Ленинский':			  
  		if($scope.rentArea1 == value){
  				$scope.rentArea1 = undefined;
  				delete rentAreaStatus[0]
  			} else {
					$scope.rentArea1 = value;
					rentAreaStatus[0] = 'Л';
  			};
  			break;
  		case 'Промышленный':			  
  		if($scope.rentArea2 == value){
  				$scope.rentArea2 = undefined;
  				delete rentAreaStatus[1]
  			} else {
					$scope.rentArea2 = value;
					rentAreaStatus[1] = 'П';
  			};
  			break;
  		case 'Заднепровский':
  		if($scope.rentArea3 == value){
  				$scope.rentArea3 = undefined;
  				delete rentAreaStatus[2]
  			} else {
					$scope.rentArea3 = value;
					rentAreaStatus[2] = 'З';
  			};
  			break;
  		case 'Смоленский р-н.':
  		if($scope.rentArea4 == value){
  				$scope.rentArea4 = undefined;
  				delete rentAreaStatus[3]
  			} else {
					$scope.rentArea4 = value;
					rentAreaStatus[3] = 'С'
  			};
  			break;  
  	}
  	$scope.filterlist[1].status = rentAreaStatus.join(' ');  
    };
  $scope.rentRoomCount = true;
	$scope.setClearRentRoomCount = function() {
		$scope.rentRoomCount = true;
		$scope.rentRoomCount1 = undefined;
		$scope.rentRoomCount2 = undefined;
		$scope.rentRoomCount3 = undefined;
		$scope.rentRoomCount4 = undefined;
		$scope.rentRoomCount5 = undefined;
		$scope.rentRoomCount6 = undefined;
    $scope.filterlist[2].status = 'Не важно'
	};
	var roomCountStatus =[]
  $scope.setSelectedRentRoomCount = function(value) {
  	//нажатие снимает флажок с кнопки неважно
  	$scope.rentRoomCount = false;
  	//
  	roomCountStatus.length = 6;
  	switch(value){
  		case 1:			  
  		if($scope.rentRoomCount1 == 1){
  				$scope.rentRoomCount1 = undefined;
  				delete roomCountStatus[0]
  			} else {
					$scope.rentRoomCount1 = 1;
					roomCountStatus[0] = 1
  			};
  			break;
  		case 2:			  
  		if($scope.rentRoomCount2 == 2){
  				$scope.rentRoomCount2 = undefined;
  				delete roomCountStatus[1]
  			} else {
					$scope.rentRoomCount2 = 2;
					roomCountStatus[1] = 2
  			};
  			break;
  		case 3:
  		if($scope.rentRoomCount3 == 3){
  				$scope.rentRoomCount3 = undefined;
  				delete roomCountStatus[2]
  			} else {
					$scope.rentRoomCount3 = 3;
					roomCountStatus[2] = 3
  			};
  			break;
  		case 4:
  		if($scope.rentRoomCount4 == 4){
  				$scope.rentRoomCount4 = undefined;
  				delete roomCountStatus[3]
  			} else {
					$scope.rentRoomCount4 = 4;
					roomCountStatus[3] = 4
  			};
  			break;
  		case 5:
  		if($scope.rentRoomCount5 == 5){
  				$scope.rentRoomCount5 = undefined;
  				delete roomCountStatus[4]
  			} else {
					$scope.rentRoomCount5 = 5;
					roomCountStatus[4] = 5
  			};
  			break;
  		case 6:
  		if($scope.rentRoomCount6 == 6){
  				$scope.rentRoomCount6 = undefined;
  				delete roomCountStatus[5]
  			} else {
					$scope.rentRoomCount6 = 6;
					roomCountStatus[5] = 6
  			};
  			break ; 		
  		default:

  		}
  		console.log(roomCountStatus.join(' '));
  		$scope.filterlist[2].status = roomCountStatus.join(' ');
    };
  $scope.setSelectedRentFlor = function(value) {
        if ( $scope.rentFlor === value) {
             $scope.rentFlor = undefined;
        } else {
             $scope.rentFlor = value;
             $scope.filterlist[3].status = value;
            // $location.search('rentFlor',value)
        }  	
        $scope.switchFilter = undefined;
	};
  $scope.minSquare = 0;
  $scope.maxSquare = 5000;
  $scope.bufferSquare;
  $scope.setClearRentSquare = function(){
    $scope.rentSquare = undefined;
  $scope.minSquare = 0;
  $scope.maxSquare = 5000;
  $scope.bufferSquare = undefined;
  }
  $scope.setSelectedSqare = function(value) {
        if ( $scope.rentSquare === value) {
             $scope.rentSquare = undefined;
        } else {
             $scope.rentSquare = value;
             $scope.bufferSquare = $scope.rentSquare.split('-');
             $scope.minSquare = parseInt($scope.bufferSquare[0]);
             $scope.maxSquare = parseInt($scope.bufferSquare[1]);
             if($scope.maxSquare == 5000){
              $scope.filterlist[4].status = '+200' + 'м²';
             }else{
              $scope.filterlist[4].status = value + 'м²';
            }
        }   
        $scope.switchFilter = undefined;

console.log($scope.maxSquare)

  };
	$scope.setSelectedRentPayments = function(value) {
        if ( $scope.rentPayments === value) {
             $scope.rentPayments = undefined;
        } else {
             $scope.rentPayments = value;
             $scope.filterlist[5].status = value;
            // $location.search('rentPayments',value)
        }  	
        $scope.switchFilter = undefined;
	};
	$scope.setSelectedRentRem = function(value) {
        if ( $scope.rentRem === value) {
             $scope.rentRem = undefined;
        } else {
             $scope.rentRem = value;
             $scope.filterlist[6].status = value;
            // $location.search('rentRem',value)
        }  	
        $scope.switchFilter = undefined;
	};
	$scope.setSelectedRentMaterial = function(value) {
        if ( $scope.rentMaterial === value) {
             $scope.rentMaterial = undefined;
        } else {
             $scope.rentMaterial = value;
             $scope.filterlist[7].status = value;
            // $location.search('rentMaterial',value)
        }  	
        $scope.switchFilter = undefined;
	};
	$scope.setSelectedRentHeating = function(value) {
        if ( $scope.rentHeating === value) {
             $scope.rentHeating = undefined;
        } else {
             $scope.rentHeating = value;
             $scope.filterlist[8].status = value;
            // $location.search('rentHeating',value)
        }  
        $scope.switchFilter = undefined;	
	}; 
//	$scope.PropNewhome = '';
 // $scope.PropFurniture = '';
 // $scope.PropTv = '';
 // $scope.PropFridge = '';
 // $scope.PropWasher = '';
 // $scope.PropMicrowave = '';
 // $scope.PropKitchen = '';
 // $scope.PropBalcony = '';
 // $scope.PropElevator = '';
 // $scope.PropInternet = '';
 // $scope.PropParking = '';
 // $scope.PropConditioning = '';
 // $scope.PropPhone = '';
 // $scope.PropAppliances = '';
 // $scope.PropSmoking = '';
 // $scope.PropAnimal = '';
  $scope.PropChekLeight = 0;
  $scope.$watch('$scope.PropChekLeight', function(){
   if($scope.PropChekLeight == 0){
     $scope.rentDop = undefined;
   }else{
     $scope.filterlist[8].status = $scope.PropChekLeight;
   }
  });

	$scope.setSelectedRenDopClear = function(){
    $scope.PropChekLeight = 0;
    $scope.filterlist[8].status = 'Не важно';
    $scope.rentDop = undefined;
		$scope.PropNewhome = undefined;
  	$scope.PropFurniture = undefined;
  	$scope.PropTv = undefined;
  	$scope.PropFridge = undefined;
  	$scope.PropWasher = undefined;
  	$scope.PropMicrowave = undefined;
  	$scope.PropKitchen = undefined;
  	$scope.PropBalcony = undefined;
  	$scope.PropElevator = undefined;
  	$scope.PropInternet = undefined;
  	$scope.PropParking = undefined;
  	$scope.PropConditioning = undefined;
  	$scope.PropPhone = undefined;
  	$scope.PropAppliances = undefined;
  	$scope.PropSmoking = undefined;
  	$scope.PropAnimal = undefined;
    $scope.PropBaby = undefined;
    $scope.PropSleep = undefined;    
    console.log($scope.PropChekLeight)

	};
  $scope.setPropNewhome = function(){
  	if($scope.PropNewhome === true){
  		$scope.PropNewhome = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropNewhome = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight 
  };
  $scope.setPropFurniture = function(){
  	if($scope.PropFurniture == true){
  		$scope.PropFurniture = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropFurniture = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropTv = function(){
  	if($scope.PropTv == true){
  		$scope.PropTv = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropTv = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropFridge = function(){
  	if($scope.PropFridge == true){
  		$scope.PropFridge = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropFridge = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropWasher = function(){
  	if($scope.PropWasher == true){
  		$scope.PropWasher = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropWasher = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropMicrowave = function(){
  	if($scope.PropMicrowave == true){
  		$scope.PropMicrowave = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropMicrowave = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropKitchen = function(){
  	if($scope.PropKitchen == true){
  		$scope.PropKitchen = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropKitchen = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropBalcony = function(){
  	if($scope.PropBalcony == true){
  		$scope.PropBalcony = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropBalcony = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropElevator = function(){
  	if($scope.PropElevator == true){
  		$scope.PropElevator = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropElevator = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };
  $scope.setPropInternet = function(){
  	if($scope.PropInternet == true){
  		$scope.PropInternet = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropInternet = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  }; 
  $scope.setPropParking = function(){
  	if($scope.PropParking == true){
  		$scope.PropParking = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropParking = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  }; 
  $scope.setPropConditioning = function(){
  	if($scope.PropConditioning == true){
  		$scope.PropConditioning = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropConditioning = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };   
  $scope.setPropPhone = function(){
  	if($scope.PropPhone == true){
  		$scope.PropPhone = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropPhone = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };   
  $scope.setPropAppliances = function(){
  	if($scope.PropAppliances == true){
  		$scope.PropAppliances = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropAppliances = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };   
  $scope.setPropSmoking = function(){
  	if($scope.PropSmoking == true){
  		$scope.PropSmoking = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropSmoking = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };   
  $scope.setPropAnimal = function(){
  	if($scope.PropAnimal == true){
  		$scope.PropAnimal = '';
      $scope.PropChekLeight --;
  	}else{
  		$scope.PropAnimal = true;
      $scope.PropChekLeight ++ ;
  	}
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  }; 
    $scope.setPropBaby = function(){
    if($scope.PropBaby == true){
      $scope.PropBaby = '';
      $scope.PropChekLeight --;
    }else{
      $scope.PropBaby = true;
      $scope.PropChekLeight ++ ;
    }
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };  
    $scope.setPropSleep = function(){
    if($scope.PropSleep == true){
      $scope.PropSleep = '';
      $scope.PropChekLeight --;
    }else{
      $scope.PropSleep = true;
      $scope.PropChekLeight ++ ;
    }
    $scope.rentDop = true;
    $scope.filterlist[9].status = $scope.PropChekLeight
  };    
///////////////////////////////////////////////////
  $scope.isFilterPage = function(){
	  if($scope.switchFilter == ''){
	  	return false;
	  }else{
	  	return true;
	  };
	}

	$scope.isShowFilter = false;
	$scope.showFilterPopup = function(){
		if($scope.isShowFilter === false){
			$scope.isShowFilter = true;
		}else{
			$scope.isShowFilter = false;
		}
	}
	$scope.clearFilter = function(){
		$scope.rentTime = undefined;
		$scope.rentArea = undefined;
		$scope.rentRoomCount = undefined;
		$scope.rentFlor = undefined;
		$scope.rentPayments = undefined;
		$scope.rentRem = undefined;
		$scope.rentMaterial = undefined;
		$scope.rentHeating = undefined;
		$scope.PropNewhome = undefined;
  	$scope.PropFurniture = undefined;
  	$scope.PropTv = undefined;
  	$scope.PropFridge = undefined;
  	$scope.PropWasher = undefined;
  	$scope.PropMicrowave = undefined;
  	$scope.PropKitchen = undefined;
  	$scope.PropBalcony = undefined;
  	$scope.PropElevator = undefined;
  	$scope.PropInternet = undefined;
  	$scope.PropParking = undefined;
  	$scope.PropConditioning = undefined;
  	$scope.PropPhone = undefined;
  	$scope.PropAppliances = undefined;
  	$scope.PropSmoking = undefined;
  	$scope.PropAnimal = undefined;
    $scope.rentRoomCount = true;
    $scope.rentRoomCount1 = undefined;
    $scope.rentRoomCount2 = undefined;
    $scope.rentRoomCount3 = undefined;
    $scope.rentRoomCount4 = undefined;
    $scope.rentRoomCount5 = undefined;
    $scope.rentRoomCount6 = undefined;
    $scope.rentArea = true;
    $scope.rentArea1 = undefined;
    $scope.rentArea2 = undefined;
    $scope.rentArea3 = undefined;
    $scope.rentArea4 = undefined;
    $scope.minSquare = 0;
    $scope.maxSquare = 5000;
    $scope.bufferSquare = undefined;
  	$location.search('');
    $scope.PropChekLeight = 0;
    j = $scope.filterlist.length;
		for(i = 0;i < j; i++){
			$scope.filterlist[i].status ='Не важно';
		}	
	};
	$scope.filterCounting = function(){
		$scope.filterCount = 0 ;
		for(i = 0;i < $scope.filterlist.length; i++){
			if($scope.filterlist[i].status != 'Не важно'){
				$scope.filterCount += 1
			}
		}
		if($scope.filterCount == 0){
			return ''
		}else{
		  return $scope.filterCount;
		}
	};
	$scope.switchView = 'list';
	$scope.switchViewClick = function(view){
			$scope.switchView = view;
		};
	$scope.Filtered = $scope.rents;
	$scope.center = [54.78,32.04];
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
	};
  var collection
  $scope.afterInit = function(col){
    collection = col;

};
   $scope.drawButton = 'Обвести';
   

  $scope.setMapPolygon = function(){
    if($scope.drawButton == 'Обвести'){
      $scope.geoPolygon = []
       $scope.drawButton = 'Стереть'; 
          polygon = {
            geometry: {
                type: 'Polygon',
                coordinates: []
            }
          }
      $scope.geoPolygon.push(polygon)
    }else{
      delete $scope.geoPolygon
      $scope.drawButton = 'Обвести';
    }

  };
  $scope.searchMapInsidePolygon= function(e){

    
       

    var objectsInsideCircle = objects.searchInside(e);
    console.log(collection)
    objectsInsideCircle.setOptions('preset', 'islands#redIcon');
  }

	$scope.showRentContent = 'map';
	$scope.showRent = function(id){	
    if($scope.showRentContent == 'content'){
      $scope.showRentContent = 'map';
    } else {
      $scope.showRentContent = 'content';
    }
    angular.forEach($scope.Filtered, function(item, key){
      if(item.id == id){
        $scope.rentCart = item;
        $scope.bigCartImg = $scope.rentCart.img[0]
      }
    });

	};
	$scope.closeRentContent = function(){
	 $scope.showRentContent = 'map';
	};
     var _cl;
  $scope.initCluster = function(cl){
      _cl = cl;
      _cl.removeAll();
    }
  $scope.addFavorite = function(id){

    favoriteRent.set(id);
  }
  $scope.isFavorite = function(id){
    return favoriteRent.isIn(id);
  }
  $scope.setBigCartImg = function(img){
    $scope.bigCartImg = img;
  }
  $scope.infoList = function(v){
    return v  ? 'true' : 'false'
  };

    $scope.nextPhoto = function(img){
        i = $scope.getIndex(img.indexOf($scope.current), 1);
        $scope.current = img[i];
    }
    $scope.prevPhoto = function(img){
        i = $scope.getIndex(img.indexOf($scope.current), -1);
        
        $scope.current = img[i];
    }
    $scope.getIndex = function(currentIndex, shift){
        var len = arrayImg.length;
        return (((currentIndex + shift) + len) % len)
    }
//pagination
  $scope.currentPage = 0;
  $scope.itemsPerPage = 10;
  $scope.firstPage = function() {
    return $scope.currentPage == 0;
  }
  $scope.lastPage = function() {
    var lastPageNum = Math.ceil($scope.Filtered.length / $scope.itemsPerPage - 1);
    return $scope.currentPage == lastPageNum;
  }
  $scope.numberOfPages = function(){
    return Math.ceil($scope.Filtered.length / $scope.itemsPerPage);
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
  ////end-pagination


});