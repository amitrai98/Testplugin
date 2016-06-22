mainApp.directive("loadMoreData", [function() {
         return {
            restrict: 'ACE',
            link: function($scope, element, attrs, ctrl) {
                // alert("check");
                var raw = element[0];
                element.scroll(function() {
                    if(raw.scrollTop == 0){
                       $scope.$apply("loadMoreData(event)");
                    }
                    // if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight){
                    //     $scope.$apply("loadMoreData(event)");
                    // }
                });
            }
        };

}])
mainApp.directive('allowDecimalNumbers', function () {  
    return {  
        restrict: 'A',  
        link: function (scope, elm, attrs, ctrl) {  
            elm.on('keydown', function (event) {  
                var $input = $(this);  
                var value = $input.val();  
                value = value.replace(/[^0-9\.]/g, '')  
                var findsDot = new RegExp(/\./g)  
                var containsDot = value.match(findsDot)  
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {  
                    event.preventDefault();  
                    return false;  
                }  
                $input.val(value);  
                if (event.which == 64 || event.which == 16) {  
                    // numbers  
                    return false;  
                } if ([8, 13, 27, 37, 38, 39, 40, 45, 110].indexOf(event.which) > -1) {  
                    // backspace, enter, escape, arrows  
                    return true;  
                } else if (event.which >= 48 && event.which <= 57) {  
                    // numbers  
                    return true;  
                } else if (event.which >= 96 && event.which <= 105) {  
                    // numpad number  
                    return true;  
                } else if ([45, 46, 110, 190].indexOf(event.which) > -1) {  
                    // dot and numpad dot  
                    return true;  
                } else {  
                    event.preventDefault();  
                    return false;  
                }  
            });  
        }  
    }  
});  
// mainApp.directive('allowDecimalNumbers', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope) {    
//             scope.$watch('media_price', function(newValue,oldValue) {
//                 var arr = String(newValue).split("");
//                 console.log(arr);
//                 if (arr.length === 0) return;
//                 if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
//                 if (arr.length === 2 && newValue === '-.') return;
//                 if (isNaN(newValue)) {
//                     console.log(newValue);
//                     scope.media_price = oldValue;
//                 }
//             });
//         }
//     };
// });