//+++++++++++++++++++++++++++proUpgrade page controller+++++++++++++++++++++

mainApp.controller( "proUpgradeController", function( $scope, $http, $state, $rootScope, $location, constantData ) {
    $scope.countryList = [{ id:'', value:'(Select Country)'}];
    angular.forEach(constantData.getCountryData(), function(value, key){
        var item = { id:key, value:value };
        $scope.countryList.push(item);
    });
    $scope.creditsList = [{ id:'', value:'( Select credits )'}];
    angular.forEach(constantData.creditsList(), function(value, key){
        var item = { id:value, value:value+' Credits' };
        $scope.creditsList.push(item);
    });
    //console.log('hiiii');
    var flag = false;
    $scope.upgradeSubmit = function () {
        $('#token_upgrade').remove();
        var new_val = "";
        var proFormDiv = document.getElementById('proUpgrade_form');
        var input_id = '';
        var elementsLength = proFormDiv.getElementsByTagName('input').length;
        for (var i=0; i<parseInt(elementsLength); i++) {
            input_id = proFormDiv.getElementsByTagName('input')[i].id;
            new_val = proFormDiv.getElementsByTagName('input')[i].value;
            $( "label[for='"+input_id+"']" ).removeAttr('style');
            document.getElementsByTagName("span")[i].innerHTML = '';
            if( new_val == '' ) {
                var flag = false;
                document.getElementsByTagName("span")[i].innerHTML = 'This field is required.';
                $("label[for='"+input_id+"']").css( 'color', 'red' );
            }
        }
        if( $('#register_expiremonth').val() == '' ) {
            $('#expiremonth_error').html( 'This field is required.' );
            $('#expiremonth_label').css( 'color', 'red' );
            var flag = false;
        }
        if( $('#register_expireyear').val() == '' ) {
            $('#expireyear_error').html('This field is required.');
            $('#expireyear_label').css( 'color', 'red' );
            var flag = false;
        }
        if( $( '#upgrade_country' ).val() == '' ){
            $( '#upgrade_country_error' ).html( 'This field is required.' );
            $( '#upgrade_country_label' ).css( 'color', 'red' );
            var flag = false;
        }
        if( $( '#credits' ).val() == '' ) {
            $( '#credits_error' ).html( 'This field is required.' );
            $( '#credits_label' ).css( 'color', 'red' );
            var flag = false;
        }
        $( '#first_name_upgrade' ).keyup(function (e) {
            if( $( '#first_name_upgrade' ).val() == '' ) {
                $( '#firstname_error' ).html( 'This field is required.' );
                $( '#firstname_label' ).css( 'color', 'red' );
            } else {
                $( '#firstname_error' ).html( '' );
                $( '#firstname_label' ).removeAttr( 'style' );
            }
        } );

        $( '#last_name_upgrade' ).keyup(function (e) {
            if( $( '#last_name_upgrade' ).val() == '' ) {
                $( '#lastname_error' ).html( 'This field is required.' );
                $( '#lastname_label' ).css( 'color', 'red' );
            } else {
                $( '#lastname_error' ).html( '' );
                $( '#lastname_label' ).removeAttr( 'style' );
            }
        } );

        $( '#register_cardnumber' ).keyup( function (e) {
            if( $( '#register_cardnumber' ).val() == '' ) {
                $( '#cardnumber_error' ).html( 'This field is required.' );
                $( '#cardnumber_label' ).css( 'color', 'red' );
            } else if( $('#register_cardnumber').val().length < 25 ) {
                    $( '#cardnumber_error' ).html('');
                    $( '#cardnumber_label' ).removeAttr('style');
            } else {
                $( '#cardnumber_error' ).html( 'Please enter no more than 25 characters.' );
                $('#cardnumber_label').css( 'color', 'red' );
            }
        } );

        $( '#register_cvv2' ).keyup( function (e) {
            if( $( '#cvv2_error' ).html() == 'This field is required.' ) {
                $( '#cvv2_error' ).html('Please enter at least 3 characters.');
            }
            if( $('#register_cvv2').val().length >= 3 ) {
                    $( '#cvv2_error' ).html('');
                    $( '#cvv2_label' ).removeAttr('style');
            } else {
                if($('#register_cvv2').val().length == 0){
                   $( '#cvv2_error' ).html('This field is required.'); 
                }else{
                    $( '#cvv2_error' ).html('Please enter at least 3 characters.');
                    $( '#cvv2_label' ).css('color','red');
                }
                
            }
        } );

        $( '#upgrade_zipcode' ).keyup(function (e) {
            if( $( '#upgrade_zipcode_error' ).html() == 'This field is required.' ) {
                $( '#upgrade_zipcode_error' ).html('Please enter at least 5 characters.');
            }
            if( $('#upgrade_zipcode').val().length >= 5 ) {
                    $( '#upgrade_zipcode_error' ).html('');
                    $( '#upgrade_zipcode_label' ).removeAttr('style');
            } else {
                if($('#upgrade_zipcode').val().length == 0){
                   $( '#upgrade_zipcode_error' ).html('This field is required.'); 
                }else{
                   $( '#upgrade_zipcode_error' ).html('Please enter at least 5 characters.');
                   $( '#upgrade_zipcode_label' ).css('color','red'); 
                }
                
            }
        } );

        $( '#register_expiremonth' ).change(function() {
            if($( '#register_expiremonth' ).val() == ''){
                $( '#expiremonth_error' ).html('This field is required.');
                $('#expiremonth_label').css('color','red');
            } else {
                $( '#expiremonth_error' ).html('');
                $( '#expiremonth_label' ).removeAttr('style');
            }
        } );

        $( '#register_expireyear' ).change(function() {
            if($( '#register_expiremonth' ).val() == ''){
                $( '#expireyear_error' ).html('This field is required.');
                $('#expireyear_label').css('color','red');
            } else {
                $( '#expireyear_error' ).html('');
                $( '#expireyear_label' ).removeAttr('style');
            }
        } );

        $( '#upgrade_country' ).change(function() {
            if($( '#upgrade_country' ).val() == '') {
                $( '#upgrade_country_error' ).html('This field is required.');
                $('#upgrade_country_label').css('color','red');
            } else {
                $( '#upgrade_country_error' ).html('');
                $( '#upgrade_country_label' ).removeAttr('style');
            }
        } );

        $( '#credits' ).change( function() {
            if($( '#credits' ).val() == ''){
                $( '#credits_error' ).html( 'This field is required.' );
                $('#credits_label').css( 'color', 'red' );
            } else {
                $( '#credits_error' ).html( '' );
                $( '#credits_label' ).removeAttr( 'style' );
            }
        } );

        // if( $('#first_name_upgrade').val() != '' && $('#first_name_upgrade').val().length < 3) {
        //     var flag = false;
        //     $( '#firstname_error' ).html('Please enter at least 3 characters.');
        //     $( '#firstname_label' ).css('color','red');
        // }
        // if( $('#last_name_upgrade').val() != '' && $('#last_name_upgrade').val().length < 3) {
        //     var flag = false;
        //     $( '#lastname_error' ).html('Please enter at least 3 characters.');
        //     $( '#lastname_label' ).css('color','red');
        // }
        if( $('#register_cardnumber').val() != '' && $('#register_cardnumber').val().length > 25) {
            var flag = false;
            $( '#cardnumber_error' ).html('Please enter no more than 25 characters.');
            $( '#cardnumber_label' ).css('color','red');
        }

        if( $('#register_cvv2').val() != '' && $('#register_cvv2').val().length < 3) {
            var flag = false;
            $( '#cvv2_error' ).html('Please enter at least 3 characters.');
            $( '#cvv2_label' ).css('color','red');
        }

        if( $('#upgrade_zipcode').val() != '' && $('#upgrade_zipcode').val().length < 5) {
            var flag = false;
            $( '#upgrade_zipcode_error' ).html('Please enter at least 5 characters.');
            $( '#upgrade_zipcode_label' ).css('color','red');
        }
        if ( $( '#expiremonth_error' ).html() == '' && $( '#firstname_error' ).html() == '' && $( '#lastname_error' ).html() == '' && $( '#cvv2_error' ).html() == '' && $( '#expireyear_error' ).html() == '' && $( '#cardnumber_error' ).html() == '' && $( '#upgrade_zipcode_error' ).html() == '' && $( '#upgrade_country_error' ).html() == '' ) {
            flag = true;
        }
        if( flag == true ) {
           proUpgradeSubmit();
        }
        //return false; // submit from callback

    };
    function proUpgradeSubmit() {
        $( '#upgradeStatus' ).html('');
        var user_detail = localStorage.getItem("userDetail");
        var userData = JSON.parse(user_detail).data;
        var getUpgradeData = {};
        getUpgradeData['userid'] = userData.id;
        getUpgradeData['first_name'] = $scope.first_name;
        getUpgradeData['last_name'] = $scope.last_name;
        getUpgradeData['card_number'] = $scope.card_number;
        getUpgradeData['expire_month'] = $scope.expire_month;
        getUpgradeData['expire_year'] = $scope.expire_year;
        getUpgradeData['cvv_number'] = $scope.cvv_number;
        getUpgradeData['zipcode'] = $scope.zipcode;
        getUpgradeData['country'] = $scope.country;
        getUpgradeData['credits'] = $scope.credits;
        getUpgradeData['phoneip'] = IPAddr;
        //console.log($rootScope.currentState);
        if($rootScope.currentState == 'home.updatepayment' ) {
            // console.log('========changed=========');
            getUpgradeData['s'] = "updatepay";
        }
        getUpgradeData['responsetype'] = 'json';
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        // console.log( JSON.stringify( getUpgradeData ) );
        var responsePromise = $http.post( BASE_URL+"upgrade",JSON.stringify( getUpgradeData )  );
        responsePromise.success( function( data, status, headers, config ) {
            //alert(5);
            console.log( JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if( data.status == 'success' ) {
                //$( '#upgradeStatus' ).html( data.message );
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/creditscomplete/0"
                });
            } else {
                $( '#upgradeStatus' ).html( data.message );
            }
            $( '.submit-button' ).removeAttr( "disabled" );
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
            console.log( JSON.stringify( data ) );
            $('.submit-button').removeAttr("disabled");
        } );
    }
} )

//+++++++++++++++++++++++++++Learn more page controller+++++++++++++++++++++

mainApp.controller( "learnmoreController", function( $scope, $http, $timeout, $state, $rootScope ) {
    $scope.proDashboardLink = function( $event ) {
        //$state.transitionTo('home.prodashboard');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/prodashboard"
        });
    };
} )

//+++++++++++++++++++++++++++prodashboard page controller+++++++++++++++++++++

mainApp.controller( "prodashboardController", function( $scope, $http, $timeout, $state, $rootScope ) {
    $scope.verifyIdentity = function( $event ) {
        //$state.transitionTo('home.verifyidentity');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/verifyidentity"
        });
    };
    $scope.paymentDetails = function( $event ) {
        //$state.transitionTo('home.paymentoption');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/paymentoption"
        });
    };
    $scope.accpetTerms = function( $event ) {
        //$state.transitionTo('home.acceptterms');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/acceptterms"
        });
    };
    $scope.ProStepsShow = true;
    //get Pro data
    var getProDashboardData = {};
    getProDashboardData['responsetype'] = 'json';
    //console.log('Pro data=>'+JSON.stringify(getProDashboardData));
    var responsePromise = $http.post(BASE_URL+"pro/prodashboard",JSON.stringify(getProDashboardData));
    responsePromise.success( function( data, status, headers, config ) {
        // console.log('Pro response => '+JSON.stringify(data));
        $scope.proInfo = data.data;
        localStorage.setItem("proDashboardData",JSON.stringify(data));
        if( data.data.pv_terms == 2  &&  data.data.pv_idverify == 1 && data.data.pv_payinfo == 1 ){
            $scope.ProStepsShow = false;
        }
        if( data.data.pv_terms == 1 ) {
            $('#accept_terms_btn').addClass('orangeBlock');
            $('#accept_terms_span').addClass('glyphicon glyphicon-time');
            $scope.protermsData = '(Pending review)';
            $("#accept_terms_btn").unbind("click");
        } else if( data.data.pv_terms == 2 ) {
            $('#accept_terms_btn').addClass('greenBlock');
            $('#accept_terms_span').addClass('glyphicon glyphicon-ok');
            $scope.protermsData = '(Completed)';
            $("#accept_terms_btn").unbind("click");
        } else if( data.data.pv_terms == -1 ) {
            $('#accept_terms_btn').addClass('redBlock');
            $('#accept_terms_span').addClass('glyphicon glyphicon-warning-sign');
            $scope.protermsData = '(Action required)';
        } else {
            $('#accept_terms_span').addClass('glyphicon glyphicon-chevron-right');
            $scope.protermsData = '';
        }

        if( data.data.pv_idverify == 1) {
            $('#verify_identity_btn').addClass('orangeBlock');
            $('#verify_identity_span').addClass('glyphicon glyphicon-time');
            $scope.proidverifyData = '(Pending review)';
            $("#verify_identity_btn").unbind("click");
        } else if( data.data.pv_idverify == 2 ) {
            $('#verify_identity_btn').addClass('greenBlock');
             $('#verify_identity_span').addClass('glyphicon glyphicon-ok');
            $scope.proidverifyData = '(Completed)';
            $("#verify_identity_btn").unbind("click");
        } else if( data.data.pv_idverify == -1 ) {

            $('#verify_identity_btn').addClass('redBlock');
            $('#verify_identity_span').addClass('glyphicon glyphicon-warning-sign');
            $scope.proidverifyData = '(Action required)';
        } else {
            $('#verify_identity_span').addClass('glyphicon glyphicon-chevron-right');
            $scope.proidverifyData = '';
        }

        if( data.data.pv_payinfo == 1) {
            $('#payment_details_btn').addClass('orangeBlock');
            $('#payment_details_span').addClass('glyphicon glyphicon-time');
            $scope.propayinfoData = '(Pending review)';
            $("#payment_details_btn").unbind("click");
        } else if( data.data.pv_payinfo == 2 ) {
            $('#payment_details_btn').addClass('greenBlock');
            $('#payment_details_span').addClass('glyphicon glyphicon-ok');
            $scope.propayinfoData = '(Completed)';
            $("#payment_details_btn").unbind("click");
        } else if( data.data.pv_payinfo == -1 ) {
            $('#payment_details_btn').addClass('redBlock');
            $('#payment_details_span').addClass('glyphicon glyphicon-warning-sign');
            $scope.propayinfoData = '(Action required)';
        } else {
            $('#payment_details_span').addClass('glyphicon glyphicon-chevron-right');
            $scope.propayinfoData = '';
        }

    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );
} )

//+++++++++++++++++++++++++++acceptterms page controller+++++++++++++++++++++

mainApp.controller( "accepttermsController", function( $scope, $http, $timeout, $state, $rootScope ) {
 //alert('sdsd')


// }
    var myScroll;
    myScroll = new iScroll('wrapper');

    $scope.acceptTermsLink = function( $event ) {
        var accpetTermData = {};
        accpetTermData['accepted'] = 1;
        accpetTermData['responsetype'] = 'json';
        //console.log(JSON.stringify(accpetTermData));
        var responsePromise = $http.post(BASE_URL+"pro/acceptterms",JSON.stringify(accpetTermData));
        responsePromise.success( function( data, status, headers, config ) {
            //console.log(JSON.stringify(data));
            //$state.transitionTo('home.accepttermscomplete');
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/accepttermscomplete"
            });
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };

} )

//+++++++++++++++++++++++++++accepttermsComplete page controller+++++++++++++++++++++

mainApp.controller( "accepttermscompleteController", function( $scope, $http, $timeout, $state, $rootScope ) {
    $scope.completeLink = function( $event ) {
        //$state.transitionTo('home.prodashboard');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/prodashboard"
        });
    };
} )

//+++++++++++++++++++++++++++paymentoption page controller+++++++++++++++++++++

mainApp.controller( "paymentoptionController", function( $scope, $http, $timeout, $state, $rootScope, $filter, constantData ) {
    $scope.countryList = [{ id:'', value:'(Select Country)'}];
    angular.forEach(constantData.getCountryData(), function(value, key){
        var item = { id:key, value:value };
        $scope.countryList.push(item);
    });
    $scope.stateList = [{ id:'', value:'(Select State)'}];
    angular.forEach(constantData.getStateData(), function(value, key){
        var item = { id:key, value:value };
        $scope.stateList.push(item);
    });

    var paymentOptionData = {};
    paymentOptionData['responsetype'] = 'json';
    // console.log( JSON.stringify( paymentOptionData ) );
    $http({
        url: BASE_URL+'pro/paymentoption?responsetype=json',
        method: "GET"
    }).success(function (data, status, headers, config) {
        console.log(JSON.stringify(data));
        if( data.status != 'failed' ){
            $scope.fullname = data.data.payinfo.full_name;
            $scope.dob_label = data.data.payinfo.birth_date.split("-");
            $scope.address1 = data.data.payinfo.street_address1;
            $scope.address2 = data.data.payinfo.street_address2;
            $scope.city = data.data.payinfo.city;
            $scope.state = data.data.payinfo.state;
            $scope.zipcode = data.data.payinfo.zipcode;
            $scope.country = data.data.payinfo.country;
            //alert($scope.dob_label[1]);
            $scope.birth_month = $filter('date')(new Date($scope.dob_label[0],$scope.dob_label[1]-1,$scope.dob_label[2]),'MM');
            $scope.birth_year = $filter('date')(new Date($scope.dob_label[0],$scope.dob_label[1]-1,$scope.dob_label[2]),'yyyy');
            $scope.birth_day = $filter('date')(new Date($scope.dob_label[0],$scope.dob_label[1]-1,$scope.dob_label[2]),'dd');
        }
    }).error(function (data, status, headers, config) {
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
        console.log( JSON.stringify( data ) );
    });

    var flag = false;
    $scope.paymentAddrSubmit = function( $event ) {
        var new_val = "";
        var paymentOptionDiv = document.getElementById('paymentoption_form');
        var input_id = '';
        var elementsLength = paymentOptionDiv.getElementsByTagName('input').length;
        if( $scope.output == true ) {
            $('#output').val('Y');
        }
        for (var i=0; i<parseInt(elementsLength); i++) {
            input_id = paymentOptionDiv.getElementsByTagName('input')[i].id;
            new_val = paymentOptionDiv.getElementsByTagName('input')[i].value;
            $("label[for='"+input_id+"']").removeAttr('style');
            document.getElementsByTagName("span")[i].innerHTML = '';
            if( i == 2 ) {
                continue;
            }
            if( new_val == '' ) {
                document.getElementsByTagName("span")[i].innerHTML = 'This field is required.';
                $("label[for='"+input_id+"']").css('color','red');
            }
            if( i == elementsLength-1 ){
                if($('#output').val() == "N"){
                    $('#output_error').html('This field is required.');
                    $('#output_label').css('color','red');
                }
            }
        }

        if( $('#state').val() == '' ) {
            $('#state_error').html('This field is required.');
            $('#state_label').css('color','red');
        }
        if( $('#country').val() == '' ) {
            $('#country_error').html('This field is required.');
            $('#country_label').css('color','red');
        }
        if( $('#birth_year').val() == '' || $('#birth_month').val() =='' || $('#birth_day').val() =='' ) {
            $('#dob_error').html('This field is required.');
            $('#dob_label').css('color','red');
        }

        $( '#fullname' ).keydown(function (e) {
            if(e.keyCode == 8){
                // console.log("enter");
                    if( $('#fullname').val().length <= 2 && $('#fullname').val().length > 0 ) {
                        // console.log($( '#fullname' ).val().length);
                        flag = false;
                        $( '#fullname_error1' ).html( 'Please enter at least 2 characters.' );
                    }
                    if( $('#fullname').val().length == 1 ){
                        // console.log($( '#fullname' ).val().length);
                        $( '#fullname_error1' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    if( $('#fullname').val().length <= 2 && $('#fullname').val().length > 0 ) {
                    flag = false;
                    $( '#fullname_error1' ).html( 'Please enter at least 2 characters.' );
                }
                if( $('#fullname').val().length >= 1) {
                    // console.log("check");
                        $( '#fullname_error1' ).html('');
                        $( '#fullname_label1' ).removeAttr('style');
                        flag = 1;
                }
            }
            // if( $( '#fullname_error1' ).html() == 'This field is required.' ) {
            //     $( '#fullname_error1' ).html('Please enter at least 2 characters.');
            // }
            // if( $('#fullname').val().length >= 2) {
            //         $( '#fullname_error1' ).html('');
            //         $( '#fullname_label1' ).removeAttr('style');
            // } else {
            //     $( '#fullname_error1' ).html('Please enter at least 2 characters.');
            //     $( '#fullname_label1' ).css('color','red');
            // }
        } );

        $( '#address1' ).keydown(function (e) {
            if(e.keyCode == 8){
                // console.log("enter");
                    if( $('#address1').val().length <= 2 && $('#address1').val().length > 0 ) {
                        // console.log($( '#address1' ).val().length);
                        flag = false;
                        $( '#address1_error' ).html( 'Please enter at least 2 characters.' );
                    }
                    if( $('#address1').val().length == 1 ){
                        // console.log($( '#address1' ).val().length);
                        $( '#address1_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    if( $('#address1').val().length <= 2 && $('#address1').val().length > 0 ) {
                    flag = false;
                    $( '#address1_error' ).html( 'Please enter at least 2 characters.' );
                }
                if( $('#address1').val().length >= 1) {
                    // console.log("check");
                        $( '#address1_error' ).html('');
                        $( '#address1_label' ).removeAttr('style');
                        flag = 1;
                }
            }
            // if( $( '#address1_error' ).html() == 'This field is required.' ) {
            //     $( '#address1_error' ).html('Please enter at least 2 characters.');
            // }
            // if( $('#address1').val().length >= 2 ) {
            //         $( '#address1_error' ).html('');
            //         $( '#address1_label' ).removeAttr('style');
            // } else {
            //     $( '#address1_error' ).html('Please enter at least 2 characters.');
            //     $('#address1_label').css('color','red');
            // }
        } );

        $( '#city' ).keydown(function (e) {
            if(e.keyCode == 8){
                // console.log("enter");
                    if( $('#city').val().length <= 2 && $('#city').val().length > 0 ) {
                        // console.log($( '#city' ).val().length);
                        flag = false;
                        $( '#city_error' ).html( 'Please enter at least 2 characters.' );
                    }
                    if( $('#city').val().length == 1 ){
                        // console.log($( '#city' ).val().length);
                        $( '#city_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    if( $('#city').val().length <= 2 && $('#city').val().length > 0 ) {
                    flag = false;
                    $( '#city_error' ).html( 'Please enter at least 2 characters.' );
                }
                if( $('#city').val().length >= 1) {
                    // console.log("check");
                        $( '#city_error' ).html('');
                        $( '#city_label' ).removeAttr('style');
                        flag = 1;
                }
            }
            // if( $( '#city_error' ).html() == 'This field is required.' ) {
            //     $( '#city_error' ).html('Please enter at least 2 characters.');
            // }
            // if( $('#city').val().length >= 2 ) {
            //         $( '#city_error' ).html('');
            //         $( '#city_label' ).removeAttr('style');
            // } else {
            //     $( '#city_error' ).html('Please enter at least 2 characters.');
            //     $('#city_label').css('color','red');
            // }
        } );

        $( '#state' ).change(function() {
            if($( '#state' ).val() == ''){
                $( '#state_error' ).html('This field is required.');
                $('#state_label').css('color','red');
            } else {
                $( '#state_error' ).html('');
                $( '#state_label' ).removeAttr('style');
            }
        } );

        $( '#country' ).change(function() {
            if($( '#country' ).val() == ''){
                $( '#country_error' ).html('This field is required.');
                $('#country_label').css('color','red');
            } else {
                $( '#country_error' ).html('');
                $( '#country_label' ).removeAttr('style');
            }
        } );

        $("#birth_year").change(onDOBChange);
        $("#birth_month").change(onDOBChange);
        $("#birth_day").change(onDOBChange);

        function onDOBChange() {
            if( $('#birth_year').val() != '' && $('#birth_month').val() !='' && $('#birth_day').val() !='' ) {
                $('#dob_error').html('');
                $('#dob_label').removeAttr('style');
            } else {
                $('#dob_error').html('This field is required.');
                $('#dob_label').css('color','red');
            }
        }

        $( '#zipcode' ).keydown(function (e) {
            if(e.keyCode == 8){
                // console.log("enter");
                    if( $('#zipcode').val().length <= 5 && $('#zipcode').val().length > 0 ) {
                        // console.log($( '#zipcode' ).val().length);
                        flag = false;
                        $( '#zipcode_error' ).html( 'Please enter at least 5 characters.' );
                    }
                    if( $('#zipcode').val().length == 1 ){
                        // console.log($( '#zipcode' ).val().length);
                        $( '#zipcode_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    if( $('#zipcode').val().length <= 5 && $('#zipcode').val().length > 0 ) {
                    flag = false;
                    $( '#zipcode_error' ).html( 'Please enter at least 5 characters.' );
                }
                if( $('#zipcode').val().length >= 4) {
                    // console.log("check");
                        $( '#zipcode_error' ).html('');
                        $( '#zipcode_label' ).removeAttr('style');
                        flag = 1;
                }
            }
            // if( $( '#zipcode_error' ).html() == 'This field is required.' ) {
            //     $( '#zipcode_error' ).html('Please enter at least 5 characters.');
            // }
            // if( $('#zipcode').val().length >= 5 ) {
            //         $( '#zipcode_error' ).html('');
            //         $( '#zipcode_label' ).removeAttr('style');
            // } else {
            //     $( '#zipcode_error' ).html('Please enter at least 5 characters.');
            //     $( '#zipcode_label' ).css('color','red');
            // }
        } );

        $('#output').change(function() {
            if($(this).is(":checked")) {
                $( '#output_error' ).html('');
                $( '#output_label' ).removeAttr('style');
            } else {
                $( '#output_error' ).html('This field is required.');
                $( '#output_label' ).css('color','red');
            }
        });

        if( $('#fullname').val() != '' && $('#fullname').val().length < 2) {

                $( '#fullname_error1' ).html('Please enter at least 2 characters.');
                $( '#fullname_label1' ).css('color','red');
        }

        if( $('#address1').val() != '' && $('#address1').val().length < 2) {

                $( '#address1_error' ).html('Please enter at least 2 characters.');
                $( '#address1_label' ).css('color','red');
        }

        if( $('#city').val() != '' && $('#city').val().length < 2) {

                $( '#city_error' ).html('Please enter at least 2 characters.');
                $( '#city_label' ).css('color','red');
        }

        if( $('#zipcode').val() != '' && $('#zipcode').val().length < 5) {

                $( '#zipcode_error' ).html('Please enter at least 5 characters.');
                $( '#zipcode_label' ).css('color','red');
        }

        if ( $( '#state_error' ).html() == '' && $( '#zipcode_error' ).html() == '' && $( '#country_error' ).html() == '' && $( '#city_error' ).html() == '' && $( '#address1_error' ).html() == '' && $( '#fullname_error1' ).html() == '' && $( '#output_error' ).html()=='' ) {
            flag = true;
        }

        var paymentOptionData = {};
        paymentOptionData['fullname'] = $scope.fullname;
        paymentOptionData['address1'] = $scope.address1;
        paymentOptionData['city'] = $scope.city;
        paymentOptionData['state'] = $scope.state;
        paymentOptionData['country'] = $scope.country;
        paymentOptionData['zipcode'] = $scope.zipcode;
        paymentOptionData['output'] = $scope.output;
        paymentOptionData['address2'] = $scope.address2;
        paymentOptionData['birth_year'] = $scope.birth_year;
        paymentOptionData['birth_month'] = $scope.birth_month;
        paymentOptionData['birth_day'] = $scope.birth_day;
        paymentOptionData['responsetype'] = 'json';
        if( flag == true ) {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            // console.log( JSON.stringify( paymentOptionData ) );
            var responsePromise = $http.post(BASE_URL+"pro/paymentoption",JSON.stringify(paymentOptionData));
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if( data.status == 'success' ) {
                    //$state.transitionTo('home.paymentoptcomplete');
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/paymentoptcomplete"
                    });
                } else {
                    $('#paymentOptionStatus').html( data.message );
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
                console.log( JSON.stringify( data ) );
            } );
        }
    };
} )


//+++++++++++++++++++++++++++verifyidentity page controller+++++++++++++++++++++

mainApp.controller( "verifyidentityController", function( $scope, $http, $timeout, $state, $rootScope ) {
    $scope.div_visible = true;
    $scope.takePhotoOpt = false;

    $scope.uploadVerifyPhoto = function () {
        $scope.takePhotoOpt = true;
    };

    $scope.cancelPhoto = function () {
        $scope.takePhotoOpt = false;
    };

    function onPhotoDataSuccess(imageData) {
        var profileImage = document.getElementById('verify_image');
        profileImage.style.display = 'block';
        profileImage.src = "data:image/jpeg;base64," + imageData;
        imageStringVerify = imageData;
    }

    // A button will call this function
    $scope.takePhoto = function () {
        $scope.takePhotoOpt = false;
        $scope.div_visible = false;
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth:1000, targetHeight: 1000,
            allowEdit: true, correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL
        });
    };

    //take photo from phone gallery
    $scope.photoLibrary = function ( ) {
        $scope.takePhotoOpt = false;
        $scope.div_visible = false;
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth:1000, targetHeight: 1000,
        destinationType: destinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
    };

    // Called if something bad happens.
    function onFail(message) {
        //alert('Failed because: ' + message);
        $scope.takePhotoOpt = false;
        $scope.div_visible = true;
    }

    //when success upload
    $scope.saveVerifyPic = function(){
        var updateVerifyData = {};
        updateVerifyData['responsetype'] = "json";
        updateVerifyData['image'] = imageStringVerify;
        //console.log(JSON.stringify(updateVerifyData));
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        var responsePromise = $http.post(BASE_URL+"pro/uploadphotoid",JSON.stringify(updateVerifyData));
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            if( data.status == 'success' ) {
                $('#uploadVerify_id').removeClass('errorStatus').addClass('succesStatus');
            } else {
                $('#uploadVerify_id').removeClass('succesStatus').addClass('errorStatus');
            }
            $('#uploadVerify_id').html(data.message);
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/prodashboard"
            });
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };

    $scope.cancelUpload = function ( $event) {
        $('#uploadVerify_id').html('');
        $scope.div_visible = true;
    };

})

//+++++++++++++++++++++++++++prosettings page controller+++++++++++++++++++++

mainApp.controller( "prosettingsController", function( $scope, $http, $timeout, $state, $rootScope ) {
    var user_detail = localStorage.getItem("userDetail");
    var userData = JSON.parse(user_detail).data;
    //$scope.loginid = userData.id;
    $scope.greetingshow = false;
    $scope.loginid = userData.id;
    $scope.trialSetting = function () {
        window.plugins.nativepagetransitions.slide( {
            "href" : "#/home/trialsettings"
        } );
    };
    $scope.viewProfile = function () {
        //$state.transitionTo( 'home.viewprofilenew',{ userid:$scope.proSetData.id, uname:$scope.proSetData.displayname } );
        window.plugins.nativepagetransitions.slide( {
            // "direction": 'up',
            "href" : "#/home/profile"+$scope.proSetData.id+'/'+$scope.proSetData.displayname
        } );
    };
    $scope.setCall = function(){
        //$state.transitionTo('home.setrates');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/setrates"
        });
    };
    $scope.viewEarning = function(){
        //$state.transitionTo('home.stats');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/stats"
        });
    };
    $scope.forwardSetting = function(){
        //$state.transitionTo('home.stats');
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/forwardingsettings"
        });
    };
    $scope.voicegreeting = function(){
        // console.log("voice greeting");
        // console.log($scope.proSetData.ringhop_number);
        $state.transitionTo( 'home.mygreeting',{ ringhop_number:$scope.proSetData.ringhop_number } );
       // window.plugins.nativepagetransitions.slide({
       //      "href" : "#/home/mygreeting"+$scope.proSetData.ringhop_number
       //  }); 
   };
    var proSettingData = {};
    proSettingData['responsetype'] = 'json';
    // console.log(JSON.stringify(proSettingData));
    var responsePromise = $http.post(BASE_URL+"pro/prosettings",JSON.stringify(proSettingData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        $scope.proSetData = data.data;
        //var pro_number = "("+user_number.substr(1, 3)+") "+user_number.substr(4, 3)+"-"+user_number.substr(7, 4);
        $scope.proSetData.ringhop_number = "+"+$scope.proSetData.ringhop_number.substr(0,1)+" ("+$scope.proSetData.ringhop_number.substr(1, 3)+") "+$scope.proSetData.ringhop_number.substr(4, 3)+"-"+$scope.proSetData.ringhop_number.substr(7, 4);
        $scope.greeting = data.data.name_greeting;
        // console.log($scope.greeting);
        if($scope.greeting != null){
            $('.voicelist').css({"background":"#fff"});
            $scope.greetingshow = true;
        }else{
           $scope.greetingshow = false; 
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );
    
} )

//+++++++++++++++++++++++++++mygreeting page controller+++++++++++++++++++++

mainApp.controller( "mygreetingController", function( $scope, $http, $timeout, $state, $rootScope, $stateParams, $sce  ) {
    $( 'audio' ).audioPlayer(); 
    // console.log($( 'audio' ).audioPlayer());
    var user_detail = localStorage.getItem("userDetail");
    $scope.showdelaudiopopup = false;
    // $scope.greetingUrlshow = false;
    var userData = JSON.parse(user_detail).data;
    // console.log("enter mygreeting");
    $scope.loginid = userData.id;
    // console.log(userData.id);
    $scope.callNo = $stateParams.ringhop_number;
    // console.log($scope.callNo);
    var getgreetingsData = {};
    getgreetingsData['responsetype'] = 'json';
    var responsePromise = $http.post(BASE_URL+"pro/mygreeting",JSON.stringify(getgreetingsData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        // console.log(data.data.name_greeting);
        $scope.voicegreet = data.data.name_greeting;
        $scope.getPin = data.data.optincode;
        $scope.greetingUrl = $sce.trustAsResourceUrl(data.data.name_greeting);
        // if($scope.greetingUrl != null){
        //     console.log($( 'audio' ).audioPlayer());
        //     $( 'audio' ).audioPlayer();
        // }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );
    $scope.delaudiopopup = function(){
        $scope.showdelaudiopopup = true;
    };
    $scope.closedelaudio = function(){
        $scope.showdelaudiopopup = false;
    };
    $scope.refreshpin = function () {
        var greetingsData = {};
        greetingsData['responsetype'] = 'json';
        greetingsData['userid'] = userData.id;
        // console.log(JSON.stringify(greetingsData));
        if(userData.id){
            // console.log("enter id");
            var responsePromise = $http.post(BASE_URL+"updatepin",JSON.stringify(greetingsData));
            responsePromise.success( function( data, status, headers, config ) {
                console.log(JSON.stringify(data));
                if (data.pin > 0) {
                    $scope.getPin = data.pin;
                    // $("#pin").html(''+ result.pin);

                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
        
    };
    $scope.deletegreeting = function(){
        var delgreetingData = {};
        delgreetingData['responsetype'] = 'json';
        delgreetingData['userid'] = userData.id;
        // console.log(JSON.stringify(delgreetingData));
            var responsePromise = $http.post(BASE_URL+"pro/deletegreeting",JSON.stringify(delgreetingData));
            responsePromise.success( function( data, status, headers, config ) {
                console.log(JSON.stringify(data));
                // window.plugins.nativepagetransitions.slide({
                // "href" : "#/home/mygreeting"
                // });

                
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
            $scope.showdelaudiopopup = false;
    };
} )
//+++++++++++++++++++++++++++setrates page controller+++++++++++++++++++++

mainApp.controller( "setratesController", function( $scope, $http, $timeout, $state, $rootScope, constantData ) {
    $scope.per_minute_select = [];
    angular.forEach(constantData.getSetRatesData().call_rates, function(value, key){
        var item = { id:key, value:value };
        $scope.per_minute_select.push(item);
    });
    // $scope.per_minute_select = [
    //     {id:'0.99', value:'$0.99 per min'},
    //     {id:'1.99', value:'$1.99 per min'},
    //     {id:'2.99', value:'$2.99 per min'},
    //     {id:'3.99', value:'$3.99 per min'},
    //     {id:'4.99', value:'$4.99 per min'},
    //     {id:'5.99', value:'$5.99 per min'},
    //     {id:'6.99', value:'$6.99 per min'},
    //     {id:'7.99', value:'$7.99 per min'},
    //     {id:'8.99', value:'$8.99 per min'},
    //     {id:'9.99', value:'$9.99 per min'}
    // ];
    //$scope.perMinuteCode = $scope.per_minute_select[0];

    $scope.per_text_select = [];
    angular.forEach(constantData.getSetRatesData().sms_rates, function(value, key){
        var item = { id:key, value:value };
        $scope.per_text_select.push(item);
    });
    
    $scope.per_video_select = [];
    angular.forEach(constantData.getvideoCallRatesData(), function(value, key){
        var item = { id:key, value:value };
        $scope.per_video_select.push(item);
    });

    var rateData = {};
    rateData['responsetype'] = 'json';
    //console.log( JSON.stringify( rateData ) );
    var responsePromise = $http.post(BASE_URL+"pro/setrates",JSON.stringify(rateData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.perMinuteCode = data.data.call_rate;
        $scope.perTextCode = data.data.text_rate;
        $scope.perSendText = data.data.send_text_rate;
        $scope.perPhotoCode = data.data.photo_rate;
        $scope.perVideoCode =  data.data.video_call_rate;
        $scope.per_text_select = [];
        $scope.per_minute_select = [];
        $scope.per_text_send_select = [];
        $scope.per_photo_select = [];
        $scope.per_video_select = [];
        angular.forEach(data.data.text_rates, function(value, key){
            var item = { id:key, value:value };
            $scope.per_text_select.push(item);
        });
        angular.forEach(data.data.call_rates, function(value, key){
            var item = { id:key, value:value };
            $scope.per_minute_select.push(item);
        });
        angular.forEach(data.data.send_text_rates, function(value, key){
            var item = { id:key, value:value };
            $scope.per_text_send_select.push(item);
        });
        angular.forEach(data.data.photo_rates, function(value, key){
            var item = { id:key, value:value };
            $scope.per_photo_select.push(item);
        });
        angular.forEach(data.data.video_call_rates, function(value, key){
            var item = { id:key, value:value };
            $scope.per_video_select.push(item);
        });
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
    } );
    $scope.updateRates = function(){
        $('#rate_status').addClass('errorStatus').removeClass('succesStatus');
        var setrates = {};
        setrates['perminute_rate'] = $scope.perMinuteCode;
        setrates['pertext_rate'] = $scope.perTextCode;
        setrates['pertext_send_rate'] = $scope.perSendText;
        setrates['perphoto_rate'] = $scope.perPhotoCode;
        setrates['video_perminute_rate'] = $scope.perVideoCode;
        setrates['responsetype'] = 'json';
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        // console.log(JSON.stringify(setrates));
        var responsePromise = $http.post(BASE_URL+"pro/setrates",JSON.stringify(setrates));
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            if(data.status == 'success') {
                $('#rate_status').removeClass('errorStatus').addClass('succesStatus');
            } else {
                $('#rate_status').addClass('errorStatus').removeClass('succesStatus');
            }
            $('#rate_status').html(data.message);
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };

} )

//+++++++++++++++++++++++++++stats page controller+++++++++++++++++++++

mainApp.controller( "statsController", function( $scope, $http, $timeout, $state, $filter, $rootScope ) {
    $scope.date = new Date();
    var currmonth = $filter('date')(new Date(),'MM');
    var curryear = $filter('date')(new Date(),'yyyy');
    var currdate = $filter('date')(new Date(),'dd');
    var x = 0;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.isPro = false;
    } else {
        $scope.isPro = true;
    }
    //var currdate = 16;
    //var currmonth = 01;
    // console.log(currmonth);
    var d = new Date(2015, 1 + 1, 0);
    if( currdate > 0 && currdate <= 15 ) {
        $scope.currPeriodSelect = [
            {id: currmonth+'/01/'+curryear+'-'+currmonth+'/15/'+curryear, value:'Current period - '+currmonth+'/1 to '+currmonth+'/15/'+curryear}
        ];
        for( var i = currmonth; i > ( currmonth-3 ); i -= 0.5 ) {
            if( Math.ceil(i-1) == 0 ) {
                x = 12;
            } else if( Math.ceil(i-1) == -1 ) {
                x = 11;
            } else if( Math.ceil(i-1)  == -2 ) {
                x = 10;
            } else {
                x = Math.ceil(i-1);
            }
            var d = new Date(curryear, x, 0);
            var lastdate = $filter('date')(d,'dd');

            if( i % 1 != 0 ){
            	// console.log(curryear);
                var item = { id: x +'/01/'+(curryear-1)+'-'+ x +'/15/'+(curryear-1), value: x +'/01 to '+ x +'/15/'+(curryear-1) };
            } else {
            	// console.log(curryear);
                var item = { id: x +'/16/'+(curryear-1)+'-'+ x +'/'+lastdate+'/'+(curryear-1), value: x +'/16 to '+ x +'/'+lastdate+'/'+(curryear-1) };
            }
            $scope.currPeriodSelect.push( item );
        }
    } else {
        $scope.currPeriodSelect = [
            { id: currmonth+'/16/'+curryear+'-'+currmonth+'/31/'+curryear, value:'Current period - '+currmonth+'/16 to '+currmonth+'/31/'+curryear },
           {id: currmonth+'/01/'+curryear+'-'+currmonth+'/15/'+curryear, value:currmonth+'/01 to '+currmonth+'/15/'+curryear}
        ];
        for( var i = currmonth; i > ( currmonth-3 ); i -= 0.5 ) {
            if( Math.floor( i ) == 0 ) {
                x = 12;
            } else if( Math.floor( i ) == -1 ) {
                x = 11;
            } else if( Math.floor( i )  == -2 ) {
                x = 10;
            } else {
                x = Math.floor(i);
            }
            var d = new Date(curryear, x, 0);
            var lastdate = $filter('date')(d,'dd');
            if( i % 1 != 0 ) {
                var item = { id: x+'/16/'+(curryear-1)+'-'+ x +'/'+lastdate+'/'+(curryear-1), value: x+'/16 to '+x+'/' + lastdate+'/'+(curryear-1) };
            } else {
                var item = { id: x +'/01/'+(curryear-1)+'-'+ x +'/15/'+(curryear-1), value: x +'/01 to '+ x +'/15/' + (curryear-1) };
            }
            $scope.currPeriodSelect.push( item );
        }
    }

    // console.log($scope.currPeriodSelect);
    //$scope.period_select = $scope.currPeriodSelect[0];
    if( $scope.isPro == true ) {
        var statsURL = BASE_URL+"pro/stats";
    } else {
        var statsURL = BASE_URL+"userstats";
    }
    // console.log(statsURL);
    var statsData = {};
    statsData['responsetype'] = 'json';
    // console.log(JSON.stringify(statsData));
    var responsePromise = $http.post(statsURL,JSON.stringify(statsData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if( data.message == 'user not logged in' ) {
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/login"
            });
        }
        var changeDate = data.data.stats_period.split("-");
        // console.log(JSON.stringify(changeDate));
        if( changeDate != '' ) {
            $scope.initial = $filter('date')(new Date(changeDate[0]),'MMM d');
            $scope.final1 = $filter('date')(new Date(changeDate[1]),'MMM d, yyyy');
        } else {
            $scope.initial = $filter('date')(new Date(),'MMM d');
            $scope.final1 = $filter('date')(new Date(),'MMM d, yyyy');
        }

        $scope.stats = data.data;
        var curr_charge = parseFloat( data.data.calls_currentperiod.call_charge ) + parseFloat( data.data.msg_currentperiod.msg_charge )+parseFloat(50.00);
        $scope.totalCurrCharge = curr_charge.toFixed(2);
        var today_charge = parseFloat(data.data.calls_today.call_charge) + parseFloat(data.data.msg_today.msg_charge)+parseFloat(10.00);
        $scope.totalTodayCharge = today_charge.toFixed(2);
        var call_time = data.data.calls_currentperiod.call_secs;
        $scope.callTime = Math.floor(call_time);
        var curr_call = parseFloat(data.data.calls_currentperiod.call_charge);
        $scope.currCallCharge = curr_call.toFixed(2);
        $scope.todayCallCharge = parseFloat(data.data.calls_today.call_charge).toFixed(2);
        var curr_per_msg_chrg = parseFloat(data.data.msg_currentperiod.msg_charge);
        var curr_per_msg_chrg1 = parseFloat(data.data.msg_currentperiod1.msg_charge);
        var currPerMsgChrg = curr_per_msg_chrg+curr_per_msg_chrg1;
        // console.log(currPerMsgChrg);
        $scope.currMsgChrg = (Math.round( currPerMsgChrg * 100 ) / 100).toFixed(2);
        // console.log($scope.currMsgChrg);
        var num = parseFloat(data.data.total_period_charge);
		$scope.TotalperiodChrg = (Math.round( num * 100 ) / 100).toFixed(2);
        $scope.currPerMsgChrg = parseFloat(data.data.msg_currentperiod.msg_charge).toFixed(2);
        $scope.msgtodayChrg = parseFloat(data.data.msg_today.msg_charge).toFixed(2);
        $scope.photoCurrChrg = parseFloat(data.data.photo_currentperiod.photo_charge).toFixed(2);
        $scope.phototodayChrg = parseFloat(data.data.photo_today.photo_charge).toFixed(2);
        $scope.callcurr_ref_in = parseFloat(data.data.calls_currentperiod_ref_in.call_charge).toFixed(2);
        $scope.calltoday_ref_in = parseFloat(data.data.calls_today_ref_in.call_charge).toFixed(2);
        $scope.callcurr_ref_out = parseFloat(data.data.calls_currentperiod_ref_out.call_charge).toFixed(2);
        $scope.calltoday_ref_out = parseFloat(data.data.calls_today_ref_out.call_charge).toFixed(2);
        //$scope.currPerTipChrg = parseFloat(data.data.tip_currentperiod.tip_charge).toFixed(2);
        $scope.tiptodayChrg = parseFloat(data.data.tip_today.shout_charge).toFixed(2);
        //console.log($scope.tiptodayChrg);
        var tipCharge = parseFloat(data.data.tip_currentperiod.tip_charge);
        $scope.currPerTipChrg = (Math.round( tipCharge * 100 ) / 100).toFixed(2)
        var call_time_ref_in = data.data.calls_currentperiod_ref_in.call_secs;
        var call_time_ref_out = data.data.calls_currentperiod_ref_out.call_secs;
        $scope.callTime_ref_in = Math.floor(call_time_ref_in);
        $scope.callTime_ref_out = Math.floor(call_time_ref_out);
        var shoutCharge = parseFloat(data.data.shouts_currentperiod.shout_charge);
        $scope.shouts_Charge = (Math.round( shoutCharge * 100 ) / 100).toFixed(2);
    	$scope.shouttodayChrg = parseFloat(data.data.photo_today.photo_charge).toFixed(2);
         var vcallsCharge = parseFloat(data.data.vcalls_currentperiod.call_charge);
        $scope.call_charge = (Math.round( vcallsCharge * 100 ) / 100).toFixed(2);
        $scope.videocall_today_chrg = parseFloat(data.data.vcalls_today.call_charge).toFixed(2);
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.currPeriodChange = function() {
        statsData['stats_period'] = $scope.period_select;
        // console.log( JSON.stringify( statsData ) );
        var responsePromise = $http.post(statsURL,JSON.stringify(statsData));
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            var changeDate = data.data.stats_period.split("-");
            // console.log(JSON.stringify(changeDate));
            $scope.initial = $filter('date')(new Date(changeDate[0]),'MMM d');
            $scope.final1 = $filter('date')(new Date(changeDate[1]),'MMM d, yyyy');
            $scope.stats = data.data;
            var curr_charge = parseFloat(data.data.calls_currentperiod.call_charge) + parseFloat(data.data.msg_currentperiod.msg_charge)+parseFloat(50.00);
            $scope.totalCurrCharge = curr_charge.toFixed(2);
            var today_charge = parseFloat(data.data.calls_today.call_charge) + parseFloat(data.data.msg_today.msg_charge)+parseFloat(10.00);
            $scope.totalTodayCharge = today_charge.toFixed(2);
            var call_time = data.data.calls_currentperiod.call_secs;
            $scope.callTime = Math.floor(call_time);
            var curr_call = parseFloat(data.data.calls_currentperiod.call_charge);
            $scope.currCallCharge = curr_call.toFixed(2);
            $scope.todayCallCharge = parseFloat(data.data.calls_today.call_charge).toFixed(2);
            var curr_per_msg_chrg = parseFloat(data.data.msg_currentperiod.msg_charge);
	        var curr_per_msg_chrg1 = parseFloat(data.data.msg_currentperiod1.msg_charge); 
	        var currPerMsgChrg = curr_per_msg_chrg+curr_per_msg_chrg1;
	        // console.log($scope.currPerMsgChrg);
	        $scope.currMsgChrg = (Math.round( currPerMsgChrg * 100 ) / 100).toFixed(2);
	        // console.log($scope.currMsgChrg);
	        var num = parseFloat(data.data.total_period_charge);
			$scope.TotalperiodChrg = (Math.round( num * 100 ) / 100).toFixed(2);
            $scope.currPerMsgChrg = parseFloat(data.data.msg_currentperiod.msg_charge).toFixed(2);
            $scope.msgtodayChrg = parseFloat(data.data.msg_today.msg_charge).toFixed(2);
            $scope.photoCurrChrg = parseFloat(data.data.photo_currentperiod.photo_charge).toFixed(2);
            $scope.phototodayChrg = parseFloat(data.data.photo_today.photo_charge).toFixed(2);
            $scope.callcurr_ref_in = parseFloat(data.data.calls_currentperiod_ref_in.call_charge).toFixed(2);
            $scope.calltoday_ref_in = parseFloat(data.data.calls_today_ref_in.call_charge).toFixed(2);
            $scope.callcurr_ref_out = parseFloat(data.data.calls_currentperiod_ref_out.call_charge).toFixed(2);
            $scope.calltoday_ref_out = parseFloat(data.data.calls_today_ref_out.call_charge).toFixed(2);
            var tipCharge = parseFloat(data.data.tip_currentperiod.tip_charge);
            $scope.currPerTipChrg = (Math.round( tipCharge * 100 ) / 100).toFixed(2);
            var shoutCharge = parseFloat(data.data.shouts_currentperiod.shout_charge);
            $scope.shouts_Charge = (Math.round( shoutCharge * 100 ) / 100).toFixed(2);
            $scope.tiptodayChrg = parseFloat(data.data.tip_today.shout_charge).toFixed(2);
            $scope.shouttodayChrg = parseFloat(data.data.photo_today.photo_charge).toFixed(2);
            var call_time_ref_in = data.data.calls_currentperiod_ref_in.call_secs;
            var call_time_ref_out = data.data.calls_currentperiod_ref_out.call_secs;
            $scope.callTime_ref_in = Math.floor( call_time_ref_in );
            $scope.callTime_ref_out = Math.floor( call_time_ref_out );
            var vcallsCharge = parseFloat(data.data.vcalls_currentperiod.call_charge);
            $scope.call_charge = (Math.round( vcallsCharge * 100 ) / 100).toFixed(2);
            $scope.videocall_today_chrg = parseFloat(data.data.vcalls_today.call_charge).toFixed(2);
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );
    };
} )

//+++++++++++++++++++++++++++how it works page controller+++++++++++++++++++++

mainApp.controller( "howitworksCtrl", function( $scope, $http, $timeout, $state, $filter, $rootScope ) {
    var myScroll;
    myScroll = new iScroll('wrapper');
    $scope.goBack = function() {
        window.history.back();
    };
} )

//+++++++++++++++++++++++++++faq page controller+++++++++++++++++++++

mainApp.controller( "faqCtrl", function( $scope, $http, $timeout, $state, $filter, $rootScope ) {
    var myScroll;
    myScroll = new iScroll('wrapper');
    $scope.goBack = function(){
        // console.log("faqscontrl");
        window.history.back();
    };
} )


//+++++++++++++++++++++++++++statscalls page controller+++++++++++++++++++++

mainApp.controller( "statscallscontroller", function( $scope, $http, $timeout, $state, $filter, $stateParams, $rootScope ) {
    //alert($stateParams.calltype);
    $scope.calltype = $stateParams.calltype;
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.limit = 4;
    var pre_count = 1;
    var next_count = 1;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.isPro = false;
    } else {
        $scope.isPro = true;
    }
    if( $scope.isPro == true ) {
        var statscallsURL = BASE_URL+"pro/statscalls";
    } else {
        var statscallsURL = BASE_URL+"userstatscalls";
    }
    // console.log(statscallsURL);
    var statscalls = {};
    statscalls['responsetype'] = 'json';
    statscalls['calltype'] = $stateParams.calltype;
    // console.log( JSON.stringify( statscalls ) );
    var responsePromise = $http.post( statscallsURL,JSON.stringify( statscalls ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.statsCallData = data.data;
        $scope.statscallhistory = data.data.calllogs;
        angular.forEach($scope.statscallhistory, function(history , filterKey) {
            history.call_amount = parseFloat( history.call_amount).toFixed(2);
            history.call_duration = parseFloat( history.call_duration ).toFixed(2);
        } );
        $scope.limit = data.data.per_page;
        $scope.totalMessage = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                //$scope.noMessage = "No billing history available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.prevBtn = function () {
        $('#arrow1').css ( {"opacity":"1" });
        next_count = next_count - 1;
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
             $('#arrow').css ( {"opacity":"0.5" });
            $scope.prevDisabled = true;
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            statscalls['page'] = pre_count;
            // console.log( JSON.stringify( statscalls ) );
            var responsePromise = $http.post( statscallsURL, JSON.stringify( statscalls ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.statscallhistory = data.data.calllogs;
                $scope.statsCallData = data.data;

                // angular.forEach($scope.statscallhistory, function(history , filterKey) {
                //     history.call_start = $scope.convertTZ( history.call_start, data.data.timezone );
                // } );
                angular.forEach($scope.statscallhistory, function(history , filterKey) {
                    history.call_amount = parseFloat( history.call_amount).toFixed(2);
                    history.call_duration = parseFloat( history.call_duration ).toFixed(2);
                } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function () {
         $('#arrow').css ( {"opacity":"1" });
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            statscalls['page'] = next_count;
            // console.log( JSON.stringify( statscalls ) );
            var responsePromise = $http.post( statscallsURL, JSON.stringify( statscalls ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.recentChats = '';
                $scope.limit = data.data.per_page;
                $scope.statscallhistory = data.data.calllogs;
                $scope.statsCallData = data.data;

                // angular.forEach( $scope.statscallhistory, function( history , filterKey ) {
                //     history.call_start = $scope.convertTZ( history.call_start, data.data.timezone );
                // } );
                angular.forEach($scope.statscallhistory, function(history , filterKey) {
                    history.call_amount = parseFloat( history.call_amount).toFixed(2);
                    history.call_duration = parseFloat( history.call_duration ).toFixed(2);
                } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $('#arrow1').css ( {"opacity":"0.5" });
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
            $('#arrow1').css ( {"opacity":"0.5" });
        }
    };
} )


//+++++++++++++++++++++++++++statsmessages page controller+++++++++++++++++++++

mainApp.controller( "statsmessagescontroller", function( $scope, $http, $timeout, $state, $filter, $rootScope ) {
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.limit = 4;
    var pre_count = 1;
    var next_count = 1;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.isPro = false;
    } else {
        $scope.isPro = true;
    }
    if( $scope.isPro == true ) {
        var statsmsgURL = BASE_URL+"pro/statsmessages";
    } else {
        var statsmsgURL = BASE_URL+"userstatsmessages";
    }
    // console.log(statsmsgURL);
    var statsmessages = {};
    statsmessages['responsetype'] = 'json';
    // console.log( JSON.stringify( statsmessages ) );
    var responsePromise = $http.post( statsmsgURL, JSON.stringify( statsmessages ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.statsmsghistory = data.data.msglogs;
        // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
        //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
        // } );
        $scope.limit = data.data.per_page;
        $scope.totalMessage = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                //$scope.noMessage = "No message history available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.prevBtn = function () {
        next_count = next_count - 1;
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            statsmessages['page'] = pre_count;
            // console.log( JSON.stringify( statsmessages ) );
            var responsePromise = $http.post( statsmsgURL, JSON.stringify( statsmessages ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.statsmsghistory = data.data.msglogs;
                // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            statsmessages['page'] = next_count;
            // console.log( JSON.stringify( statsmessages ) );
            var responsePromise = $http.post( statsmsgURL, JSON.stringify( statsmessages ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.recentChats = '';
                $scope.limit = data.data.per_page;
                $scope.statsmsghistory = data.data.msglogs;
                // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };
} )

//+++++++++++++++++++++++++++tiphistory page controller+++++++++++++++++++++


mainApp.controller( "tiphistorycontroller", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.limit = 4;
    var pre_count = 1;
    var next_count = 1;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.isPro = false;
    } else {
        $scope.isPro = true;
    }
    if( $scope.isPro == true ) {
        var tiphistoryURL = BASE_URL+"pro/statstips";
    } else {
        var tiphistoryURL = BASE_URL+"userstatstip";
    }
    // console.log(tiphistoryURL);
    var tiphistorydata = {};
    tiphistorydata['responsetype'] = 'json';
    tiphistorydata['page'] = 1;
    // console.log( JSON.stringify( tiphistorydata ) );
    var responsePromise = $http.post( tiphistoryURL, JSON.stringify( tiphistorydata ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
         $scope.statstiphistory = data.data.msglogs;
        // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
        //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
        // } );
        $scope.limit = data.data.per_page;
        $scope.totalMessage = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                //$scope.noMessage = "No tip history available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.prevBtn = function () {
        next_count = next_count - 1;
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            tiphistorydata['page'] = pre_count;
            // console.log( JSON.stringify( tiphistorydata ) );
            var responsePromise = $http.post( tiphistoryURL, JSON.stringify( tiphistorydata ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.statstiphistory = data.data.msglogs;
                // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                // console.log($scope.statstiphistory);
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            tiphistorydata['page'] = next_count;
            // console.log( JSON.stringify( tiphistorydata ) );
            var responsePromise = $http.post( tiphistoryURL, JSON.stringify( tiphistorydata ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.recentChats = '';
                $scope.limit = data.data.per_page;
                $scope.statstiphistory = data.data.msglogs;
                // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };
} )

//+++++++++++++++++++++++++++shoutsHistory page controller+++++++++++++++++++++


mainApp.controller( "shoutsHistorycontroller", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.limit = 4;
    var pre_count = 1;
    var next_count = 1;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.isPro = false;
    } else {
        $scope.isPro = true;
    }
    if( $scope.isPro == true ) {
        var shouthistoryURL = BASE_URL+"pro/stats_shouts";
    } else {
        var shouthistoryURL = BASE_URL+"userstats_shouts";
    }
    // console.log(shouthistoryURL);
    var shouthistorydata = {};
    shouthistorydata['responsetype'] = 'json';
    shouthistorydata['page'] = 1;
    // console.log( JSON.stringify( shouthistorydata ) );
    var responsePromise = $http.post( shouthistoryURL, JSON.stringify( shouthistorydata ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.statsshouthistory = data.data.photologs;
        // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
        //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
        // } );
        $scope.limit = data.data.per_page;
        $scope.totalShouts = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalShouts <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.totalShouts == 0 ) {
                $scope.noMessageDiv = true;
                //$scope.noMessage = "No tip history available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.prevBtn = function () {
        next_count = next_count - 1;
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            shouthistorydata['page'] = pre_count;
            // console.log( JSON.stringify( shouthistorydata ) );
            var responsePromise = $http.post( shouthistoryURL, JSON.stringify( shouthistorydata ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.statsshouthistory = data.data.photologs;
                // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                // console.log($scope.statsshouthistory);
                $scope.totalShouts = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalShouts > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            shouthistorydata['page'] = next_count;
            // console.log( JSON.stringify( shouthistorydata ) );
            var responsePromise = $http.post( shouthistoryURL, JSON.stringify( shouthistorydata ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.recentChats = '';
                $scope.limit = data.data.per_page;
                $scope.statsshouthistory = data.data.photologs;
                // angular.forEach( $scope.statsmsghistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                $scope.totalShouts = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalShouts > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };
} )
//+++++++++++++++++++++++++++Create new shout page controller+++++++++++++++++++++

mainApp.controller("createnewshoutController", function( $scope, $http, $timeout, $state, $rootScope, $filter, CONSTANTS ) {
        $scope.previewImg = false;
        $scope.imgDelete = false;
        $scope.paginateSection = false;
	    $scope.prevDisabled = true;
	    $scope.nextDisabled = true;
	    $scope.noMessageDiv = false;
	    $(".previewDiv").hide();
        var pre_count = 1;
        var next_count = 1;
        $scope.currentCount = CONSTANTS.shoutsPerPage;
        var user_detail = localStorage.getItem("userDetail");
        var userData = JSON.parse(user_detail).data;
        var userId = userData.id;
        // console.log(userId);
        var myshoutsData = {};
        myshoutsData['responsetype'] = 'json';
        myshoutsData['page'] = 1;
        $scope.date = new Date();
        // console.log(JSON.stringify(myshoutsData));
        var responsePromise = $http.post( BASE_URL+"pro/myshouts",JSON.stringify( myshoutsData ) );
        responsePromise.success( function( data, status, headers, config ) {
             console.log(JSON.stringify(data));
             imgDimensn = [];
             $scope.fulldata = data.data;
             $scope.curr_page = data.data.current_page;
             $scope.limit = data.data.per_page;
             $scope.shoutTotal = data.data.total_count;
             $scope.shoutImages = data.data.myimages;
             $scope.Name = data.data.pro_name;
             $scope.currentCount = $scope.curr_page * $scope.limit;
             $scope.present_page_limit = $scope.curr_page;
             // if($scope.curr_page == '1'){
	            //  	$scope.limit = CONSTANTS.shoutsPerPage;
	            //  }else{
	            //  	console.log($scope.limit);
	            //  	$scope.limit = (CONSTANTS.shoutsPerPage) + $scope.limit;
	            //  	console.log($scope.limit);
	            //  }
             angular.forEach($scope.shoutImages , function(shoutImg){
                    // console.log(shoutImg);
                    // console.log(shoutImg.media_price);
                    // if(shoutImg.media_price == '0.00'){
                    //     shoutImg.media_price = 'Free';
                    // }
                    
                    shoutImg.small_image_url = IMAGE_URL+'users/'+shoutImg.pro_id+'/'+'big_'+shoutImg.media_name;
                    shoutImg.big_image_url = IMAGE_URL+'users/'+shoutImg.pro_id+'/'+'big_'+shoutImg.media_name_pixelated;
                    shoutImg.shoutId = shoutImg.id;
                    shoutImg.getFullDate = shoutImg.created_at.split(" ");
                    shoutImg.initial = $filter('date')(shoutImg.getFullDate[0],'longDate');

                    // console.log(shoutImg.getDate);
                    // console.log(shoutImg.initial);
                    // console.log(shoutImg.shoutId);
                });
             // if($scope.shoutTotal == 0){
             //    $scope.present_page_limit = 0;
             //    $scope.currentCount = 0;
             // }
            // $scope.currentCount = $scope.curr_page * $scope.shoutper_page;//total messages till current page
            if ( $scope.shoutTotal <= $scope.currentCount ) {
                $scope.currentCount = $scope.shoutTotal;
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.shoutTotal == 0 ) {
                $scope.present_page_limit = 0;
                $scope.currentCount = 0;
                $scope.noMessageDiv = true;
                $scope.noMessage = "No Shouts available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});

            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
        }
            
    } );
    responsePromise.error( function ( data, status, headers, config ) {
            //$('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    $scope.prevBtn = function () {
        imgDimensn = [];
        next_count = next_count - 1;
        pre_count = next_count;
        // console.log(pre_count);
        if( $scope.curr_page == 1 ) {
            // console.log($scope.curr_page);
            $scope.prevDisabled = true;
            $scope.present_page_limit = 1;
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
            $('#arrow').css ( {"opacity":"0.5" });

        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
        myshoutsData['page'] = pre_count;
        $scope.date = new Date();
        // console.log(JSON.stringify(myshoutsData));
        var responsePromise = $http.post( BASE_URL+"pro/myshouts",JSON.stringify( myshoutsData ) );
        responsePromise.success( function( data, status, headers, config ) {
             console.log(JSON.stringify(data));
             $('.phpdebugbar-openhandler-overlay').hide();
             $('.ui-loader').hide();
             imgDimensn = [];
             $scope.fulldata = data.data;
             $scope.curr_page = data.data.current_page;
             $scope.limit = data.data.per_page;
             $scope.shoutTotal = data.data.total_count;
             $scope.shoutImages = data.data.myimages;
             $scope.Name = data.data.pro_name;
             $scope.currentCount = $scope.curr_page * $scope.limit;
             $scope.present_page_limit = $scope.currentCount-3;
             angular.forEach($scope.shoutImages , function(shoutImg){
                    // console.log(shoutImg);
                    // if(shoutImg.media_price == '0.00'){
                    //     shoutImg.media_price = 'Free';
                    // }
                    shoutImg.small_image_url = IMAGE_URL+'users/'+shoutImg.pro_id+'/'+'big_'+shoutImg.media_name;
                    shoutImg.big_image_url = IMAGE_URL+'users/'+shoutImg.pro_id+'/'+'big_'+shoutImg.media_name_pixelated;
                    shoutImg.shoutId = shoutImg.id;
                    shoutImg.getFullDate = shoutImg.created_at.split(" ");
                    shoutImg.initial = $filter('date')(shoutImg.getFullDate[0],'longDate');

                    // console.log(shoutImg.getDate);
                    // console.log(shoutImg.initial);
                    // console.log(shoutImg.shoutId);
                });
                if( $scope.curr_page == 1 ) {
                    if( $scope.shoutTotal > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        imgDimensn = [];
        next_count = next_count + 1;
        $scope.currentCount = $scope.curr_page * $scope.limit;
        // console.log($scope.shoutTotal);
        // console.log($scope.limit);
        // console.log($scope.currentCount);
        if ( $scope.shoutTotal >= $scope.limit && $scope.currentCount < $scope.shoutTotal ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            myshoutsData['page'] = next_count;
	        $scope.date = new Date();
	        // console.log(JSON.stringify(myshoutsData));
	        var responsePromise = $http.post( BASE_URL+"pro/myshouts",JSON.stringify( myshoutsData ) );
	        responsePromise.success( function( data, status, headers, config ) {
	             console.log(JSON.stringify(data));
	             $('.phpdebugbar-openhandler-overlay').hide();
	             $('.ui-loader').hide();
	             imgDimensn = [];
	             $scope.fulldata = data.data;
	             $scope.curr_page = data.data.current_page;
	             $scope.limit = data.data.per_page;
	             $scope.shoutTotal = data.data.total_count;
	             $scope.shoutImages = data.data.myimages;
	             $scope.Name = data.data.pro_name;
	             $scope.currentCount = $scope.curr_page * $scope.limit;
	             $scope.present_page_limit = $scope.currentCount-3;
	             // if($scope.curr_page == '1'){
	             // 	$scope.limit = CONSTANTS.shoutsPerPage;
	             // }else{
	             // 	console.log($scope.limit);
	             // 	$scope.shoutlimit = (CONSTANTS.shoutsPerPage) + $scope.limit;
	             // 	$scope.limit = $scope.shoutlimit + $scope.limit;
	             // 	console.log($scope.limit);
	             // }
	             angular.forEach($scope.shoutImages , function(shoutImg){
	                    // console.log(shoutImg);
	                    // if(shoutImg.media_price == '0.00'){
                     //    shoutImg.media_price = 'Free';
                    	// }
	                    shoutImg.small_image_url = IMAGE_URL+'users/'+shoutImg.pro_id+'/'+'big_'+shoutImg.media_name;
	                    shoutImg.big_image_url = IMAGE_URL+'users/'+shoutImg.pro_id+'/'+'big_'+shoutImg.media_name_pixelated;
	                    shoutImg.shoutId = shoutImg.id;
	                    shoutImg.getFullDate = shoutImg.created_at.split(" ");
	                    shoutImg.initial = $filter('date')(shoutImg.getFullDate[0],'longDate');

	                    // console.log(shoutImg.getDate);
	                    // console.log(shoutImg.initial);
	                    // console.log(shoutImg.shoutId);
	            });

                if ( $scope.shoutTotal > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };

    $scope.closeHeaderPopup = function () {
        $('#overlay').hide();
        $(".previewDiv").hide();
        $("#overlay").removeClass('active');
        // $(".previewDiv").addClass('ng-hide');
        $scope.previewImg = false;
        $scope.imgDelete = false;
    };
    $('#overlay').click(function() {
        $('#overlay').hide();
        // $("#overlay").removeClass('active');
        // $('.deleteDiv').hide();
        $(".previewDiv").addClass('ng-hide');
        $(".previewDiv").hide();
        $scope.previewImg = false;
        // $scope.imgDelete = false;
    } );
    $scope.OpenImg = function(image,id){
        $('#overlay').show();
        // $("#overlay").addClass('active');
        $scope.previewImg = true;
        $(".previewDiv").removeClass('ng-hide');
        $(".previewDiv").show().delay(3000).fadeIn(2000);
        $scope.mainImageUrl = image;
        $scope.currImgId = id;
            // console.log(image);  
            // console.log($scope.currImgId);
        // // $scope.mainImageUrl = image;
    };
    $scope.DeleteImg = function (id) {
        $scope.previewImg = false;
        // $(".previewDiv").hide();
        // $('#overlay').hide();
        $scope.imgDelete = true;
        $scope.currImgId = id;
        // console.log($scope.currImgId);
    };
    $scope.deleteshout = function(id){
        $scope.currImgId = id;
        // alert($scope.currImgId);
        $scope.limit = CONSTANTS.shoutsPerPage;
        var deleteShoutData = {};
        deleteShoutData['responsetype'] = 'json';
        deleteShoutData['shout_id'] = id;
        // console.log(JSON.stringify(deleteShoutData));
        var responsePromise = $http.post( BASE_URL+"pro/deleteshout", JSON.stringify( deleteShoutData ) );
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            $('#'+id).hide();
            $('#overlay').hide();
            $('#shout_'+id).hide("medium", function(){
                $(this).remove();
            });
            $scope.imgDelete = false;
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    }
    $scope.createShout = function() {
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/sendPhotoShout"
            });

    };

})
//+++++++++++++++++++++++++++Send Photo Shout page controller+++++++++++++++++++++

mainApp.controller("sendPhotoShoutController", function( $scope, $http, $timeout, $state, $rootScope, constantData) {
    // console.log("come");
    $scope.takePhotoOpt = false;
    var flag = false;
    var checkflag = false;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.div_visible = true;
    $scope.div_visible1 = false;
    $scope.media_price =  {validity: true}
    $(".loaderId").hide();
    // $scope.shoutMediaList = [{ id:'', value:'Set a price'}];
    // angular.forEach(constantData.getshoutMediaData(), function(value, key){
    //     var item = { id:key, value:value };
    //     $scope.shoutMediaList.push(item);
    // });
    $scope.shoutRecepientsList = [{ id:'', value:'Choose recipients'}];
    angular.forEach(constantData.getshoutRecepientsList().sent_to_list, function(value, key){
        var item = { id:key, value:value };
        $scope.shoutRecepientsList.push(item);
    });
    
    $scope.uploadshoutPhoto = function () {
        $scope.takePhotoOpt = true;
        // $('.sendshoutbtn').css('background', 'none');
    };

    $scope.cancelPhoto = function () {
        $scope.takePhotoOpt = false;
        $scope.div_visible = true;
        $scope.div_visible1 = false;
    };

    function onPhotoDataSuccess( imageData ) {
        // console.log(imageData);
        var profileImage = document.getElementById( 'shout_image' );
        profileImage.style.display = 'block';
        profileImage.src = "data:image/jpeg;base64," + imageData;
        imageString = imageData;
        // console.log(imageString);
    }

    // A button will call this function
    $scope.takePhoto = function ( $event ) {
        $scope.takePhotoOpt = false;
        $scope.div_visible = false;
        $scope.div_visible1 = true;
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth:500,
            targetHeight: 500, allowEdit: true, correctOrientation: true,
        destinationType: Camera.DestinationType.DATA_URL });
    };

    //take photo from phone gallery
    $scope.photoLibrary = function ( ) {
        $scope.takePhotoOpt = false;
        $scope.div_visible = false;
        $scope.div_visible1 = true;
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth:1000,
            targetHeight: 1000, destinationType: destinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
    };

    // Called if something bad happens.
    function onFail(message) {
        // alert('Failed because: ' + message);
        $scope.takePhotoOpt = false;
        $scope.div_visible = true;
        $scope.div_visible1 = false;
    }
    // $scope.cancelUpload = function () {
    //     $scope.div_visible = true;
    //     $scope.div_visible1 = false;
    // };
    // console.log($('#media_price').val());
    // console.log($('#sent_to_list').val());
    $('#media_price').change(function(){
        // console.log($('#media_price').val());
        if($( "#media_price" ).val() == '' || $( "#media_price" ).val() > 99 || $( "#media_price" ).val() < 0){
            // console.log('checkprice'); 
          $(".okshoutspan1" ).css('display','none');  
          $(".numberedprice" ).css('display','block');
          $("#media_price" ).css('border','1px solid red'); 
        }else {
            // console.log($('#media_price').val());
          $(".numberedprice" ).css('background','none');
          $(".numberedprice" ).css('display','none');
          $(".okshoutspan1" ).css('display','block'); 
          $("#media_price" ).css('border','none'); 
          $("#media_error" ).html('');
        }
        
    });
    $('#sent_to_list').change(function(){
        if($('#sent_to_list').val() == '0'){
          $(".okshoutspan2" ).css('display','none');  
          $(".numberedprice1" ).css('display','block');
          $("#sent_to_list" ).css('border','1px solid red');
        }else{
          $(".numberedprice1" ).css('background','none');
          $(".numberedprice1" ).css('display','none');
          $(".okshoutspan2" ).css('display','block'); 
          $("#sent_to_list" ).css('border','none'); 
        }
    });
    $scope.sendShout = function() {
        // console.log("enter");
        // console.log($('#media_price').val());
        // console.log($('#sent_to_list').val());
        if($( "#media_price" ).val() == '' || $( "#media_price" ).val() > 99 || $( "#media_price" ).val() < 0){
            flag = false;
            // console.log("hello");
            $("#media_price" ).css('border','1px solid red');
            $("#media_error" ).html('Please enter media price between 0-99.');
        }else{
           $("#media_price" ).css('border','none'); 
           $("#media_error" ).html('');
        }
        // if( $('#media_price').val() == '0' ) {
        //      flag = false;
        //     // console.log("hello");
        //     $("#media_price" ).css('border','1px solid red');
            
        // }
        if( $('#sent_to_list').val() == '0' ) {
            // console.log('sent_to_list');
             flag = false;
            $("#sent_to_list" ).css('border','1px solid red');  
        }
        if( $( "#media_price" ).val() != '' && $( "#media_price" ).val() <= 99 && $( "#media_price" ).val() >= 0 && $('#sent_to_list').val() != '0' ){
            flag = true;
            // console.log(flag);
        }
        if( flag == true ) {
        	// console.log("check");
            submitShout();
           // console.log("success");
        }
    };
    function submitShout(){
        // console.log("imageString");
        var user_detail = localStorage.getItem("userDetail");
        var userData = JSON.parse(user_detail).data;
         //var submitShoutData = "image="+imageString+"&media_price="+$scope.media_price+"&sent_to_list="+$scope.sent_to_list+"&tagline="+$scope.tagline;
        if($scope.tagline === undefined){
        	$scope.tagline = "";
        }
        // console.log($scope.tagline);
        // $('.ui-loader').show();
        // $("#checkLoader").show();
        $scope.div_visible = false;
        $('#checkbtn').show();
        $('#checkform').hide();
        $('#checkform1').hide();
        $('#checkform2').hide();
        $('#checkform3').hide();
        // var submitShoutData ={};
        // submitShoutData['image'] = imageString;
        // // submitShoutData['userid'] = userData.id;
        // submitShoutData['media_price'] = $scope.media_price;
        // submitShoutData['sent_to_list'] = $scope.sent_to_list;
        // submitShoutData['tagline'] = $scope.tagline;
        // submitShoutData['responsetype'] = 'json';
        // $('.phpdebugbar-openhandler-overlay').show();
        var data = 'responsetype=json&image=' + imageString + '&media_price=' + $scope.media_price + '&sent_to_list='+ $scope.sent_to_list + '&tagline='+ $scope.tagline ;
        // console.log(data);
        // $('.ui-loader').show();
        //console.log( JSON.stringify( submitShoutData ) );
         $.ajax({
                url : BASE_URL+'pro/uploadshout_media',
                cache : false,
                async: true,
                data : data,
                type : 'POST',
                beforeSend: function(){
                	$('.phpdebugbar-openhandler-overlay').show();
			        $("#checkLoader").show();
			    },
                success : function(result) {
                    //alert(result);
                    $('.phpdebugbar-openhandler-overlay').hide();
                    // console.log( JSON.stringify( result ) );
                    //  // $('.ui-loader').hide();
                    // console.log(result.message);
                    var display_msg = result.message;
                    // console.log(display_msg);
                   	$("#checkLoader").hide();
     	        	$('#checkbtn').hide();
                    $('#checkLoader').replaceWith("<div style='color:green; margin-left: 14px; font-size: 15px; margin-bottom: -5px;margin-top:5px;'><p>" + display_msg + "</p></div>");
                },
                complete: function(){
                	$('.phpdebugbar-openhandler-overlay').hide();
				    $('#checkLoader').hide();
				},
                error : function(result) {
                	// console.log(result);
                	$("#checkLoader").hide();
                	$('.phpdebugbar-openhandler-overlay').hide();
                }
            });
     
     //    //var responsePromise = $http.post( "https://dev.ringhop.com/mobile/users/pro/uploadshout_media",data);
     //    responsePromise.success( function( data, status, headers, config ) {
     //        console.log( JSON.stringify( data ) );
     //         $(".loaderId").hide();
     //         $('#checkbtn').hide();
     //         // $(".loaderId").text("data.message").css('color','green').show();
             // <div style='color:green;'><p>'+ data.message + '</p></div>
     //         $('#checkLoader').replaceWith("<div style='color:green;'><p>'+ data.message + '</p></div>");
            
     //    } );
     //    responsePromise.error( function ( data, status, headers, config ) {
     //        console.log("error",data);
     //        $('.phpdebugbar-openhandler-overlay').hide();
     //        $('.ui-loader').hide();
     //        if(navigator.connection.type == Connection.NONE) {
     //            checkConnection();
     //        }
     //    } );
    }

})
//+++++++++++++++++++++++++++statsphotos page controller+++++++++++++++++++++

mainApp.controller( "statsphotoscontroller", function( $scope, $http, $timeout, $state, $filter, $rootScope ) {
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.limit = 4;
    var pre_count = 1;
    var next_count = 1;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.isPro = false;
    } else {
        $scope.isPro = true;
    }
    if( $scope.isPro == true ) {
        var statsphotoURL = BASE_URL+"pro/statsphotos";
    } else {
        var statsphotoURL = BASE_URL+"userstatsphotos";
    }
    // console.log(statsphotoURL);
    var statsphotos = {};
    statsphotos['responsetype'] = 'json';
    // console.log( JSON.stringify( statsphotos ) );
    var responsePromise = $http.post( statsphotoURL,JSON.stringify( statsphotos ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.statsphotohistory = data.data.photologs;
        // angular.forEach( $scope.statsphotohistory, function( history , filterKey ) {
        //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
        // } );
        $scope.limit = data.data.per_page;
        $scope.totalMessage = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                //$scope.noMessage = "No media purchases.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.prevBtn = function () {
        next_count = next_count - 1;
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            statsphotos['page'] = pre_count;
            // console.log( JSON.stringify( statsphotos ) );
            var responsePromise = $http.post( statsphotoURL,JSON.stringify( statsphotos ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.statsphotohistory = data.data.photologs;
                // angular.forEach( $scope.statsphotohistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            statsphotos['page'] = next_count;
            // console.log( JSON.stringify( statsphotos ) );
            var responsePromise = $http.post( statsphotoURL, JSON.stringify( statsphotos ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.recentChats = '';
                $scope.limit = data.data.per_page;
                $scope.statsphotohistory = data.data.photologs;
                // angular.forEach( $scope.statsphotohistory, function( history , filterKey ) {
                //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
                // } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };
} )


//+++++++++++++++++++++++++++userstats page controller+++++++++++++++++++++

mainApp.controller( "userstatscontroller", function( $scope, $http, $state, userstatsApi ) {
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.networkPopup = false;
    $scope.headervalue = "calls";
    $scope.limit = 4;
    var pre_count = 1;
    var next_count = 1;
    var user_detail = localStorage.getItem( "userDetail" );
    var userData = JSON.parse( user_detail ).data;
    var username = userData.displayname;
    // console.log(username);
    $scope.callSection = true;
    $scope.messageSection = false;
    $scope.photoSection = false;
    $scope.tipSection = false;

    $scope.callActiveClass = 'fullwidth_bluemsg';
    $scope.msgActiveClass = 'fullwidth_white';
    $scope.photoActiveClass = 'fullwidth_white';
    $scope.tipActiveClass = 'fullwidth_white';

    $scope.statsType = 'calls';
    $('#arrow').css ( {"opacity":"0.5" });
    $('.phpdebugbar-openhandler-overlay').show();
    $('.ui-loader').show();
    // $scope.closeNetworkPopup = function () {
    //     $('.phpdebugbar-openhandler-overlay').hide();
    //     $scope.networkPopup = false;
    //     window.plugins.nativepagetransitions.slide( {
    //         "direction": 'right',
    //         "href" : window.history.back()
    //     } );
    // };
    
    // $scope.goBackAgain = function(){
    //     $('.phpdebugbar-openhandler-overlay').hide();
    //     $scope.networkPopup = false;
    //     window.plugins.nativepagetransitions.slide( {
    //         "direction": 'right',
    //         "href" : window.history.back()
    //     } );
    // };
    userstatsApi.get('calls').then( function ( stats ) {
        $('.phpdebugbar-openhandler-overlay').hide();
        $('.ui-loader').hide();
        // console.log(stats);
        $scope.serverData = stats.data;
        // console.log(JSON.stringify($scope.serverData));
        $scope.userstatsData = $scope.serverData.data.calls.calllogs;
        // angular.forEach($scope.userstatsData, function(history , filterKey) {
        //     history.call_start = $scope.convertTZ( history.call_start, $scope.serverData.data.calls.timezone );
        // } );
        angular.forEach($scope.userstatsData, function(history , filterKey) {
            history.call_amount = parseFloat( history.call_amount).toFixed(2);
            history.call_duration = parseFloat( history.call_duration ).toFixed(2);
        } );
        $scope.limit = $scope.serverData.data.calls.per_page;
        $scope.totalMessage = $scope.serverData.data.calls.total_count;
        $scope.currentPage = $scope.serverData.data.calls.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $('#arrow').css ( {"opacity":"0.5" });
            $('#arrow1').css ( {"opacity":"1" });
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                $scope.noMessage = "No call history available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
    },function(error){
        $('.phpdebugbar-openhandler-overlay').hide();
        $('.ui-loader').hide();
        // $scope.networkPopup = true;
        console.log(error);
    } );

    $scope.calls = function () {
        pre_count = 1;
        next_count = 1;
        $scope.statsType = 'calls';
        $scope.noMessageDiv = false;
        $scope.callSection = true;
        $scope.photoSection = false;
        $scope.messageSection = false;
        $scope.tipSection = false;
        $scope.headervalue = "calls";
        $scope.callActiveClass = 'fullwidth_bluemsg';
        $scope.msgActiveClass = 'fullwidth_white';
        $scope.photoActiveClass = 'fullwidth_white';
        $scope.tipActiveClass = 'fullwidth_white';
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        userstatsApi.get('calls').then( function ( stats ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            $scope.serverData = stats.data;
            // console.log(JSON.stringify($scope.serverData));
            $scope.userstatsData = $scope.serverData.data.calls.calllogs;
            // angular.forEach($scope.userstatsData, function(history , filterKey) {
            //     history.call_start = $scope.convertTZ( history.call_start, $scope.serverData.data.calls.timezone );
            // } );
            angular.forEach($scope.userstatsData, function(history , filterKey) {
                history.call_amount = parseFloat( history.call_amount).toFixed(2);
                history.call_duration = parseFloat( history.call_duration ).toFixed(2);
            } );
            $scope.limit = $scope.serverData.data.calls.per_page;
            $scope.totalMessage = $scope.serverData.data.calls.total_count;
            $scope.currentPage = $scope.serverData.data.calls.current_page;
            $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
            if ( $scope.totalMessage <= $scope.currentCount ) {
                $scope.paginateSection = false;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $('#arrow').css ( {"opacity":"0.5" });
                $('#arrow1').css ( {"opacity":"1" });
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
                if( $scope.totalMessage == 0 ) {
                    $scope.noMessageDiv = true;
                    $scope.noMessage = "No call history available.";
                } else {
                    //alert(false);
                    $scope.noMessageDiv = false;
                }

            }  else {
                $scope.paginateSection = true;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
            }
        },function(error){
             $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            // $scope.networkPopup = true;
            console.log(error);
        } );
    };
    $scope.messages = function () {
        pre_count = 1;
        next_count = 1;
        $scope.statsType = 'messages';
        $scope.noMessageDiv = false;
        $scope.messageSection = true;
        $scope.callSection = false;
        $scope.photoSection = false;
        $scope.tipSection = false;
        $scope.headervalue = "messages";
        $scope.callActiveClass = 'fullwidth_white';
        $scope.msgActiveClass = 'fullwidth_bluemsg';
        $scope.photoActiveClass = 'fullwidth_white';
        $scope.tipActiveClass = 'fullwidth_white';
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        userstatsApi.get('messages').then( function ( stats ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            $scope.serverData = stats.data;
            // console.log(JSON.stringify($scope.serverData));
            $scope.userstatsData = $scope.serverData.data.messages.msglogs;
            angular.forEach($scope.userstatsData , function(historyKey){
                    // console.log(historyKey.displayname);
                    // $scope.isNew(lib);
                    if(historyKey.displayname == username ){
                        historyKey.displayname = "me";
                    }
                });
            $scope.limit = $scope.serverData.data.messages.per_page;
            $scope.totalMessage = $scope.serverData.data.messages.total_count;
            $scope.currentPage = $scope.serverData.data.messages.current_page;
            $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
            if ( $scope.totalMessage <= $scope.currentCount ) {
                $scope.paginateSection = false;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $('#arrow').css ( {"opacity":"0.5" });
                $('#arrow1').css ( {"opacity":"1" });
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
                if( $scope.totalMessage == 0 ) {
                    $scope.noMessageDiv = true;
                    $scope.noMessage = "No message history available.";
                } else {
                    //alert(false);
                    $scope.noMessageDiv = false;
                }

            }  else {
                $scope.paginateSection = true;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
            }
        },function(error){
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            // $scope.networkPopup = true;
            console.log(error);
        } );
    };
    $scope.photos = function () {
        pre_count = 1;
        next_count = 1;
        $scope.statsType = 'photos';
        $scope.noMessageDiv = false;
        $scope.photoSection = true;
        $scope.messageSection = false;
        $scope.callSection = false;
        $scope.tipSection = false;
        $scope.headervalue = "photos";
        $scope.callActiveClass = 'fullwidth_white';
        $scope.msgActiveClass = 'fullwidth_white';
        $scope.tipActiveClass = 'fullwidth_white';
        $scope.photoActiveClass = 'fullwidth_bluemsg';
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        userstatsApi.get('photos').then( function ( stats ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            $scope.serverData = stats.data;
            // console.log(JSON.stringify($scope.serverData));
            $scope.userstatsData = $scope.serverData.data.photos.photologs;
            // angular.forEach( $scope.userstatsData, function( history , filterKey ) {
            //     history.created_at = $scope.convertTZ( history.created_at, $scope.serverData.data.photos.timezone );
            // } );
            $scope.limit = $scope.serverData.data.photos.per_page;
            $scope.totalMessage = $scope.serverData.data.photos.total_count;
            $scope.currentPage = $scope.serverData.data.photos.current_page;
            $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
            if ( $scope.totalMessage <= $scope.currentCount ) {
                $scope.paginateSection = false;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $('#arrow').css ( {"opacity":"0.5" });
                $('#arrow1').css ( {"opacity":"1" });
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
                if( $scope.totalMessage == 0 ) {
                    $scope.noMessageDiv = true;
                    $scope.noMessage = "No media purchases.";
                } else {
                    //alert(false);
                    $scope.noMessageDiv = false;
                }

            }  else {
                $scope.paginateSection = true;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
            }
        },function(error){
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            // $scope.networkPopup = true;
            console.log(error);
        } );
    };
    $scope.tips = function () {
        pre_count = 1;
        next_count = 1;
        $scope.statsType = 'tip';
        $scope.noMessageDiv = false;
        $scope.photoSection = false;
        $scope.messageSection = false;
        $scope.callSection = false;
        $scope.tipSection = true;
        $scope.headervalue = "tip";
        $scope.callActiveClass = 'fullwidth_white';
        $scope.msgActiveClass = 'fullwidth_white';
        $scope.photoActiveClass = 'fullwidth_white';
        $scope.tipActiveClass = 'fullwidth_bluemsg';
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        userstatsApi.get('tip').then( function ( stats ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide()
            $scope.serverData = stats.data;
            // console.log(JSON.stringify($scope.serverData));
            $scope.userstatsData = $scope.serverData.data.tips.msglogs;
            //console.log(JSON.stringify($scope.userstatsData));
            $scope.limit = $scope.serverData.data.tips.per_page;
            $scope.totalMessage = $scope.serverData.data.tips.total_count;
            $scope.currentPage = $scope.serverData.data.tips.current_page;
            $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
            if ( $scope.totalMessage <= $scope.currentCount ) {
                $scope.paginateSection = false;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $('#arrow').css ( {"opacity":"0.5" });
                $('#arrow1').css ( {"opacity":"1" });
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
                if( $scope.totalMessage == 0 ) {
                    $scope.noMessageDiv = true;
                    $scope.noMessage = "No tip history available.";
                } else {
                    //alert(false);
                    $scope.noMessageDiv = false;
                }

            }  else {
                $scope.paginateSection = true;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
            }
        },function(error){
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            // $scope.networkPopup = true;
            console.log(error);
        } );
    };

    $scope.prevBtn = function (statsType) {
        //alert(statsType);
        $('#arrow1').css ( {"opacity":"1" });
        next_count = next_count - 1;
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.prevDisabled = true;
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            var statsData = {};
            statsData['responsetype'] = 'json';
            statsData['statstype'] = statsType;
            statsData['page'] = pre_count;
            // console.log( JSON.stringify( statsData ) );
            var responsePromise = $http.post( BASE_URL+"userstats", JSON.stringify( statsData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if( statsType == 'calls' ) {
                    $scope.limit = data.data.calls.per_page;
                    $scope.userstatsData = data.data.calls.calllogs;
                    // angular.forEach($scope.userstatsData, function(history, filterKey) {
                    //     history.call_start = $scope.convertTZ( history.call_start, data.data.calls.timezone );
                    // } );
                    angular.forEach($scope.userstatsData, function(history , filterKey) {
                        history.call_amount = parseFloat( history.call_amount).toFixed(2);
                        history.call_duration = parseFloat( history.call_duration ).toFixed(2);
                    } );
                    $scope.totalMessage = data.data.calls.total_count;
                    $scope.currentPage = data.data.calls.current_page;
                } else if( statsType == 'messages' ) {
                    $scope.limit = data.data.messages.per_page;
                    $scope.userstatsData = data.data.messages.msglogs;
                    // angular.forEach($scope.userstatsData, function(history, filterKey) {
                    //     history.created_at = $scope.convertTZ( history.created_at, data.data.messages.timezone );
                    // } );
                    $scope.totalMessage = data.data.messages.total_count;
                    $scope.currentPage = data.data.messages.current_page;
                    // console.log($scope.currentPage);
                } else if( statsType == 'photos' ){ 
                    $scope.limit = data.data.photos.per_page;
                    $scope.userstatsData = data.data.photos.photologs;
                    // angular.forEach( $scope.userstatsData, function( history , filterKey ) {
                    //     history.created_at = $scope.convertTZ( history.created_at, data.data.photos.timezone );
                    // } );
                    $scope.totalMessage = data.data.photos.total_count;
                    $scope.currentPage = data.data.photos.current_page;
                } else{
                    $scope.limit = data.data.tips.per_page;
                    $scope.userstatsData = data.data.tips.msglogs;
                    // angular.forEach( $scope.userstatsData, function( history , filterKey ) {
                    //     history.created_at = $scope.convertTZ( history.created_at, data.data.photos.timezone );
                    // } );
                    $scope.totalMessage = data.data.tips.total_count;
                    $scope.currentPage = data.data.tips.current_page; 
                }

                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function (statsType) {
        //alert(statsType);
        $('#arrow').css ( {"opacity":"1" });
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            var statsData = {};
            statsData['responsetype'] = 'json';
            statsData['statstype'] = statsType;
            statsData['page'] = next_count;
            // console.log( JSON.stringify( statsData ) );
            var responsePromise = $http.post( BASE_URL+"userstats", JSON.stringify( statsData ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));

                if( statsType == 'calls' ) {
                    $scope.limit = data.data.calls.per_page;
                    $scope.userstatsData = data.data.calls.calllogs;
                    // angular.forEach($scope.userstatsData, function(history, filterKey) {
                    //     history.call_start = $scope.convertTZ( history.call_start, data.data.calls.timezone );
                    // } );
                    angular.forEach($scope.userstatsData, function(history , filterKey) {
                        history.call_amount = parseFloat( history.call_amount ).toFixed(2);
                        history.call_duration = parseFloat( history.call_duration ).toFixed(2);
                    } );
                    $scope.totalMessage = data.data.calls.total_count;
                    $scope.currentPage = data.data.calls.current_page
                } else if( statsType == 'messages' ) {
                    $scope.limit = data.data.messages.per_page;
                    $scope.userstatsData = data.data.messages.msglogs;
                    angular.forEach($scope.userstatsData , function(historyKey){
                        // console.log(historyKey.displayname);
                            if(historyKey.displayname == username ){
                                historyKey.displayname = "me";
                            }
                });
                    $scope.totalMessage = data.data.messages.total_count;
                    $scope.currentPage = data.data.messages.current_page
                } else if( statsType == 'photos' ){ 
                    $scope.limit = data.data.photos.per_page;
                    $scope.userstatsData = data.data.photos.photologs;
                    // angular.forEach( $scope.userstatsData, function( history , filterKey ) {
                    //     history.created_at = $scope.convertTZ( history.created_at, data.data.photos.timezone );
                    // } );
                    $scope.totalMessage = data.data.photos.total_count;
                    $scope.currentPage = data.data.photos.current_page;
                } else{
                    $scope.limit = data.data.tips.per_page;
                    $scope.userstatsData = data.data.tips.msglogs;
                    // angular.forEach( $scope.userstatsData, function( history , filterKey ) {
                    //     history.created_at = $scope.convertTZ( history.created_at, data.data.photos.timezone );
                    // } );
                    $scope.totalMessage = data.data.tips.total_count;
                    $scope.currentPage = data.data.tips.current_page; 
                }

                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $('#arrow1').css ( {"opacity":"0.5" });
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $( '.phpdebugbar-openhandler-overlay' ).hide();
                $( '.ui-loader' ).hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $( "#nextBtn" ).css({ "background":"#dedede","border-color":"#dedede","color":"#acacac" });
            $scope.nextDisabled = true;
            $('#arrow1').css ( {"opacity":"0.5" });
        }
    };
} )


//+++++++++++++++++++++++++++userstats page controller+++++++++++++++++++++

mainApp.controller( "statssummarycontroller", function( $rootScope, $scope, $http, $state, $filter ) {
    $scope.noMessageDiv = false;
    $scope.date = new Date();
    var statsSummary = {};
    statsSummary['responsetype'] = 'json';
    // console.log( JSON.stringify( statsSummary ) );
    var responsePromise = $http.post( BASE_URL+"pro/statssummary",JSON.stringify( statsSummary ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.statssummhistory = data.data.periodsummary;
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

} )

//+++++++++++++++++++++++++++forwardingsettings page controller+++++++++++++++++++++

mainApp.controller( "forwardingsettingsCtrl", function( $rootScope, $scope, $http, $state ) {
    var statusData = {};
    statusData['responsetype'] = "json";
    var responsePromise = $http.get( BASE_URL+"pro/forwardingsettings?responsetype=json" , { headers: { 'Cache-Control' : 'no-cache' } });
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        $scope.forwardData = data.data;
        if( data.data.call_forwarding == 1 && data.data.take_referred_calls == 0 ) {
            $scope.call_forwarding = true;
            $scope.take_referred_calls = false;
        }
        if( data.data.call_forwarding == 0 && data.data.take_referred_calls == 1 ) {
            $scope.call_forwarding = false;
            $scope.take_referred_calls = true;
        }
        if( data.data.call_forwarding == 1 && data.data.take_referred_calls == 1 ) {
            $scope.call_forwarding = true;
            $scope.take_referred_calls = true;
        }
        if( data.data.call_forwarding == 0 && data.data.take_referred_calls == 0 ) {
            $scope.call_forwarding = false;
            $scope.take_referred_calls = false;
        }

    } );

    $scope.updateStatus = function ( $event ) {
        //alert($scope.take_referred_calls);
        statusData = {};
        statusData[ 'responsetype' ] = "json";
        $( '#updateCheck' ).addClass('errorStatus').removeClass('succesStatus');
        if( $scope.call_forwarding == true ) {
            statusData[ 'call_forwarding' ] = 1;
        }
        if( $scope.take_referred_calls == true ) {
            statusData[ 'take_referred_calls' ] = 1;
        }
        $( '.phpdebugbar-openhandler-overlay' ).show();
        $( '.ui-loader' ).show();
        // console.log(JSON.stringify(statusData));
        var responsePromise = $http.post( BASE_URL+"pro/forwardingsettings",JSON.stringify( statusData ) );
        responsePromise.success( function( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if( data.message == 'user not logged in' ) {
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/login"
                } );
            }
            if( data.status == 'success' ){
                $( '#updateCheck' ).removeClass('errorStatus').addClass('succesStatus');
            } else {
                $( '#updateCheck' ).addClass('errorStatus').removeClass('succesStatus');
            }
            $( '.phpdebugbar-openhandler-overlay' ).hide();
            $( '.ui-loader' ).hide();
            $( '#updateCheck' ).html( data.message );
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            $( '.phpdebugbar-openhandler-overlay' ).hide();
            $('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );
    };

} )

//+++++++++++++++++++++++++++trialsettings page controller+++++++++++++++++++++

mainApp.controller( "trialsettingsCtrl", function( $rootScope, $scope, $http, $state ) {
    var responsePromise = $http.get( BASE_URL+"pro/trialsettings?responsetype=json", { headers: { 'Cache-Control' : 'no-cache' } } );
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));

        $scope.proSetData = data.data;
        if( $scope.proSetData.do_trials == 1 ) {
            $scope.trial_calls = true;
        } else {
            $scope.trial_calls = false;
        }
        if( $scope.proSetData.do_smstrials == 1 ) {
            $scope.trial_sms = true;
        } else {
            $scope.trial_sms = false;
        }
    } );

    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.acceptTrial = function () {
        $( '#updateCheck' ).addClass('errorStatus').removeClass('succesStatus');
        var acceptData = {};
        if( $scope.trial_calls == true ){
            acceptData['trial_calls'] = 1;
        }
        if( $scope.trial_sms == true ) {
            acceptData['trial_sms'] = 1;
        }
        acceptData['responsetype'] = 'json';
        // console.log(JSON.stringify(acceptData));
        $('.ui-loader').show();
        var responsePromise = $http.post(BASE_URL+"pro/trialsettings",JSON.stringify( acceptData ) );
        responsePromise.success( function( data, status, headers, config ) {
            $('.ui-loader').hide();
            console.log(JSON.stringify(data));
            if( data.status == 'success' ){
                $( '#updateCheck' ).removeClass('errorStatus').addClass('succesStatus');
            } else {
                $( '#updateCheck' ).addClass('errorStatus').removeClass('succesStatus');
            }
            $scope.status = data.message;
         } );
        responsePromise.error( function ( data, status, headers, config ) {
            $('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };

} )

//+++++++++++++++++++++++++++factory for userstats page controller+++++++++++++++++++++
mainApp.factory( 'userstatsApi', function( $http ) {
    return {
        get : function( statstype ) {
            var userstats = {};
            userstats['responsetype'] = 'json';
            userstats['statstype'] = statstype;
            return $http.post( BASE_URL+"userstats",JSON.stringify( userstats ) )
            .then( function( data, status, headers, config ) {
                return data;
            });
        }
    }
} );

