mainApp.factory('getAppConstants', function ( $http ) {
    var factory = {            
        // query: function () {
        //     return $http.get(BASE_URL+'getappconstants?responsetype=json');
        // },
        // setData: function () {
        //     console.log("setdata");
        //     this.query().success( function(data1) {
        //         console.log(data1)
        //         localStorage.setItem( "constantDataStore", JSON.stringify(data1) );
        //     } )
        // },
        getData: function () {
            var serverData = localStorage.getItem( "constantDataStore" );
            console.log(JSON.parse(serverData).data.ringhop_constants);
            return JSON.parse(serverData).data.ringhop_constants;
            //console.log(JSON.parse(serverData).data.ringhop_constants);
        }
    }       
    return factory; 
});

mainApp.factory('constantData', function ( $http, getAppConstants) {
    var promise;
    var factory = {            
        getCountryData: function () {
            // getAppConstants.setData();
            promise = getAppConstants.getData().country_list;
            // var promise = getAppConstants.query().then( function( data ){
            //     return data.data.data.ringhop_constants.country_list;
            // });
            return promise;
        },
        getOtherCountryData: function () {
            // getAppConstants.setData();
            console.log(getAppConstants.getData());
            promise = getAppConstants.getData().other_country_list;
            return promise;
        },
        getStateData: function () {
            // getAppConstants.setData();
            promise = getAppConstants.getData().state_list;
            return promise;
        },
        getNotificationData: function () {
            // getAppConstants.setData();
            console.log(getAppConstants.getData());
            promise = getAppConstants.getData().notifications_frequency;
            return promise;
        },
        getSetRatesData: function () {
            // getAppConstants.setData();
            console.log(getAppConstants.getData());
            promise = {};
            var call_rates = getAppConstants.getData().call_rates;
            var sms_rates = getAppConstants.getData().sms_rates;
            promise.call_rates = call_rates;
            promise.sms_rates = sms_rates;
            return promise;
        },
        socialLinks: function () {
            // getAppConstants.setData();
            promise = getAppConstants.getData().social_links;
            return promise;
        },
        creditsList: function () {
            // getAppConstants.setData();
            promise = getAppConstants.getData().credits_list;
            return promise;
        },
        getshoutMediaData: function(){
            // getAppConstants.setData();
            console.log(getAppConstants.getData());
            promise = getAppConstants.getData().shout_rates;
            return promise;

        },
        getvideoCallRatesData: function(){
            console.log(getAppConstants.getData());
            promise = getAppConstants.getData().video_call_rates;
            return promise;

        },
        getshoutRecepientsList: function(){
            // getAppConstants.setData();
            console.log(getAppConstants.getData());
            promise = {};
            var sent_to_list = getAppConstants.getData().sent_to_list;
            promise.sent_to_list = sent_to_list;
            console.log(promise.sent_to_list);
            return promise;

        }
    };       
    return factory; 
});
mainApp.factory('GenerateRandomNo', function() {
    var result = '';
    return {
        randomString: function(length, chars) {
            result = '';
              for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
          return result;
        }
    };
});
mainApp.constant('CONSTANTS', {shoutsPerPage: 4});
