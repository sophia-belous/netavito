netavitoApp.controller('favoriteCtrl', function(getRentsService,favoriteRent, $location, $scope, $interval) {
  $scope.favRents = favoriteRent.get; 
  getRentsService.async().then(function() {
    $scope.noFiltred = getRentsService.data();
    angular.forEach($scope.noFiltred, function(item, key){
      var i = 0,
          j = $scope.favRents.length;
      for(i; i < j; i++){
        if(item.id === $scope.favRents[i]){
          $scope.rents.push(item)
        }
      }
    })
    $scope.Filtered = $scope.$eval("rents | rangePriceFilter:minPrice:maxPrice | roomCountFilter:rentRoomCount1:rentRoomCount2:rentRoomCount3:rentRoomCount4:rentRoomCount5:rentRoomCount6 | areaFilter:rentArea1:rentArea2:rentArea3:rentArea4 |filter:{ category:rentCategoryQuery, time:rentTime,  filterflor:rentFlor,payments:rentPayments,rem:rentRem,material:rentMaterial,heating:rentHeating, propnewhome:PropNewhome, propfurniture:PropFurniture, proptv:PropTv, propfridge:PropFridge, propwasher:PropWasher, propmicrowave:PropMicrowave, propkitchen:PropKitchen, propbalcony:PropBalcony, propelevator:PropElevator, propinternet:PropInternet, propparking:PropParking, propconditioning:PropConditioning, propphone:PropPhone, propappliances:PropAppliances, propsmoking:PropSmoking, propanimal:PropAnimal}");   
    createGeoObjects()
	});	
  var createGeoObjects = function(){
      var geoObjects = [] 
      var points = $scope.Filtered;
      for (var i = 0, ii = points.length; i < ii; i++){
          point = points[i].map;
          geoObjects.push({
              geometry:{
                  type:'Point',
                  coordinates:point
              }
          });
      }
      $scope.geoObjects = geoObjects

    return $scope.geoObjects
    };

$scope.searchRents = function(){
 
  $scope.Filtered = $scope.$eval("rents | rangePriceFilter:itemsslider[0].value:itemsslider[1].value | roomCountFilter:rentRoomCount1:rentRoomCount2:rentRoomCount3:rentRoomCount4:rentRoomCount5:rentRoomCount6 | areaFilter:rentArea1:rentArea2:rentArea3:rentArea4 |filter:{ category:rentCategoryQuery, time:rentTime,  filterflor:rentFlor,payments:rentPayments,rem:rentRem,material:rentMaterial,heating:rentHeating, propnewhome:PropNewhome, propfurniture:PropFurniture, proptv:PropTv, propfridge:PropFridge, propwasher:PropWasher, propmicrowave:PropMicrowave, propkitchen:PropKitchen, propbalcony:PropBalcony, propelevator:PropElevator, propinternet:PropInternet, propparking:PropParking, propconditioning:PropConditioning, propphone:PropPhone, propappliances:PropAppliances, propsmoking:PropSmoking, propanimal:PropAnimal}");   
  createGeoObjects()
}
$scope.clearMap = function(){

 // _map.geoObjects.removeAll();
 // $scope.geoObjects.length = 0;
 // _map.destroy();
 _cl.removeAll();
  console.log(_cl)
}
var _map;
$scope.afterMapInit=function(map){
  
    _map = map;
};
//  var createGeoObjects = function(){
//      //if(!points||Object.prototype.toString.call(points)!="[object Array]")return false;
//    points = $scope.Filtered;
//    var geoObjects = [];
//    var point, i;
//    var ii = points.length;
//    for(i = 0; i < ii; i++){
//       geoObjects.push({
//        geometry:{
//            type:'Point',
//            coordinates:points[i].map
//        },
//        properties:{
//            balloonContentHeader: points[i].price + $scope.__currency,
//            balloonContentBody: points[i].price,
//            clusterCaption: points[i].adres
//        }
//      });
//    $scope.geoObjects = geoObjects;
//    }
//  };
  
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
  $scope.minPrice = $scope.itemsslider[0].value
  $scope.maxPrice = $scope.itemsslider[1].value; 
  console.log($scope.minPrice + ' ' + $scope.maxPrice)
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
  $scope.rentTime ='';
  $scope.rentTimes ={
    'year': 'Долгосрочная',
    'day': 'Посуточная'     
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
    {'rentPayments':$scope.rentPayments},
    {'rentRem':$scope.rentRem},
    {'rentMaterial':$scope.rentMaterial},
    {'rentHeating':$scope.rentHeating}
  ]
  $scope.getLocation = function(){
    //  $scope.rentTime = $location.search().rentTime;
    //  $scope.rentArea = $location.search().rentArea;
    //  $scope.rentRoomCount = $location.search().rentRoomCount;
    //  $scope.rentFlor = $location.search().rentFlor;
    //  $scope.rentPayments = $location.search().rentPayments;
    //  $scope.rentRem = $location.search().rentRem;
    //  $scope.rentMaterial = $location.search().rentMaterial;
    //  $scope.rentHeating = $location.search().rentHeating;
    //  $scope.PropNewhome = $location.search().PropNewhome;
    //  $scope.PropFurniture = $location.search().PropFurniture;
    //  $scope.PropTv = $location.search().PropTv;
    //  $scope.PropFridge = $location.search().PropFridge;
    //  $scope.PropWasher = $location.search().PropWasher;
    //  $scope.PropMicrowave = $location.search().PropMicrowave;
    //  $scope.PropKitchen = $location.search().PropKitchen;
    //  $scope.PropBalcony = $location.search().PropBalcony;
    //  $scope.PropElevator = $location.search().PropElevator;
    //  $scope.PropInternet = $location.search().PropInternet;
    //  $scope.PropParking = $location.search().PropParking;
    //  $scope.PropConditioning = $location.search().PropConditioning;
    //  $scope.PropPhone = $location.search().PropPhone;
    //  $scope.PropAppliances = $location.search().PropAppliances;
    //  $scope.PropSmoking = $location.search().PropSmoking;
    //  $scope.PropAnimal = $location.search().PropAnimal;
  };
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
          delete rentAreaStatus[value]
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
  $scope.setSelectedRentPayments = function(value) {
        if ( $scope.rentPayments === value) {
             $scope.rentPayments = undefined;
        } else {
             $scope.rentPayments = value;
             $scope.filterlist[4].status = value;
            // $location.search('rentPayments',value)
        }   
        $scope.switchFilter = undefined;
  };
  $scope.setSelectedRentRem = function(value) {
        if ( $scope.rentRem === value) {
             $scope.rentRem = undefined;
        } else {
             $scope.rentRem = value;
             $scope.filterlist[5].status = value;
            // $location.search('rentRem',value)
        }   
        $scope.switchFilter = undefined;
  };
  $scope.setSelectedRentMaterial = function(value) {
        if ( $scope.rentMaterial === value) {
             $scope.rentMaterial = undefined;
        } else {
             $scope.rentMaterial = value;
             $scope.filterlist[6].status = value;
            // $location.search('rentMaterial',value)
        }   
        $scope.switchFilter = undefined;
  };
  $scope.setSelectedRentHeating = function(value) {
        if ( $scope.rentHeating === value) {
             $scope.rentHeating = undefined;
        } else {
             $scope.rentHeating = value;
             $scope.filterlist[7].status = value;
            // $location.search('rentHeating',value)
        }  
        $scope.switchFilter = undefined;  
  }; 
//  $scope.PropNewhome = '';
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

  $scope.setSelectedRenDopClear = function(){
    $scope.PropNewhome = '';
    $scope.PropFurniture = '';
    $scope.PropTv = '';
    $scope.PropFridge = '';
    $scope.PropWasher = '';
    $scope.PropMicrowave = '';
    $scope.PropKitchen = '';
    $scope.PropBalcony = '';
    $scope.PropElevator = '';
    $scope.PropInternet = '';
    $scope.PropParking = '';
    $scope.PropConditioning = '';
    $scope.PropPhone = '';
    $scope.PropAppliances = '';
    $scope.PropSmoking = '';
    $scope.PropAnimal = '';
  };
  $scope.setPropNewhome = function(){
    if($scope.PropNewhome === true){
      $scope.PropNewhome = '';
    }else{
      $scope.PropNewhome = true;
    }
  };
  $scope.setPropFurniture = function(){
    if($scope.PropFurniture == true){
      $scope.PropFurniture = '';
    }else{
      $scope.PropFurniture = true;
    }
  };
  $scope.setPropTv = function(){
    if($scope.PropTv == true){
      $scope.PropTv = '';
    }else{
      $scope.PropTv = true;
    }
  };
  $scope.setPropFridge = function(){
    if($scope.PropFridge == true){
      $scope.PropFridge = '';
    }else{
      $scope.PropFridge = true;
    }
  };
  $scope.setPropWasher = function(){
    if($scope.PropWasher == true){
      $scope.PropWasher = '';
    }else{
      $scope.PropWasher = true;
    }
  };
  $scope.setPropMicrowave = function(){
    if($scope.PropMicrowave == true){
      $scope.PropMicrowave = '';
    }else{
      $scope.PropMicrowave = true;
    }
  };
  $scope.setPropKitchen = function(){
    if($scope.PropKitchen == true){
      $scope.PropKitchen = '';
    }else{
      $scope.PropKitchen = true;
    }
  };
  $scope.setPropBalcony = function(){
    if($scope.PropBalcony == true){
      $scope.PropBalcony = '';
    }else{
      $scope.PropBalcony = true;
    }
  };
  $scope.setPropElevator = function(){
    if($scope.PropElevator == true){
      $scope.PropElevator = '';
    }else{
      $scope.PropElevator = true;
    }
  };
  $scope.setPropInternet = function(){
    if($scope.PropInternet == true){
      $scope.PropInternet = '';
    }else{
      $scope.PropInternet = true;
    }
  }; 
  $scope.setPropParking = function(){
    if($scope.PropParking == true){
      $scope.PropParking = '';
    }else{
      $scope.PropParking = true;
    }
  }; 
  $scope.setPropConditioning = function(){
    if($scope.PropConditioning == true){
      $scope.PropConditioning = '';
    }else{
      $scope.PropConditioning = true;
    }
  };   
  $scope.setPropPhone = function(){
    if($scope.PropPhone == true){
      $scope.PropPhone = '';
    }else{
      $scope.PropPhone = true;
    }
  };   
  $scope.setPropAppliances = function(){
    if($scope.PropAppliances == true){
      $scope.PropAppliances = '';
    }else{
      $scope.PropAppliances = true;
    }
  };   
  $scope.setPropSmoking = function(){
    if($scope.PropSmoking == true){
      $scope.PropSmoking = '';
    }else{
      $scope.PropSmoking = true;
    }
  };   
  $scope.setPropAnimal = function(){
    if($scope.PropAnimal == true){
      $scope.PropAnimal = '';
    }else{
      $scope.PropAnimal = true;
    }
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
    $scope.rentTime = '';
    $scope.rentArea = '';
    $scope.rentRoomCount = '';
    $scope.rentFlor = '';
    $scope.rentPayments = '';
    $scope.rentRem = '';
    $scope.rentMaterial = '';
    $scope.rentHeating = '';
    $scope.PropNewhome = '';
    $scope.PropFurniture = '';
    $scope.PropTv = '';
    $scope.PropFridge = '';
    $scope.PropWasher = '';
    $scope.PropMicrowave = '';
    $scope.PropKitchen = '';
    $scope.PropBalcony = '';
    $scope.PropElevator = '';
    $scope.PropInternet = '';
    $scope.PropParking = '';
    $scope.PropConditioning = '';
    $scope.PropPhone = '';
    $scope.PropAppliances = '';
    $scope.PropSmoking = '';
    $scope.PropAnimal = '';
    $location.search('');
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
  };
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
});