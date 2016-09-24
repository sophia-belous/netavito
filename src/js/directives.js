netavitoApp.directive("bheader", function () {
    return {
        restrict: "E",
        templateUrl:  "views/tmpl/header.tmpl.html"
}
});
netavitoApp.directive("headermin", function () {
    return {
        restrict: "E",
        templateUrl:  "views/tmpl/header-min.tmpl.html"
}
});
netavitoApp.directive("bfooter", function () {
    return {
        restrict: "E",
        templateUrl:  "views/tmpl/footer.tmpl.html"
}
});
netavitoApp.directive("socicons", function () {
    return {
        restrict: "E",
        templateUrl:  "views/tmpl/socicons.tmpl.html"
}
});
netavitoApp.directive("hero", function () {
    return {
        restrict: "E",
        templateUrl:  "views/tmpl/hero.tmpl.html"
}
});
netavitoApp.directive("indexgrid", function () {
    return {
        restrict: "E",
        templateUrl:  "views/tmpl/indexgrid.tmpl.html"
}
});
netavitoApp.directive('popuplogin', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/tmpl/popup/login.tmpl.html'
  }
});


