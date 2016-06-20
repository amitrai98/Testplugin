
var mainApp = angular.module( "ringMeNowMain", [ 'ngAnimate', 'ui.router', 'angular-carousel'] );
var BASE_URL = "https://dev.ringhop.com/mobile/users/";
var SITE_URL = "https://dev.ringhop.com/";
var IMAGE_URL = "https://dev.ringhop.com/images/";
// var BASE_URL = "https://ringhop.com/mobile/users/";
// var SITE_URL = "https://ringhop.com/";
// var IMAGE_URL = "https://ringhop.com/images/";
var imageString ='';
var deviceOS = '';
var deviceVersion = '';
var uuid = ''
var deviceType = '';
var device_token = '';
var imageStringVerify = '';
var forgotFlag = 0;
var loadCount = 0;
var subscribeArr = [];
/*
# bootstrapping app with angular.bootstrap rather than ng-app="app name"...
# this will help in loading angular js pages after device ready..
*/

'use strict';
//alert(3)


document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
    // alert(2)
    //console.log('ready');
    angular.bootstrap($('body'), ['ringMeNowMain']);
    window.analytics.startTrackerWithId('UA-64731097-2')
    window.analytics.trackView('ringhop')
    //alert('angular device ready');
    //navigator.splashscreen.show();
    //document.addEventListener("backbutton", onBackKeyPress, false);
    // StatusBar.overlaysWebView( false );
    // StatusBar.backgroundColorByName( "black" );
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    device = window.device;
    //alert(device);
     //var element = 'Device Name: ' + device.name + '<br />' + 'Device PhoneGap: ' + device.phonegap + '<br />' + 'Device Platform: ' + device.platform + '<br />' + 'Device UUID: ' + device.uuid + '<br />' + 'Device Version: ' + device.version + '<br />';
    deviceOS = device.platform;
    deviceVersion = device.version;
    uuid = device.uuid;
    deviceType = device.platform;
    
    

    var push = PushNotification.init({
        android: {
            senderID: "788156349635"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    push.on('registration', function(data) {
        
        device_token = data.registrationId;
        
    });

    push.on('notification', function(data) {
        console.log(JSON.stringify(data));
        //alert("1>"+data.additionalData.event);
        // console.log(data.additionalData.session_id);
        //alert("hello");
         console.log(data.additionalData.event);
         localStorage.setItem("event_name",data.additionalData.event);
         // var rememberme_check = localStorage.getItem( "rememberme_data" );
         var user_detail_check = localStorage.getItem( "userDetail" );
            if( user_detail_check ) {
                console.log("start video");
                if ( data.additionalData.session_id ){
            // var data = '';
            //alert("hiu");
                console.log("else remember");
                var callerdata = JSON.stringify({'u_name': data.additionalData.originator_displayname, 'sessionId': data.additionalData.session_id , 'sessionToken': data.additionalData.video_token, 'image':data.additionalData.profile_image, 'receiverid': data.additionalData.receiver_id, 'userId':data.additionalData.originator_id, 'CallId':data.additionalData.call_id})
                localStorage.setItem("caller_Data",callerdata);
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/videocallAccept"
                } ); 
         }
        else if(data.additionalData.event == "user_rejected") {
            //alert("rejected");
            // alert(JSON.stringify(data.additionalData));
            console.log(JSON.stringify(data.additionalData));
            // hello.endCalling();
            //localStorage.setItem("event_name",data.additionalData.event);
            var missedUser_name = localStorage.getItem("caller_Data");
            var missedUser_name1 = JSON.parse( missedUser_name ).u_name;
            console.log(missedUser_name1);
            var user_detail = localStorage.getItem( "userDetail" );
            var userid = JSON.parse( user_detail ).data.id;
            var Id = data.additionalData.receiver_id;
            var Id1 = data.additionalData.originator_id;
            // alert(userid);
            hello.endCalling(" ");
            console.log(Id);
            if( userid == Id){
                console.log("id");
                    
                    window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/videocallMissed/"+missedUser_name1+'/'+Id1
                } ); 
             }
            else{
                console.log("else id");
                    window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/recentcalls"
                } );
            } 
        }
        else if (data.additionalData.event == "pro_rejected") {
            console.log("pro reject");
            hello.endCalling("proRejectsCall");
        }
        else if(data.additionalData.event == "ended") {
            // console.log('reject call');
            var user_detail = localStorage.getItem( "userDetail" );
            var userid = JSON.parse( user_detail ).data.id;
            // console.log(userid);
            var Id = data.additionalData.receiver_id;
            var Id1 = data.additionalData.originator_id;
            // console.log(userid);
            // console.log(Id);
            var costOfCall1 = data.additionalData.call_rev_share;
            var durationOfCall1 = data.additionalData.call_duration;
            var showNamedata1 = data.additionalData.originator_displayname;
            var IdReceiver1 = data.additionalData.originator_id;
            var identity = 'receiver';
            var pg  = '';
            if( userid == Id){
               window.plugins.nativepagetransitions.slide( {
                    "direction": 'right',
                    "href" : '#/home/videocallEnd/'+costOfCall1+'/'+durationOfCall1+'/'+showNamedata1+'/'+IdReceiver1+'/'+identity+'/'+pg
                } );
            }else{
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/reply"+Id
                } );
            } 
        }
        else{
            //navigator.notification.alert(event.alert);
            console.log('foreground>>>',data.additionalData.foreground)
            if(data.additionalData.foreground === false){
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/messages"
                } );
            }
           
            
        }  
    } else {
            console.log("login");
            // window.plugins.nativepagetransitions.slide({
            //     "href" : "#/home/login"
            // });
        }
        

        if ( data.sound )
        {
            var snd = new Media( data.sound );
            snd.play();
        }

        // if ( event.badge )
        // {
        //     pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        // }

    });

    push.on('error', function(e) {
        // console.log(e.message); 
    });
}

// var receivedEvent = function(event) {
//     alert(1)
//     console.log('Start event received, bootstrapping application setup.');
//     angular.bootstrap($('body'), ['ringMeNowMain']);
// };

/**
 * Notification from IOS APN
 * @param e
 */
// function onNotificationAPN (event) {
//     console.log(JSON.stringify(event));
//     console.log(event.session_id);
//     //alert(JSON.stringify(event));
//     console.log(event.event);
//     if ( event.session_id )
//     {
//         // var data = '';
//         var callerdata = JSON.stringify({'u_name': event.originator_displayname, 'sessionId': event.session_id , 'sessionToken': event.video_token, 'image':event.profile_image, 'receiverid': event.receiver_id, 'userId':event.originator_id, 'CallId':event.call_id})
//         localStorage.setItem("caller_Data",callerdata);
//         // console.log(data);
//         // $state.go('home.videoCalling',{receive_data:data})
//         window.plugins.nativepagetransitions.slide( {
//             "href" : "#/home/videocallAccept"
//         } ); 
//     } 
//     else if(event.event == "rejected") {
//         console.log('reject call');
//         hello.endCalling();
//         var user_detail = localStorage.getItem( "userDetail" );
//         var userid = JSON.parse( user_detail ).data.id;
//         var Id = event.receiver_id;
//         var Id1 = event.originator_id;
//         console.log(userid);
//         console.log(Id);
//         if( userid == Id){
//                    window.plugins.nativepagetransitions.slide( {
//                     "href" : "#/home/affter_login"
//             } ); 
//         }else{
//                 window.plugins.nativepagetransitions.slide( {
//                 "href" : "#/home/reply"+Id
//             } );
//         } 
//     }
//     else{
//         //navigator.notification.alert(event.alert);
//         window.plugins.nativepagetransitions.slide( {
//             "href" : "#/home/messages"
//         } );
//     }  



    
//     // if( event.status1 ){
//     //     window.plugins.nativepagetransitions.slide( {
//     //         "href" : "#/home/affter_login"
//     //     } );
//     // }
//     // if ( event.alert )
//     // {
//     //     //navigator.notification.alert(event.alert);
//     //     window.plugins.nativepagetransitions.slide( {
//     //         "href" : "#/home/messages"
//     //     } );
//     // }

//     if ( event.sound )
//     {
//         var snd = new Media( event.sound );
//         snd.play();
//     }

//     // if ( event.badge )
//     // {
//     //     pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
//     // }
// }

// var onNotificationGCM = function(e) {
//     // Check which event:
//     switch(e.event)
//     {
//         case 'registered' :
//         {
//             device_token = e.regid;
//             break;
//         }
//         case 'message':
//         {
//             // this is the actual push notification. its format depends on the data model from the push server
//             var message = e.message;
//             window.plugins.nativepagetransitions.slide({
//                 "href" : "#/home/messages"
//             });
//             break;
//         }
//     }
// };

function checkConnection() {
    var networkState = navigator.connection.type;
    loadCount = loadCount+1;
    var states = {};
    states[Connection.NONE]     = 'No network connection';
    if( loadCount == 1 ) {
        alert( states[networkState] );
    }
}
function back( direction, href ) {
    window.plugins.nativepagetransitions.slide({
        "direction": direction,
        "href" : href
    });
}

//+++++++++++++++++++++++++++App run settings+++++++++++++++++++++

mainApp.run( function( $rootScope, $window, $state, $location, $filter, $http ) {
    //alert('run');
    //new CordovaInit();
    //console.log('run');
    var responsePromise = $http.get(BASE_URL+'getappconstants?responsetype=json');
        responsePromise.success( function( data, status, headers, config ) {
        // console.log(data);
        localStorage.setItem( "constantDataStore", JSON.stringify(data) );    
    });
        responsePromise.error( function ( data, status, headers, config ) {
        // console.log( JSON.stringify( data ) );
     });

    // var factory = {            
    //     query: function () {
    //         return $http.get(BASE_URL+'getappconstants?responsetype=json');
    //     }
    // }
    // return factory; 
    $rootScope.IMAGE_URL = IMAGE_URL;
    $.cloudinary.config( { cloud_name: 'nobetek-llc', api_key: '247749274532722' } );
    $rootScope.date = new Date();
    $rootScope.forward = function( direction, href ) {
        window.plugins.nativepagetransitions.slide( {
            "direction": direction,
            "href" : href
        } );
    };
    $rootScope.convertTZ = function(old_date, zone) {
        var d = old_date;
        $rootScope.tzArray = {
            'MIT':-39600,
            'HAST':-36000,
            'AKST':-32400,
            'AKDT':-28800,
            'PST':-28800,
            'PDT':-25200,
            'MST':-25200,
            'MDT':-21600,
            'CST':-21600,
            'CDT':-18000,
            'EST':-14400,
            'EDT':-14400,
            'PRT':-14400,
            'CNT':-12600,
            'AGT':-10800,
            'BET':-10800,
            'CAT':-3600,
            'UTC':0,
            'GMT':0,
            'WET':0,
            'WEST':3600,
            'CET':3600,
            'CEST':7200,
            'EET':7200,
            'EEST':10800,
            'ART':7200,
            'EAT':10800,
            'MET':12600,
            'NET':14400,
            'PLT':18000,
            'IST':19800,
            'BST':21600,
            'ICT':25200,
            'CTT':28800,
            'SGT':28800,
            'AWST':28800,
            'JST':32400,
            'ACST':34200,
            'AEST':36000,
            'SST':39600,
            'NZST':43200,
            'NZDT':46800
        };
        angular.forEach($rootScope.tzArray, function(filterObj , filterKey) {
            if(filterKey == zone) {
                var d1 = d.split(' ')[0].split('-');
                var d2 = d.split(' ')[1].split(':');
                var a = new Date(d1[0],d1[1]-1,d1[2],d2[0],d2[1],d2[2],0);
                var changedTime = a.getTime()+(filterObj*1000);
                $rootScope.newTime = $filter('date')(changedTime,'yyyy-MM-dd HH:mm:ss');
            }
        } );
        return $rootScope.newTime;
    };
} );

//+++++++++++++++++++++++++++home page controller+++++++++++++++++++++

mainApp.controller( "loginBtnController", function( $scope, $http, $state, $location ) {
    $scope.devicehight = $( window ).height();
    $scope.login = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/login"
        });
    };
    $scope.register = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/register"
        });
    };
} )

//+++++++++++++++++++++++++++Login page controller+++++++++++++++++++++

mainApp.controller( "loginformController", function( $scope, $http, $location, $state, $rootScope ) {
    var flagMenu = 0;
    $scope.forgot_msg = false;
    $scope.reg_msg = false;
    $scope.logout_msg = false;
    $scope.deactivate_msg = false;
    $rootScope.previousState;
    $rootScope.currentState;
    $rootScope.$on('$stateChangeSuccess', function( ev, to, toParams, from, fromParams ) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        if( $rootScope.previousState == 'home.forgotpasswordnext' && $rootScope.currentState == 'home.login' ) {
            forgotFlag = 1;
        } else {
            forgotFlag = 0;
        }
    });


    if( forgotFlag == 1 ) {
        $scope.forgot_msg = true;
    }
    //console.log($rootScope.previousState , $rootScope.currentState);

    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
    var height = $( window ).height();
    $('.wrapper, #sidebar-wrapper').css( 'min-height', height );
    if($rootScope.previousState == 'home.deactivation' && $rootScope.currentState == 'home.login'){
        // console.log("deactivated");
        $scope.deactivate_msg = true;
    }
    if( ($rootScope.previousState == 'home.settings' && $rootScope.currentState == 'home.login') || ($rootScope.previousState == 'home' && $rootScope.currentState == 'home.login')) {
        $scope.logout_msg = true;
        var rememberme_local = localStorage.getItem( "rememberme_data" );
        if( rememberme_local ) {
            var remember_data = JSON.parse( rememberme_local );
            $scope.email = remember_data.email;
            // $scope.password = remember_data.password;
        } else {
            $scope.email="";
            $scope.password="";
        }
    }
    $scope.remember = true;
    var flag = false;
    $scope.signIn = function ( $event ) {
        var inputEmail = $( '#inputEmail3' ).val();
        var inputPasswd = $( '#inputPassword3' ).val();
        var numberPattern = /^[A-Za-z0-9]{6,}$/;
        // $( "#inputEmail3" ).keydown(function (e)   {
        //         var withoutSpace = $( '#inputEmail3' ).val().replace(/ /g,"");
        //         var withoutSpaceLength = withoutSpace.length;
        //         if(e.keyCode == 8){
        //             $( '#error_text' ).html('');
        //             // console.log("enter");
        //                 if( $( '#inputEmail3' ).val().length <= 5 && $( '#inputEmail3' ).val().length > 0 ) {
        //                     // console.log($( '#inputEmail3' ).val().length);
        //                     flag = false;
        //                     $( '#email_status' ).html( 'Please enter at least 5 characters.' );
        //                 }
        //                 if( $( '#inputEmail3' ).val().length == 1 ){
        //                     // console.log($( '#inputEmail3' ).val().length);
        //                     $( '#email_status' ).html( 'This field is required.' );
        //                     flag = false;
        //                     } 
        //             }else{
        //                 $( '#error_text' ).html('');
        //                 if( $( '#inputEmail3' ).val().length <= 5 && $( '#inputEmail3' ).val().length > 0 ) {
        //                 flag = false;
        //                 $( '#email_status' ).html( 'Please enter at least 5 characters.' );
        //             }
        //             if( $( '#inputEmail3' ).val().length >= 4 ) {
        //                 // console.log("check");
        //                     $( '#email_status' ).html('');
        //                     $( '#email_label' ).removeAttr('style');
        //                     flag = 1;
        //             }
        //             if( $('#inputEmail3').val().indexOf(' ') >= 0 ) {
        //                 if( withoutSpaceLength == 0 ) {
        //                     $( '#email_status' ).html( 'This field is required.' );
        //                     $( '#email_label' ).css( 'color', 'red' );
        //                 }
        //             }

        //         }
        //     });
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
        $( '#inputEmail3' ).keyup( function (e) {
            // console.log($('#inputEmail3').val().length);
            if( $( '#email_status' ).html() == 'This field is required.' ) {
                $( '#email_status' ).html('Please enter at least 6 characters.');
            }
            // if( $( '#email_status' ).html() == 'Please enter at least 6 characters.' ) {
            //     if( $('#inputEmail3').val().match( numberPattern ) ) {
            //         $( '#email_status' ).html('');
            //         $( '#email_label' ).removeAttr(  'style' );
            //         flag = 1;
            //     }
            // }
            if( $( '#inputEmail3' ).val().length >= 6 ) {
                if( $('#inputEmail3').val().match( numberPattern ) ) {
                    $( '#email_status' ).html('');
                    $( '#email_label' ).removeAttr(  'style' );
                    flag = 1;
                }
            }
            else {
                if($('#inputEmail3').val().length == 0){
                   $( '#email_status' ).html('This field is required.'); 
                }else{
                    $( '#email_status' ).html('Please enter at least 6 characters.');
                    $( '#email_label' ).css('color','red');
                }
                
            }
            // if($('#inputEmail3').val().length == 0){
            //     console.log($('#inputEmail3').val().length);
            //    $( '#email_status' ).html('This field is required.'); 
            // }
        } );
        $( "#inputPassword3" ).keydown(function (e)   {
                var withoutSpace = $( '#inputEmail3' ).val().replace(/ /g,"");
                var withoutSpaceLength = withoutSpace.length;
                if(e.keyCode == 8){
                    $( '#error_text' ).html('');
                    // console.log("enter");
                    if( $( '#inputPassword3' ).val().length <= 6 && $( '#inputPassword3' ).val().length > 0 ) {
                        flag = false;
                        $( '#passwd_status' ).html( 'Please enter at least 6 characters.' );
                    }
                    if( $( '#inputPassword3' ).val().length == 1 ){
                        // console.log("flag");
                        $( '#passwd_status' ).html( 'This field is required.' );
                        flag = false;
                        } 
                    }else{
                        $( '#error_text' ).html('');
                        // console.log("enter correct code");
                            if( $( '#inputPassword3' ).val().length <= 6 && $( '#inputPassword3' ).val().length > 0 ) {
                            flag = false;
                            $( '#passwd_status' ).html( 'Please enter at least 6 characters.' );
                        }
                        if( $( '#inputPassword3' ).val().length >= 5 ) {
                            // console.log("check");
                                $( '#passwd_status' ).html('');
                                $( '#pwd_label' ).removeAttr('style');
                                flag = 2;
                        }
                        if( $('#inputPassword3').val().indexOf(' ') >= 0 ) {
                            if( withoutSpaceLength == 0 ) {
                                $( '#passwd_status' ).html( 'This field is required.' );
                                $( '#pwd_label' ).css( 'color', 'red' );
                            }
                        }
                }
            });

        // $( '#inputEmail3' ).keyup( function (e) {
        //     if( $( '#email_status' ).html() == 'This field is required.' ) {
        //         $( '#email_status' ).html('Please enter at least 6 characters.');
        //     }
        //     if( $( '#email_status' ).html() == 'Please enter at least 6 characters.' ) {
        //         if( $('#inputEmail3').val().match( numberPattern ) ) {
        //             $( '#email_status' ).html('');
        //             $( '#email_label' ).removeAttr(  'style' );
        //             flag = 1;
        //         }
        //     }
        // } );
        // $( '#inputPassword3' ).keyup( function (e) {
        //     if( $( '#passwd_status' ).html() == 'This field is required.' ) {
        //         $( '#passwd_status' ).html('Please enter at least 6 characters.');
        //     }
        //     if( $( '#passwd_status' ).html() == 'Please enter at least 6 characters.' ) {
        //         if( $('#inputPassword3').val().length >= 6 ) {
        //             $( '#passwd_status' ).html( '' );
        //             $( '#pwd_label' ).removeAttr( 'style' );
        //             flag = 2;
        //         }
        //     }
        // } );
        if(flag == 1 && flag == 2) {
            flag = true;
        }
        if( $('#inputPassword3').val().length < 6 ) {
            $( '#passwd_status' ).html('Please enter at least 6 characters.');
            $( '#pwd_label' ).css('color','red');
            flag = false;
        }
        if( $( '#email_status' ).html() == '' && $( '#passwd_status' ).html() == '' ) {
            flag = true;
        }
        
        if( inputEmail == '' && inputPasswd == '' ) {
            flag = false;
            $( '#email_status' ).html( 'This field is required.' );
            $( '#passwd_status' ).html( 'This field is required.' );
            $( '#email_label' ).css( 'color', 'red' );
            $( '#pwd_label' ).css( 'color', 'red' );
        } else {
            if( inputEmail == '' && inputPasswd != '' ) {
                flag = false;
                $( '#email_status' ).html( 'This field is required.' );
                $( '#email_label' ).css( 'color', 'red' );
                if( inputPasswd.length < 5 ) {
                    $( '#passwd_status' ).html( 'Please enter at least 5 characters.' );
                    $( '#pwd_label' ).css( 'color','red' );
                }
            } else if( inputEmail != '' && inputPasswd == '' ) {
                flag = false;
                $( '#passwd_status' ).html( 'This field is required.' );
                $( '#pwd_label' ).css('color','red');
                if( !inputEmail.match( numberPattern ) ) {
                    $( '#email_status' ).html( 'Please enter at least 6 characters.' );
                    $( '#email_label' ).css( 'color', 'red' );
                }
            } else {
                flag = true;
            }
            if( flag == true ) {
                // var getLogoutData = {};
                // getLogoutData['responsetype'] = "json";
                // $('.phpdebugbar-openhandler-overlay').show();
                // $('.ui-loader').show();
                // console.log(JSON.stringify(getLogoutData));
                // var responsePromise = $http.post( BASE_URL+"logout",JSON.stringify(getLogoutData));
                // responsePromise.success( function( data, status, headers, config ) {
                //     $('.phpdebugbar-openhandler-overlay').hide();
                //     $('.ui-loader').hide();
                //     console.log(JSON.stringify(data));
                //     if( data.status == 'success' ) {
                //         localStorage.removeItem("userDetail");
                //         localStorage.removeItem("rememberme_flag");
                        var getLoginData = {};
                        getLoginData[ 'email' ] = $scope.email;
                        getLoginData[ 'password' ] = $scope.password;
                        getLoginData[ 'responsetype' ] = "json";
                        getLoginData[ 'signin_remember' ] = $scope.remember;
                        // console.log(JSON.stringify(getLoginData));
                        $( '.phpdebugbar-openhandler-overlay' ).show();
                        $( '.ui-loader' ).show();
                        var responsePromise = $http.post( BASE_URL+"signin",JSON.stringify(getLoginData));
                        responsePromise.success( function( data, status, headers, config ) {
                            // console.log(JSON.stringify(data));
                            $( '.phpdebugbar-openhandler-overlay' ).hide();
                            $( '.ui-loader' ).hide();
                            // if(data.status == 'success'){
                            //     if(data.data.status == 'inactive'){
                            //         console.log("inactive user");
                            //        window.plugins.nativepagetransitions.slide( {
                            //         "href" : "#/home/inactiveUser"
                            //      } ); 
                            //     }else{
                            //        console.log("active and pending user");
                            //         window.plugins.nativepagetransitions.slide( {
                            //             "href" : "#/home/affter_login"
                            //         } );
                            //         localStorage.setItem( "userDetail", JSON.stringify( data ) );
                            //         localStorage.setItem( "profileData", data.profile_image );
                            //         if( $scope.remember == true ) {
                            //             localStorage.setItem( "rememberme_data", JSON.stringify( getLoginData ) );
                            //             localStorage.setItem( "rememberme_flag", true );
                            //         }
                            //     }
                            // }else {
                            //     $scope.logout_msg = false;
                            //     $scope.forgot_msg = false;
                            //     $scope.deactivate_msg = false;
                            //     $( '#error_text' ).html( data.message );
                            // }
                            if( data.status == 'success') {
                                // console.log("active and pending user");
                                window.plugins.nativepagetransitions.slide( {
                                    "href" : "#/home/affter_login"
                                } );
                                localStorage.setItem( "userDetail", JSON.stringify( data ) );
                                localStorage.setItem( "profileData", data.profile_image );
                                if( $scope.remember == true ) {
                                    localStorage.setItem( "rememberme_data", JSON.stringify( getLoginData ) );
                                    localStorage.setItem( "rememberme_flag", true );
                                }
                            }
                            else {
                                if(data.message == 'Invalid username or password.'){
                                    $( '#error_text' ).html( data.message );
                                }else{
                                // console.log("inactive user");
                                   window.plugins.nativepagetransitions.slide( {
                                    "href" : "#/home/inactiveUser"
                                 } );
                                 } 
                                $scope.logout_msg = false;
                                $scope.forgot_msg = false;
                                $scope.deactivate_msg = false;
                                // $( '#error_text' ).html( data.message );
                            }
                             
                        });
                        responsePromise.error( function ( data, status, headers, config ) {
                            $( '.phpdebugbar-openhandler-overlay' ).hide();
                            $( '.ui-loader' ).hide();
                            if( navigator.connection.type == Connection.NONE ) {
                                checkConnection();
                            }
                            console.log( JSON.stringify( data ) );
                        });

                //     }
                // } );


                
            }
        }
    };
    $scope.register = function () {
        window.plugins.nativepagetransitions.slide( {
            "href" : "#/home/register"
        } );
    };
    $scope.forgotPasswd = function () {
        window.plugins.nativepagetransitions.slide( {
            "href" : "#/home/forgotpassword"
        } );
    };

    /*$scope.checkHome = function () {
        alert('hi');
        if( $rootScope.currentState == 'home.login' && $rootScope.previousState == 'home.settings' ) {
            window.plugins.nativepagetransitions.slide({
                "href" : '#/home'
            });
        }
        $scope.$apply();
    };*/

} )
//+++++++++++++++++++++++++++Inactive user controller+++++++++++++++++++++

mainApp.controller( "inactiveUsercontroller", function( constantData, $scope, $http, $timeout, $state ) {
    //console.log(constantData.getCountryData());
    var flag = false;
    var flagMenu = 0;
    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
    var height = $( window ).height();
    $( '.wrapper, #sidebar-wrapper' ).css( 'min-height', height );
})
//+++++++++++++++++++++++++++Register page controller+++++++++++++++++++++

mainApp.controller( "regFormController", function( constantData, $scope, $http, $timeout, $state ) {
    //console.log(constantData.getCountryData());
    $scope.showFirstNo = true;
    $scope.showotherCountry = false;
    var flag = false;
    var flagMenu = 0;
    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };

    var height = $( window ).height();
    $( '.wrapper, #sidebar-wrapper' ).css( 'min-height', height );
    $scope.countries = [
        { id:'1', value:'+1 United States' },
        { id:'1', value:'+1 Canada' },
        { id:'0', value:'Others(International)' }
    ];
    $scope.countryCode = $scope.countries[0];
    $scope.otherCountryList = [{ id:'', value:'Choose Country'}];
    angular.forEach(constantData.getOtherCountryData(), function(value, key){
        var item = { id:key, value:value };
        $scope.otherCountryList.push(item);
    });
  var checkChange = false;   
$scope.othercountrychng = function(item){
     checkChange = true;
     var phoneNumber = $( '#reg_phone_number' ).val();
     var regPattern = /^\d+$/;
     $scope.accessItem = item;
     // console.log( $scope.accessItem);
     // console.log($( '#reg_phone_number' ).val());
     if($scope.accessItem == '1'){
        //console.log("first");
        $scope.showFirstNo = true;
        $scope.showotherCountry = false;
    }else{
        $scope.showFirstNo = false;
        $scope.showotherCountry = true;
    }
        $( ".form-control2" ).keyup(function (e)   {
                //console.log($('#reg_phone_number').val().length);
                //console.log(e);
                var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
                var withoutSpaceLength = withoutSpace.length;

            if(  $( '#reg_phone_number' ).val().length == 0 ) {
                flag = false;
                $( '#phone_status' ).html( 'Phone number is required.' );
            }
            if( $( '#reg_phone_number' ).val().length < 8 && $( '#reg_phone_number' ).val().length >0 ) {
                flag = false;
                if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                    $( '#phone_status' ).html( 'Please enter at least 8 characters.' );
                } else {
                    $( '#phone_status' ).html( 'Please enter a valid number.' );
                }
            }
            
            // if( $( '#reg_phone_number' ).val().length > 8 ) {
            //     flag = false;
            //     if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
            //         $( '#phone_status' ).html( 'Please enter no more than 8 characters.' );
            //     } else {
            //         $( '#phone_status' ).html( 'Please enter a valid number.' );
            //     }
            // }
            if( $( '#reg_phone_number' ).val().length == 8 ) {
                if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                    $( '#phone_status' ).html('');
                    $( '#reg_phone_label' ).removeAttr('style');
                    flag = true;
                }  else {
                    $( '#phone_status' ).html( 'Please enter a valid number.' );
                    $( '#reg_phone_label' ).css( 'color', 'red' );
                    flag = false;
                }
            }
            if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
                if( withoutSpaceLength == 0 ) {
                    $( '#phone_status' ).html( 'Phone number is required.' );
                    $( '#reg_phone_label' ).css( 'color', 'red' );
                }
            }
});
        // $( ".form-control2" ).keydown(function (e)   {
        //         //console.log($('#reg_phone_number').val().length);
        //         //console.log(e);
        //         var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
        //         var withoutSpaceLength = withoutSpace.length;
        //         if(e.keyCode == 8){
        //             // console.log("enter");
        //             if( $( '#reg_phone_number' ).val().length <= 8 && $( '#reg_phone_number' ).val().length > 0 ) {
        //                 flag = false;
        //                 $( '#phone_status' ).html( 'Please enter at least 8 characters.' );
        //                 $( '#reg_phone_label' ).css( 'color', 'red' );
        //             }
        //             if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
        //                 // console.log("flag");
        //                 $( '#phone_status' ).html( 'Phone number is required.' );
        //                 $( '#reg_phone_label' ).css( 'color', 'red' );
        //                 flag = false;
        //                 } 
        //             }
        //         if(e.keyCode > 47 && e.keyCode < 58){
        //             // console.log("enter correct code");
        //                 if( $( '#reg_phone_number' ).val().length <= 8 && $( '#reg_phone_number' ).val().length > 0 ) {
        //                 flag = false;
        //                 $( '#phone_status' ).html( 'Please enter at least 8 characters.' );
        //                 $( '#reg_phone_label' ).css( 'color', 'red' );
        //             }
        //             if( $( '#reg_phone_number' ).val().length >= 7 ) {
        //                 //console.log("check");
        //                     $( '#phone_status' ).html('');
        //                     $( '#reg_phone_label' ).removeAttr('style');
        //                     flag = true;
        //             }
        //                 if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
        //                     if( withoutSpaceLength == 0 ) {
        //                         $( '#phone_status' ).html( 'Phone number is required.' );
        //                         $( '#reg_phone_label' ).css( 'color', 'red' );
        //                     }
        //                 }
                
        //         }else{
        //             if(e.keyCode == 8){
        //                 if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
        //                     //console.log("flag");
        //                     $( '#phone_status' ).html( 'Phone number is required.' );
        //                     $( '#reg_phone_label' ).css( 'color', 'red' );
        //                     flag = false;
        //                     } 
        //             }else{
        //                 $( '#phone_status' ).html( 'Please enter a valid number.' );
        //                 $( '#reg_phone_label' ).css( 'color', 'red' );
        //                 flag = false;
        //             }
        //         }
        //     });
            if( $( '#phone_status' ).html() == '' ) {
                flag = true;
            }
            $( ".form-control1" ).keyup(function (e)   {
                var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
                var withoutSpaceLength = withoutSpace.length;

            if(  $( '#reg_phone_number' ).val().length == 0 ) {
                flag = false;
                $( '#phone_status' ).html( 'Phone number is required.' );
            }
            if( $( '#reg_phone_number' ).val().length < 10 && $( '#reg_phone_number' ).val().length >0 ) {
                flag = false;
                if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                    $( '#phone_status' ).html( 'Please enter at least 10 characters.' );
                } else {
                    $( '#phone_status' ).html( 'Please enter a valid number.' );
                }
            }
            
            if( $( '#reg_phone_number' ).val().length > 10 ) {
                flag = false;
                if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                    $( '#phone_status' ).html( 'Please enter no more than 10 characters.' );
                } else {
                    $( '#phone_status' ).html( 'Please enter a valid number.' );
                }
            }
            if( $( '#reg_phone_number' ).val().length == 10 ) {
                if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                    $( '#phone_status' ).html('');
                    $( '#reg_phone_label' ).removeAttr('style');
                    flag = true;
                }  else {
                    $( '#phone_status' ).html( 'Please enter a valid number.' );
                    $( '#reg_phone_label' ).css( 'color', 'red' );
                    flag = false;
                }
            }
            if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
                if( withoutSpaceLength == 0 ) {
                    $( '#phone_status' ).html( 'Phone number is required.' );
                    $( '#reg_phone_label' ).css( 'color', 'red' );
                }
            }
    });

            // $( ".form-control1" ).keydown(function (e)   {
            //     //console.log($('#reg_phone_number').val().length);
            //     // console.log(e);
            //     var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
            //     var withoutSpaceLength = withoutSpace.length;
            //     if(e.keyCode == 8){
            //         // console.log("enter1");
            //         if( $( '#reg_phone_number' ).val().length <= 10 && $( '#reg_phone_number' ).val().length > 0 ) {
            //             flag = false;
            //             $( '#phone_status' ).html( 'Please enter at least 10 characters.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //         }
            //         if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
            //             //console.log("flag");
            //             $( '#phone_status' ).html( 'Phone number is required.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //             flag = false;
            //             } 
            //         if( $( '#reg_phone_number' ).val().length == 11 ) {
            //             //console.log("check");
            //                 $( '#phone_status' ).html('');
            //                 $( '#reg_phone_label' ).removeAttr('style');
            //                 flag = true;
            //         }
            //     }
            //     if(e.keyCode > 47 && e.keyCode < 58){
            //         // console.log(checkChange);
            //         // console.log( $scope.accessItem);
            //         // console.log("enter correct code1");
            //             if( $( '#reg_phone_number' ).val().length <= 10 && $( '#reg_phone_number' ).val().length > 0 ) {
            //             flag = false;
            //             $( '#phone_status' ).html( 'Please enter at least 10 characters.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //         }
            //         if( $( '#reg_phone_number' ).val().length > 9 ) {
            //             flag = false;
            //             $( '#phone_status' ).html( 'Please enter no more than 10 characters.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //         } 
            //         if( $( '#reg_phone_number' ).val().length == 9 ) {
            //             //console.log("check");
            //                 $( '#phone_status' ).html('');
            //                 $( '#reg_phone_label' ).removeAttr('style');
            //                 flag = true;
            //         }
            //             if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
            //                 if( withoutSpaceLength == 0 ) {
            //                     $( '#phone_status' ).html( 'Phone number is required.' );
            //                     $( '#reg_phone_label' ).css( 'color', 'red' );
            //                 }
            //             }
                
            //     }else{
            //         if(e.keyCode == 8){
            //             if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
            //                 //console.log("flag");
            //                 $( '#phone_status' ).html( 'Phone number is required.' );
            //                 $( '#reg_phone_label' ).css( 'color', 'red' );
            //                 flag = false;
            //                 } 
            //         }else{
            //             $( '#phone_status' ).html( 'Please enter a valid number.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //             flag = false;
            //         }
            //     }
            // });

            if( $( '#phone_status' ).html() == '' ) {
                flag = true;
            }
        
    };
    $scope.registerAction = function ( $event ) {
        var cc = $scope.countryCode;
        // console.log(cc.id);
        //console.log($scope.accessItem);
        $( '#stateSelect_status' ).html( '' );
        $( '#phone_status' ).html( '' );
        $( '#server_status' ).html( '' );
        var regPattern = /^\d+$/;
        var countrySelect = $( '#country_code' ).val();
        var phoneNumber = $( '#reg_phone_number' ).val();
        localStorage.setItem( "regUserPhone", phoneNumber );
        // console.log(checkChange);
        if(cc.id == '1'){
            // console.log("hi not 0");
                $scope.showFirstNo = true;
                $scope.showotherCountry = false;
            }else{
                // console.log("hi 0")
               $scope.showFirstNo = false; 
               $scope.showotherCountry = true;
            }
            $( ".form-control2" ).keyup(function (e)   {
                //console.log($('#reg_phone_number').val().length);
                //console.log(e);
                var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
                var withoutSpaceLength = withoutSpace.length;

                    if(  $( '#reg_phone_number' ).val().length == 0 ) {
                        flag = false;
                        $( '#phone_status' ).html( 'Phone number is required.' );
                    }
                    if( $( '#reg_phone_number' ).val().length < 8 && $( '#reg_phone_number' ).val().length >0 ) {
                        flag = false;
                        if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                            $( '#phone_status' ).html( 'Please enter at least 8 characters.' );
                        } else {
                            $( '#phone_status' ).html( 'Please enter a valid number.' );
                        }
                    }
                if( $( '#reg_phone_number' ).val().length == 8 ) {
                                        if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                                            $( '#phone_status' ).html('');
                                            $( '#reg_phone_label' ).removeAttr('style');
                                            flag = true;
                                        }  else {
                                            $( '#phone_status' ).html( 'Please enter a valid number.' );
                                            $( '#reg_phone_label' ).css( 'color', 'red' );
                                            flag = false;
                                        }
                                    }
                                    if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
                                        if( withoutSpaceLength == 0 ) {
                                            $( '#phone_status' ).html( 'Phone number is required.' );
                                            $( '#reg_phone_label' ).css( 'color', 'red' );
                                        }
                                    }

                });
            //     $( ".form-control2" ).keydown(function (e)   {
            //     //console.log($('#reg_phone_number').val().length);
            //     //console.log(e);
            //     var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
            //     var withoutSpaceLength = withoutSpace.length;
            //     if(e.keyCode == 8){
            //         // console.log("enter");
            //         if( $( '#reg_phone_number' ).val().length <= 8 && $( '#reg_phone_number' ).val().length > 0 ) {
            //             flag = false;
            //             $( '#phone_status' ).html( 'Please enter at least 8 characters.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //         }
            //         if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
            //             // console.log("flag");
            //             $( '#phone_status' ).html( 'Phone number is required.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //             flag = false;
            //             } 
            //         }
            //     if(e.keyCode > 47 && e.keyCode < 58){
            //         // console.log("enter correct code");
            //             if( $( '#reg_phone_number' ).val().length <= 8 && $( '#reg_phone_number' ).val().length > 0 ) {
            //             flag = false;
            //             $( '#phone_status' ).html( 'Please enter at least 8 characters.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //         }
            //         if( $( '#reg_phone_number' ).val().length >= 7 ) {
            //             //console.log("check");
            //                 $( '#phone_status' ).html('');
            //                 $( '#reg_phone_label' ).removeAttr('style');
            //                 flag = true;
            //         }
            //             if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
            //                 if( withoutSpaceLength == 0 ) {
            //                     $( '#phone_status' ).html( 'Phone number is required.' );
            //                     $( '#reg_phone_label' ).css( 'color', 'red' );
            //                 }
            //             }
                
            //     }else{
            //         if(e.keyCode == 8){
            //             if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
            //                 //console.log("flag");
            //                 $( '#phone_status' ).html( 'Phone number is required.' );
            //                 $( '#reg_phone_label' ).css( 'color', 'red' );
            //                 flag = false;
            //                 } 
            //         }else{
            //             $( '#phone_status' ).html( 'Please enter a valid number.' );
            //             $( '#reg_phone_label' ).css( 'color', 'red' );
            //             flag = false;
            //         }
            //     }
            // });

                    if( $( '#phone_status' ).html() == '' ) {
                        flag = true;
                    }

                    // console.log("third");
                    // console.log($scope.accessItem);
                $( ".form-control1" ).keyup(function (e)   {
                //console.log($('#reg_phone_number').val().length);
                //console.log(e);
                var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
                var withoutSpaceLength = withoutSpace.length;

                if(  $( '#reg_phone_number' ).val().length == 0 ) {
                    flag = false;
                    $( '#phone_status' ).html( 'Phone number is required.' );
                }
                if( $( '#reg_phone_number' ).val().length < 10 && $( '#reg_phone_number' ).val().length >0 ) {
                    flag = false;
                    if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                        $( '#phone_status' ).html( 'Please enter at least 10 characters.' );
                    } else {
                        $( '#phone_status' ).html( 'Please enter a valid number.' );
                    }
                }

                if( $( '#reg_phone_number' ).val().length > 10 ) {
                    flag = false;
                    if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                        $( '#phone_status' ).html( 'Please enter no more than 10 characters.' );
                    } else {
                        $( '#phone_status' ).html( 'Please enter a valid number.' );
                    }
                }
                if( $( '#reg_phone_number' ).val().length == 10 ) {
                    if( $( '#reg_phone_number' ).val().match( regPattern ) ) {
                        $( '#phone_status' ).html('');
                        $( '#reg_phone_label' ).removeAttr('style');
                        flag = true;
                    }  else {
                        $( '#phone_status' ).html( 'Please enter a valid number.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                        flag = false;
                    }
                }
                if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
                    if( withoutSpaceLength == 0 ) {
                        $( '#phone_status' ).html( 'Phone number is required.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                    }
                }
            });
                    // $( ".form-control1" ).keydown(function (e)   {
                    //     //console.log($('#reg_phone_number').val().length);
                    //     //console.log(e);
                    //     var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
                    //     var withoutSpaceLength = withoutSpace.length;
                    //     if(e.keyCode == 8){
                    //         // console.log("enter2");
                    //         if( $( '#reg_phone_number' ).val().length <= 10 && $( '#reg_phone_number' ).val().length > 0 ) {
                    //             flag = false;
                    //             $( '#phone_status' ).html( 'Please enter at least 10 characters.' );
                    //             $( '#reg_phone_label' ).css( 'color', 'red' );
                    //         }
                    //         if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
                    //             // console.log("flag");
                    //             $( '#phone_status' ).html( 'Phone number is required.' );
                    //             $( '#reg_phone_label' ).css( 'color', 'red' );
                    //             flag = false;
                    //             } 
                    //             if( $( '#reg_phone_number' ).val().length == 11 ) {
                    //             // console.log("check1");
                    //                 $( '#phone_status' ).html('');
                    //                 $( '#reg_phone_label' ).removeAttr('style');
                    //                 flag = true;
                    //         }
                    //         }
                    //     if(e.keyCode > 47 && e.keyCode < 58){
                    //         // console.log(checkChange);
                    //         // console.log("enter correct code2");
                    //             if( $( '#reg_phone_number' ).val().length <= 10 && $( '#reg_phone_number' ).val().length > 0 ) {
                    //             flag = false;
                    //             $( '#phone_status' ).html( 'Please enter at least 10 characters.' );
                    //             $( '#reg_phone_label' ).css( 'color', 'red' );
                    //         }
                    //         if( $( '#reg_phone_number' ).val().length > 9 ) {
                    //             flag = false;
                    //             $( '#phone_status' ).html( 'Please enter no more than 10 characters.' );
                    //             $( '#reg_phone_label' ).css( 'color', 'red' );
                    //         } 
                    //         if( $( '#reg_phone_number' ).val().length == 9 ) {
                    //             //console.log("check");
                    //                 $( '#phone_status' ).html('');
                    //                 $( '#reg_phone_label' ).removeAttr('style');
                    //                 flag = true;
                    //         }
                    //             if( $('#reg_phone_number').val().indexOf(' ') >= 0 ) {
                    //                 if( withoutSpaceLength == 0 ) {
                    //                     $( '#phone_status' ).html( 'Phone number is required.' );
                    //                     $( '#reg_phone_label' ).css( 'color', 'red' );
                    //                 }
                    //             }
                        
                    //     }else{
                    //         if(e.keyCode == 8){
                    //             if( $( '#reg_phone_number' ).val().length == 1 || $( '#reg_phone_number' ).val().length == 0 ){
                    //                 //console.log("flag");
                    //                 $( '#phone_status' ).html( 'Phone number is required.' );
                    //                 $( '#reg_phone_label' ).css( 'color', 'red' );
                    //                 flag = false;
                    //                 } 
                    //         }else{
                    //             $( '#phone_status' ).html( 'Please enter a valid number.' );
                    //             $( '#reg_phone_label' ).css( 'color', 'red' );
                    //             flag = false;
                    //         }
                    //     }
                    // });

                    if( $( '#phone_status' ).html() == '' ) {
                        flag = true;
                    }
            if( phoneNumber != '') {
                var withoutSpace = $( '#reg_phone_number' ).val().replace(/ /g,"");
                var withoutSpaceLength = withoutSpace.length;
                if(cc.id == '0'){
                $scope.showotherCountry = true;
                  if( phoneNumber.length < 8 ) {
                    flag = false;
                    if( phoneNumber.match( regPattern ) ) {
                        $( '#phone_status' ).html( 'Please enter at least 8 characters.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                    } else {
                        if(  withoutSpaceLength == 0 ) {
                            flag = false;
                            $( '#phone_status' ).html('Phone number is required.');
                            $( '#reg_phone_label' ).css( 'color', 'red' );
                        } else {
                            $( '#phone_status' ).html( 'Please enter a valid number.' );
                            $( '#reg_phone_label' ).css( 'color', 'red' );
                        }
                    }

                }
                // if( phoneNumber.length > 10 ) {
                //     flag = false;
                //     if( phoneNumber.match( regPattern ) ) {
                //         $( '#phone_status' ).html( 'Please enter no more than 10 characters.' );
                //         $( '#reg_phone_label' ).css( 'color', 'red' );
                //     } else {
                //         $( '#phone_status' ).html( 'Please enter a valid number.' );
                //         $( '#reg_phone_label' ).css( 'color', 'red' );
                //     }
                // }

                if( phoneNumber.length >= 8 ) {
                    if( phoneNumber.match( regPattern ) ) {
                        $( '#phone_status' ).html( '' );
                        $( '#reg_phone_label' ).removeAttr( 'style' );
                        flag = true;
                    } else {
                        $( '#phone_status' ).html( 'Please enter a valid number.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                        flag = false;
                    }
                }  
            }else{
                $scope.showotherCountry = false;
                if( phoneNumber.length < 10 ) {
                    flag = false;
                    if( phoneNumber.match( regPattern ) ) {
                        $( '#phone_status' ).html( 'Please enter at least 10 characters.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                    } else {
                        if(  withoutSpaceLength == 0 ) {
                            flag = false;
                            $( '#phone_status' ).html('Phone number is required.');
                            $( '#reg_phone_label' ).css( 'color', 'red' );
                        } else {
                            $( '#phone_status' ).html( 'Please enter a valid number.' );
                            $( '#reg_phone_label' ).css( 'color', 'red' );
                        }
                    }

                }
                if( phoneNumber.length > 10 ) {
                    flag = false;
                    if( phoneNumber.match( regPattern ) ) {
                        $( '#phone_status' ).html( 'Please enter no more than 10 characters.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                    } else {
                        $( '#phone_status' ).html( 'Please enter a valid number.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                    }
                }

                if( phoneNumber.length == 10 ) {
                    if( phoneNumber.match( regPattern ) ) {
                        $( '#phone_status' ).html( '' );
                        $( '#reg_phone_label' ).removeAttr( 'style' );
                        flag = true;
                    } else {
                        $( '#phone_status' ).html( 'Please enter a valid number.' );
                        $( '#reg_phone_label' ).css( 'color', 'red' );
                        flag = false;
                    }
                }
            }
            if( flag == true ) {
                var country_id = $scope.countryCode.id;
                var other_country_id = $scope.otherCountryCode;
                var getRegData = {};
                getRegData[ 'country_code' ] = country_id;
                getRegData[ 'other_country_code' ] = other_country_id;
                getRegData[ 'responsetype' ] = "json";
                getRegData[ 'phonenumber' ] = $scope.phoneNumber;
                // console.log(JSON.stringify(getRegData));
                $( '.phpdebugbar-openhandler-overlay' ).show();
                $( '.ui-loader' ).show();
                var responsePromise = $http.post( BASE_URL+"register",JSON.stringify( getRegData ) );
                responsePromise.success( function( data, status, headers, config ) {
                    // console.log(JSON.stringify(data));
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( data.status == 'success' ) {
                        responseHtml = data.message;
                        window.plugins.nativepagetransitions.slide( {
                            "href" : "#/home/pinConfirm"
                        } );
                    } else {
                        if( data.message == 'Phone already registered.' ) {
                            window.plugins.nativepagetransitions.slide( {
                                "href" : "#/home/pinsent"
                            } );
                        } else {
                            $( '#server_status' ).html( data.message );
                        }
                    }
                });
                responsePromise.error( function ( data, status, headers, config ) {
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( navigator.connection.type == Connection.NONE ) {
                        checkConnection();
                    }
                    console.log( JSON.stringify( data ) );
                });
            }
        } else {
            $( '#phone_status' ).html( 'Phone number is required.' );
            $( '#reg_phone_label' ).css( 'color', 'red' );
        }

    };
    $scope.loginUser = function()
    {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/login"
        });
    };
} )

//+++++++++++++++++++++++++++Forgot Password page controller+++++++++++++++++++++

mainApp.controller( "forgotpwdController", function( $scope, $http, $timeout, $state ) {
    var flag = false;
    var flagMenu = 0;
    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
    var height = $( window ).height();
    $( '.wrapper, #sidebar-wrapper' ).css( 'min-height', height );
    $scope.forgotPwdAction = function ( $event ) {
        $( '#number_error' ).html( '' );
        $( '#forgot_status' ).html( '' );
        var pattern = /^[A-Za-z0-9]{10,}$/;
        var mobile_number = $( '#inputEmail5' ).val();
        var withoutSpace = $( '#inputEmail5' ).val().replace(/ /g,"");
        var withoutSpaceLength = withoutSpace.length;
        $( '#inputEmail5' ).keyup( function (e) {
            if( $( '#number_error' ).html() == 'Phone number is required.' ) {
                $( '#number_error' ).html('Please enter at least 10 characters.');
            }
            // if( $( '#number_error' ).html() == 'Please enter at least 10 characters.' ) {
            //     if( $('#inputEmail5').val().match( pattern ) ) {
            //         $( '#number_error' ).html('');
            //         $( '#phone_label' ).removeAttr('style');
            //         flag = true;
            //     }
            // }
            if( $( '#inputEmail5' ).val().length >= 10 ) {
                if( $('#inputEmail5').val().match( pattern ) ) {
                    $( '#number_error' ).html('');
                    $( '#phone_label' ).removeAttr('style');
                    flag = true;
                }
            }else {
                if($('#inputEmail5').val().length == 0){
                   $( '#number_error' ).html('This field is required.'); 
                }else{
                    $( '#number_error' ).html('Please enter at least 10 characters.');
                    $( '#phone_label' ).css('color','red');
                }
                
            }
            // if( $('#inputEmail5').val().length == 0 ) {
            //     // if( withoutSpaceLength == 0 ) {
            //         $( '#number_error' ).html( 'Phone number is required.' );
            //         $( '#phone_label' ).css( 'color', 'red' );
            //     //}
            // }
        } );
        // $( "#inputEmail5" ).keydown(function (e)   {
        //         // console.log($('#inputEmail5').val().length);
        //         // console.log(e);
        //         var withoutSpace = $( '#inputEmail5' ).val().replace(/ /g,"");
        //         var withoutSpaceLength = withoutSpace.length;
        //         if(e.keyCode == 8){
        //             // console.log("enter");
        //             if( $( '#inputEmail5' ).val().length <= 10 && $( '#inputEmail5' ).val().length > 0 ) {
        //                 flag = false;
        //                 $( '#number_error' ).html( 'Please enter at least 10 characters.' );
        //             }
        //             if( $( '#inputEmail5' ).val().length == 1 ){
        //                 // console.log("flag");
        //                 $( '#number_error' ).html( 'This field is required.' );
        //                 flag = false;
        //                 } 
        //             }
        //         if(e.keyCode > 47 && e.keyCode < 58){
        //             // console.log("enter correct code");
        //                 if( $( '#inputEmail5' ).val().length <= 10 && $( '#inputEmail5' ).val().length > 0 ) {
        //                 flag = false;
        //                 $( '#number_error' ).html( 'Please enter at least 10 characters.' );
        //             }
        //             if( $( '#inputEmail5' ).val().length >= 9 ) {
        //                 // console.log("check");
        //                     $( '#number_error' ).html('');
        //                     $( '#phone_label' ).removeAttr('style');
        //                     flag = true;
        //             }
        //                 if( $('#inputEmail5').val().indexOf(' ') >= 0 ) {
        //                     if( withoutSpaceLength == 0 ) {
        //                         $( '#number_error' ).html( 'This field is required.' );
        //                         $( '#phone_label' ).css( 'color', 'red' );
        //                     }
        //                 }
                
        //         }else{
        //             if(e.keyCode == 8){
        //                 if( $( '#inputEmail5' ).val().length == 1 ){
        //                     // console.log("flag");
        //                     $( '#number_error' ).html( 'This field is required.' );
        //                     flag = false;
        //                     } 
        //             }else{
        //                 $( '#number_error' ).html( 'Please enter a valid number.' );
        //                 flag = false;
        //             }
        //         }
        //     });
        // $( '#inputEmail5' ).keydown( function (e) {
        //     if( $( '#number_error' ).html() == 'This field is required.' ) {
        //         $( '#number_error' ).html('Please enter at least 10 characters.');
        //     }
        //     if( $( '#number_error' ).html() == 'Please enter at least 10 characters.' ) {
        //         if( $('#inputEmail5').val().match( pattern ) ) {
        //             $( '#number_error' ).html('');
        //             $( '#phone_label' ).removeAttr('style');
        //             flag = true;
        //         }
        //     }
        // } );
        if($( '#number_error' ).html() == '') {
            flag = true;
        }
        if( mobile_number != '' ) {
            if( mobile_number.length < 10 ) {
                flag = false;
                $( '#number_error' ).html( 'Please enter at least 10 characters.' );
                $( '#phone_label' ).css( 'color', 'red' );
            }
            if( flag == true ) {
                localStorage.setItem( "UserPhone_FG", mobile_number );
                var getForgotData = {};
                getForgotData[ 'phonenumber' ] = $scope.mobileNumber;
                getForgotData[ 'responsetype' ] = "json";
                //console.log(JSON.stringify( getForgotData ));
                $( '.phpdebugbar-openhandler-overlay' ).show();
                $( '.ui-loader' ).show();
                var responsePromise = $http.post( BASE_URL+"forgotpassword",JSON.stringify( getForgotData ) );
                responsePromise.success( function( data, status, headers, config ) {
                    //console.log(JSON.stringify( data ));
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( data.status == 'success' ) {
                        window.plugins.nativepagetransitions.slide( {
                            "href" : "#/home/pinConfirmForgot"
                        } );
                    } else {
                        $( '#forgot_status' ).html( data.message );
                    }
                } );
                responsePromise.error( function ( data, status, headers, config ) {
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( navigator.connection.type == Connection.NONE ) {
                        checkConnection();
                    }
                    console.log( JSON.stringify( data ) );
                } );
            }
        } else {
            $( '#number_error' ).html( 'Phone number is required.' );
            $( '#phone_label' ).css( 'color', 'red' );
        }
    };
} )

//+++++++++++++++++++++++++++Reset Password after forgot page controller+++++++++++++++++++++

mainApp.controller( "resetpwdController", function( $scope, $http, $timeout, $state, $rootScope ) {
    var flag = true;

    $scope.resetForgotPwd = function( $event ) {
        $( '#reset_status' ).html( '' );
        var password = $scope.password;
        var confirm_passwd = $scope.confirmpassword;
        $( '#passwd' ).keydown(function ( e ) {
            if(e.keyCode == 8){
                $( '#reset_status' ).html('');
                // console.log("enter");
                    if( $('#passwd').val().length <= 6 && $('#passwd').val().length > 0 ) {
                        // console.log($( '#passwd' ).val().length);
                        flag = false;
                        $( '#passwd_error' ).html( 'Please enter at least 6 characters.' );
                    }
                    if( $('#passwd').val().length == 1 ){
                        // console.log($( '#passwd' ).val().length);
                        $( '#passwd_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    $( '#reset_status' ).html('');
                    if( $('#passwd').val().length <= 6 && $('#passwd').val().length > 0 ) {
                    flag = false;
                    $( '#passwd_error' ).html( 'Please enter at least 6 characters.' );
                }
                if( $('#passwd').val().length >= 5) {
                    // console.log("check");
                        $( '#passwd_error' ).html('');
                        $( '#passwd_label' ).removeAttr('style');
                        flag = 1;
                }
            }
            // if( $( '#passwd_error' ).html() == 'This field is required.' ) {
            //     $( '#passwd_error' ).html( 'Please enter at least 6 characters.' );
            // }
            // if( $( '#passwd_error' ).html() == 'Please enter at least 6 characters.' ) {
            //     if( $( '#passwd' ).val().length >= 6 ) {
            //         $( '#passwd_error' ).html( '' );
            //         $( '#passwd_label' ).removeAttr( 'style' );
            //         flag = 1;
            //     }
            // }
        } );
        $( '#con_passwd' ).keydown( function ( e ) {
            if(e.keyCode == 8){
                $( '#reset_status' ).html('');
                // console.log("enter");
                    if( $('#con_passwd').val().length <= 6 && $('#con_passwd').val().length > 0 ) {
                        // console.log($( '#con_passwd' ).val().length);
                        flag = false;
                        $( '#con_passwd_error' ).html( 'Please enter at least 6 characters.' );
                    }
                    if( $('#con_passwd').val().length == 1 ){
                        // console.log($( '#con_passwd' ).val().length);
                        $( '#con_passwd_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    $( '#reset_status' ).html('');
                    if( $('#con_passwd').val().length <= 6 && $('#con_passwd').val().length > 0 ) {
                    flag = false;
                    $( '#con_passwd_error' ).html( 'Please enter at least 6 characters.' );
                }
                if( $('#con_passwd').val().length >= 5) {
                    // console.log("check");
                        $( '#con_passwd_error' ).html('');
                        $( '#con_passwd_label' ).removeAttr('style');
                        flag = 2;
                }
            }
            // if( $( '#con_passwd_error' ).html() == 'This field is required.' ) {
            //     $( '#con_passwd_error' ).html( 'Please enter at least 6 characters.' );
            // }
            // if( $( '#con_passwd_error' ).html() == 'Please enter at least 6 characters.' ) {
            //     if( $( '#con_passwd' ).val().length >= 6 ) {
            //         $( '#con_passwd_error' ).html( '' );
            //         $( '#con_passwd_label' ).removeAttr( 'style' );
            //         flag = 2;
            //     }
            // }
        } );
        if( flag == 1 && flag == 2 ) {
            flag = true;
        }
        if( $( '#con_passwd_error' ).html() && $( '#passwd_error' ).html() == '' ) {
            flag = true;
        }
        if( $( '#passwd' ).val() == '' && $('#con_passwd').val() == '' ) {
            $( '#passwd_error' ).html( 'This field is required.' );
            $( '#con_passwd_error' ).html( 'This field is required.' );
            $( '#passwd_label' ).css( 'color', 'red' );
            $( '#con_passwd_label' ).css( 'color', 'red' );
        } else {
            if( $( '#passwd' ).val() == '' && $( '#con_passwd' ).val() != '' ) {
                flag = false;
                $( '#passwd_error' ).html( 'This field is required.' );
                $( '#passwd_label' ).css( 'color', 'red' );
                if( $( '#con_passwd' ).val().length < 6 ) {
                    $( '#con_passwd_error' ).html( 'Please enter at least 6 characters.' );
                    $( '#con_passwd_label' ).css( 'color', 'red' );
                }
            } else if( $( '#passwd' ).val() != '' && $( '#con_passwd' ).val() == '' ) {
                flag = false;
                $( '#con_passwd_error' ).html( 'This field is required.' );
                $( '#con_passwd_label' ).css( 'color', 'red' );
                if( $( '#passwd' ).val().length < 6 ) {
                    $( '#passwd_error' ).html( 'Please enter at least 6 characters.' );
                    $( '#passwd_label' ).css( 'color', 'red' );
                }
            } else {
                flag = true;
            }
            // console.log($scope.password);
            // console.log($scope.confirm_passwd);
            if( password == confirm_passwd ) {
                // console.log("password"+$scope.password );
                // console.log("confirm_passwd"+$scope.confirm_passwd );
                if ( flag == true ) {
                    var user_phone = localStorage.getItem( 'UserPhone_FG' );
                    var getResetData = {};
                    getResetData[ 'password' ] = password;
                    getResetData[ 'confirmpassword' ] = confirm_passwd;
                    getResetData[ 'phonenumber' ] = user_phone;
                    getResetData[ 'responsetype' ] = 'json';
                    //console.log(JSON.stringify(getResetData));
                    $( '.phpdebugbar-openhandler-overlay' ).show();
                    $( '.ui-loader' ).show();
                    var responsePromise = $http.post( BASE_URL+"resetpassword",JSON.stringify( getResetData ) );
                    responsePromise.success( function( data, status, headers, config ) {
                       // console.log(JSON.stringify(data));
                        $( '.phpdebugbar-openhandler-overlay' ).hide();
                        $( '.ui-loader' ).hide();
                        if( data.status == 'success' ) {
                            //$rootScope.$broadcast("forgotStatus", data.message);
                            window.plugins.nativepagetransitions.slide( {
                                "href" : "#/home/login"
                            } );
                        } else {
                            $( '.phpdebugbar-openhandler-overlay' ).hide();
                            $( '.ui-loader' ).hide();
                            $( '#reset_status' ).html( data.message );
                        }
                    } );
                    responsePromise.error( function ( data, status, headers, config ) {
                        $( '.phpdebugbar-openhandler-overlay' ).hide();
                        $( '.ui-loader' ).hide();
                        if( navigator.connection.type == Connection.NONE ) {
                            checkConnection();
                        }
                        console.log( JSON.stringify( data ) );
                    } );
                }
            } else {
                flag = false;
                $( '#reset_status' ).html( 'password is not matched' );
            }
        }
    };
 } )

//+++++++++++++++++++++++++++Pin Confirm for register page controller+++++++++++++++++++++

mainApp.controller( "pinMatchController", function( $scope, $http, $timeout, $state) {
    var flag = false;
    var pinPattern = /^[0-9]+$/;
    var flagMenu = 0;
    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
    var height = $( window ).height();
    $( '.wrapper, #sidebar-wrapper' ).css( 'min-height', height );
        
    $scope.pinMatchAction = function ( $event ) {
        $('#pin_error').html( '' );
        $('#pinMatch_status').html( '' );
        var pin_number = $( '#inputEmail6' ).val();
        $( '#inputEmail6' ).keydown(function (e) {
            var withoutSpace = $('#inputEmail6').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if(e.keyCode == 8){
                $( '#pinMatch_status' ).html('');
                withoutSpaceLength = withoutSpaceLength-1;
                // console.log(withoutSpaceLength);
                    if( withoutSpaceLength <= 4 && withoutSpaceLength > 0 ) {
                        // console.log($( '#inputEmail6' ).val().length);
                        flag = false;
                        $( '#pin_error' ).html( 'Please enter at least 4 characters.' );
                        $( '#pin_label' ).css( 'color', 'red' );
                    }else if( withoutSpaceLength > 4){
                        // console.log(withoutSpaceLength);
                        flag = false;
                         $( '#pin_error' ).html( 'Please enter no more than 4 characters.' );
                         $( '#pin_label' ).css( 'color', 'red' );
                    }
                    if( withoutSpaceLength == 4) {
                        // console.log(withoutSpaceLength);
                        // console.log("check");
                            $( '#pin_error' ).html('');
                            $( '#pin_label' ).removeAttr('style');
                            flag = 1;
                    }
                    if( withoutSpaceLength <= 0 ){
                        // console.log($( '#inputEmail6' ).val().length);
                        $( '#pin_error' ).html( 'This field is required.' );
                        $( '#pin_label' ).css( 'color', 'red' );
                        flag = false;
                        } 
                }else{
                    $( '#pinMatch_status' ).html('');
                    // console.log(withoutSpaceLength);
                    if( withoutSpaceLength <= 3 && withoutSpaceLength > 0 ) {
                    flag = false;
                    $( '#pin_error' ).html( 'Please enter at least 4 characters.' );
                    $( '#pin_label' ).css( 'color', 'red' );
                }else if( withoutSpaceLength > 3){
                    // console.log(withoutSpaceLength);
                        flag = false;
                         $( '#pin_error' ).html( 'Please enter no more than 4 characters.' );
                         $( '#pin_label' ).css( 'color', 'red' );
                }
                if( withoutSpaceLength == 3) {
                    // console.log(withoutSpaceLength);
                    // console.log("check");
                        $( '#pin_error' ).html('');
                        $( '#pin_label' ).removeAttr('style');
                        flag = 1;
                }
            }
        } );
        
        if( $( '#pin_error' ).html() == '' ) {
            flag = true;
        }
        if( pin_number != '' ) {
            var withoutSpace = $( '#inputEmail6' ).val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( withoutSpaceLength < 4 ) {
                $( '#pinMatch_status' ).html('');
                flag = false;
                $( '#pin_label' ).css( 'color', 'red' );
                if( withoutSpaceLength == 0 ) {
                    $( '#pin_error' ).html( 'This field is required.' );
                } else {
                    $( '#pin_error' ).html( 'Please enter at least 4 characters.' );
                }
            }
            if( withoutSpaceLength > 4 ){
                $( '#pinMatch_status' ).html('');
                flag = false;
                $( '#pin_error' ).html( 'Please enter no more than 4 characters.' );
                $( '#pin_label' ).css( 'color', 'red' );
            }
            if( withoutSpaceLength == 4 ) {
                $( '#pin_error' ).html( '' );
                $( '#pin_label' ).removeAttr( 'style' );
                if( !$( '#inputEmail6' ).val().match( pinPattern ) ) {
                    $( '#pinMatch_status' ).html( 'The pin must be a number.' );
                    flag = false;
                } else{
                    flag = true;
                }
            }
            if( flag == true ) {
                var user_phone_stored = localStorage.getItem( 'regUserPhone' );
                localStorage.setItem( "regUserPin", $scope.pinNumber );
                var getPinData = {};
                getPinData[ 'pin' ] = $scope.pinNumber;
                getPinData[ 'responsetype' ] = 'json';
                getPinData[ 'phonenumber' ] = user_phone_stored;
                // console.log( JSON.stringify( getPinData ) );
                $( '.phpdebugbar-openhandler-overlay' ).show();
                $( '.ui-loader' ).show();
                var responsePromise = $http.post( BASE_URL+"verifypin", JSON.stringify( getPinData ) );
                responsePromise.success( function( data, status, headers, config ) {
                    // console.log( JSON.stringify( data ) );
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( data.status == 'success' ) {
                        localStorage.setItem( "user_userid", data.userid );
                        window.plugins.nativepagetransitions.slide( {
                            "href" : "#/home/register_step2"
                        } );
                    } else {
                        $( '#pinMatch_status' ).html( data.message );
                    }
                } );
                responsePromise.error( function ( data, status, headers, config ) {
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( navigator.connection.type == Connection.NONE ) {
                        checkConnection();
                    }
                    console.log( JSON.stringify( data ) );
                } );
            }
        } else {
            $( '#pin_error' ).html( 'This field is required.' );
            $( '#pin_label' ).css( 'color', 'red' );
        }
    };
} )

//+++++++++++++++++++++++++++Pin Confirm for Forgot page controller+++++++++++++++++++++

mainApp.controller( "pinMatchFGController", function( $scope, $http, $timeout, $state, $rootScope ) {
    var flag = false;
    var pinPattern = /^[0-9]+$/;
    $scope.pinMatchFGAction = function ( $event ) {
        $( '#pinFG_error' ).html( '' );
        $( '#pin_send_status' ).remove();
        $( '#pinMatchFG_status' ).html( '' );
        var pin_number = $( '#inputEmail7' ).val();
        var getPinData = {};
        $( '#inputEmail7' ).keydown(function (e) {
            var withoutSpace = $('#inputEmail7').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if(e.keyCode == 8){
                $( '#pinMatchFG_status' ).html('');
                withoutSpaceLength = withoutSpaceLength-1;
                // console.log(withoutSpaceLength);
                    if( withoutSpaceLength <= 4 && withoutSpaceLength > 0 ) {
                        // console.log($( '#inputEmail7' ).val().length);
                        flag = false;
                        $( '#pinFG_error' ).html( 'Please enter at least 4 characters.' );
                        $( '#pinnumber_label' ).css( 'color', 'red' );
                    }else if( withoutSpaceLength > 4){
                        // console.log(withoutSpaceLength);
                        flag = false;
                         $( '#pinFG_error' ).html( 'Please enter no more than 4 characters.' );
                         $( '#pinnumber_label' ).css( 'color', 'red' );
                    }
                    if( withoutSpaceLength == 4) {
                        // console.log(withoutSpaceLength);
                        // console.log("check");
                            $( '#pinFG_error' ).html('');
                            $( '#pinnumber_label' ).removeAttr('style');
                            flag = 1;
                    }
                    if( withoutSpaceLength <= 0 ){
                        // console.log($( '#inputEmail7' ).val().length);
                        $( '#pinFG_error' ).html( 'This field is required.' );
                        $( '#pinnumber_label' ).css( 'color', 'red' );
                        flag = false;
                        } 
                }else{
                    $( '#pinMatchFG_status' ).html('');
                    // console.log(withoutSpaceLength);
                    if( withoutSpaceLength <= 3 && withoutSpaceLength > 0 ) {
                    flag = false;
                    $( '#pinFG_error' ).html( 'Please enter at least 4 characters.' );
                    $( '#pinnumber_label' ).css( 'color', 'red' );
                }else if( withoutSpaceLength > 3){
                    // console.log(withoutSpaceLength);
                        flag = false;
                         $( '#pinFG_error' ).html( 'Please enter no more than 4 characters.' );
                         $( '#pinnumber_label' ).css( 'color', 'red' );
                }
                if( withoutSpaceLength == 3) {
                    // console.log(withoutSpaceLength);
                    // console.log("check");
                        $( '#pinFG_error' ).html('');
                        $( '#pinnumber_label' ).removeAttr('style');
                        flag = 1;
                }
            }
        } );
        // $( '#inputEmail7' ).keyup( function (e) {
        //     var withoutSpace = $( '#inputEmail7' ).val().replace(/ /g,"");
        //     var withoutSpaceLength = withoutSpace.length;
        //     if( $( '#pinFG_error' ).html() == 'This field is required.' ) {
        //         $( '#pinFG_error' ).html( 'Please enter at least 4 characters.' );
        //     }
        //     if( withoutSpaceLength < 4 ) {
        //         flag = false;
        //         $('#pinFG_error').html( 'Please enter at least 4 characters.' );
        //         $('#pinnumber_label').css( 'color', 'red' );
        //         $( '#pinMatchFG_status' ).html( '' );
        //     }
        //     if( withoutSpaceLength > 4 ) {
        //         flag = false;
        //         $( '#pinFG_error' ).html( 'Please enter no more than 4 characters.');
        //         $( '#pinnumber_label' ).css( 'color', 'red' );
        //         $( '#pinMatchFG_status' ).html( '' );
        //     }
        //     if( withoutSpaceLength == 4 ) {
        //         $( '#pinFG_error' ).html( '' );
        //         $( '#pinnumber_label' ).removeAttr( 'style' );
        //         if( !$('#inputEmail7').val().match( pinPattern ) ) {
        //             flag = false;
        //         } else {
        //             flag = true;
        //         }
        //     }
        //     if( $( '#inputEmail7' ).val().indexOf(' ') >= 0 ) {
        //         if( withoutSpaceLength == 0 ) {
        //             $( '#pinFG_error' ).html( 'This field is required.' );
        //             $( '#pinnumber_label' ).css( 'color', 'red' );
        //         } else if( withoutSpaceLength < 4 ) {
        //             $( '#pinFG_error' ).html( 'Please enter at least 4 characters.' );
        //             $('#pinnumber_label').css( 'color', 'red' );
        //         } else if( withoutSpaceLength > 4 ) {
        //             $( '#pinFG_error' ).html( 'Please enter no more than 4 characters.' );
        //             $( '#pinnumber_label' ).css( 'color', 'red' );
        //         }

        //     }
        // } );
        if( $( '#pinFG_error' ).html() == '') {
            flag = true;
        }
        if( pin_number != '' ) {
            var withoutSpace = $( '#inputEmail7' ).val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( $( '#inputEmail7' ).val().indexOf(' ') >= 0 ) {
                $( '#pinnumber_label' ).css( 'color', 'red' );
                if( withoutSpaceLength == 0 ) {
                    $( '#pinFG_error' ).html( 'This field is required.' );
                }
            }
            if( withoutSpaceLength > 4 ){
                $( '#pinMatchFG_status' ).html( '' );
                flag = false;
                $( '#pinFG_error' ).html( 'Please enter no more than 4 characters.' );
                $( '#pinnumber_label' ).css( 'color', 'red' );
            }
            if( withoutSpaceLength == 4 ) {
                $( '#pinFG_error' ).html( '' );
                $( '#pinnumber_label' ).removeAttr( 'style' );
                if( !$('#inputEmail7').val().match( pinPattern ) ) {
                    $( '#pinMatchFG_status' ).html( 'The pin must be a number.' );
                    flag = false;
                } else {
                    flag = true;
                }
            }
            if( withoutSpaceLength < 4 ) {
                $( '#pinMatchFG_status' ).html('');
                flag = false;
                $( '#pinFG_error' ).html( 'Please enter at least 4 characters.' );
                $( '#pinnumber_label' ).css( 'color', 'red' );
            }

            if( flag == true ) {
                var user_phone_stored = localStorage.getItem( 'UserPhone_FG' );
                localStorage.setItem( "regUserPin", $scope.pinNumber );
                getPinData[ 'pin' ] = $scope.pinNumber;
                getPinData[ 'responsetype' ] = 'json';
                getPinData[ 'phonenumber' ] = user_phone_stored;
                $( '.phpdebugbar-openhandler-overlay' ).show();
                $( '.ui-loader' ).show();
                // console.log(JSON.stringify( getPinData ) );
                var responsePromise = $http.post( BASE_URL+"verifypin",JSON.stringify( getPinData ) );
                responsePromise.success( function( data, status, headers, config ) {
                    // console.log(JSON.stringify( data ) );
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( data.status == 'success' ) {
                        window.plugins.nativepagetransitions.slide( {
                            "href" : "#/home/forgotpasswordnext"
                        } );
                    } else {
                        $( '#pinMatchFG_status' ).html( data.message );
                    }
                } );
                responsePromise.error( function ( data, status, headers, config ) {
                    $( '.phpdebugbar-openhandler-overlay' ).hide();
                    $( '.ui-loader' ).hide();
                    if( navigator.connection.type == Connection.NONE ) {
                        checkConnection();
                    }
                    console.log( JSON.stringify( data ) );
                } );
            }
        } else {
            $( '#pinFG_error' ).html( 'This field is required.' );
            $( '#pinnumber_label' ).css( 'color', 'red' );
        }
    };
} )

//+++++++++++++++++++++++++++Registration step2 page controller+++++++++++++++++++++

mainApp.controller( "regStepTwoController", function( $scope, $http, $timeout, $state ) {
    $( '#register2Status' ).html( '' );
    var flag = false;
    var count = 0;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
    var flagMenu = 0;
    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
    var height = $( window ).height();
    $( '.wrapper, #sidebar-wrapper' ).css( 'min-height', height );
    $scope.registerSubmit = function( $event ) {
        var withoutSpace = $( '#regPassword7' ).val().replace(/ /g,"");
        var withoutSpaceLength = withoutSpace.length;
        var user_phone_stored = localStorage.getItem( 'regUserPhone' );
        var new_val = "";
        var regFormDiv = document.getElementById( 'register_form2' );
        var input_id = '';
        var elementsLength = parseInt( regFormDiv.getElementsByTagName( 'input' ).length );
        // $( '#gender_error' ).html( '' );
        // $( '#gender_label' ).removeAttr( 'style' );
        if( $scope.agreement == true ) {
            $( '#agreement' ).val(1);
        }
        for ( var i=0; i<elementsLength; i++ ) {
            input_id = regFormDiv.getElementsByTagName( 'input' )[i].id;
            new_val = regFormDiv.getElementsByTagName( 'input' )[i].value;
            $( "label[for='"+input_id+"']" ).removeAttr( 'style' );
            $( '#terms_error' ).html( '' );
            $( '#terms_label' ).removeAttr( 'style' );
            document.getElementsByTagName( "span" )[i].innerHTML = '';
            if( new_val == '' ) {
                document.getElementsByTagName( "span" )[i].innerHTML = 'This field is required.';
                $( "label[for='"+input_id+"']" ).css( 'color', 'red' );
            }

            if( i == elementsLength-1 ){
                if( $( '#agreement' ).val() == 0 || $scope.agreement == false ) {
                    $( '#terms_error' ).html( 'This field is required.' );
                    $( '#terms_label' ).css( 'color', 'red' );
                }
            }
        }

        // if( $( '#regGender7' ).val() == '' ) {
        //     $( '#gender_error' ).html( 'This field is required.' );
        //     $( '#gender_label' ).css( 'color', 'red' );
        // }
        $( '#username_input' ).keydown( function (e) {
            if(e.keyCode == 8){
                // console.log("enter");
                    if( $( '#username_input' ).val().length <= 5 && $( '#username_input' ).val().length > 0 ) {
                        // console.log($( '#username_input' ).val().length);
                        flag = false;
                        $( '#username_error' ).html( 'Please enter at least 5 characters.' );
                    }
                    if( $( '#username_input' ).val().length == 1 ){
                        // console.log($( '#username_input' ).val().length);
                        $( '#username_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    if( $( '#username_input' ).val().length <= 5 && $( '#username_input' ).val().length > 0 ) {
                    flag = false;
                    $( '#username_error' ).html( 'Please enter at least 5 characters.' );
                }
                if( $( '#username_input' ).val().length > 24 ) {
                        flag = false;
                        $( '#username_error' ).html( 'Please enter no more than 25 characters.' );
                } 
                if( $( '#username_input' ).val().length >= 4 ) {
                    // console.log("check");
                        $( '#username_error' ).html('');
                        $( '#username_label' ).removeAttr('style');
                        flag = 1;
                }
                if( ( $('#username_input').val().indexOf(' ') >= 0 ) || ( /^[a-zA-Z0-9- ]*$/.test( $( '#username_input' ).val() ) == false ) ) {
                    $( '#username_error' ).html( 'The username may only contain letters and numbers.' );
                    $( '#username_label' ).css( 'color', 'red' );
                } 
            }
        
    } );

        // $( '#email_input' ).keydown( function (e) {
        //     if(e.keyCode == 8){
        //         // console.log("enter");
        //             if( $( '#email_input' ).val().length == 1 ){
        //                 // console.log($( '#email_input' ).val().length);
        //                 $( '#email_error' ).html( 'This field is required.' );
        //                 flag = false;
        //                 } 
        //         if( $('#email_input').val().match( mailformat ) ) {
        //             $( '#email_error' ).html( '' );
        //             $( '#email_label' ).removeAttr( 'style' );
        //         }else{
        //             if( $( '#email_input' ).val().length == 1 || $( '#email_input' ).val().length == 0){
        //                 // console.log($( '#email_input' ).val().length);
        //                 $( '#email_error' ).html( 'This field is required.' );
        //                 flag = false;
        //                 } else{
        //                   $( '#email_error' ).html( 'Please enter a valid email address.');  
        //               }
        //         }
        //     }else{
        //          if( $('#email_input').val().match( mailformat ) ) {
        //             $( '#email_error' ).html( '' );
        //             $( '#email_label' ).removeAttr( 'style' );
        //         }else{
        //             $( '#email_error' ).html( 'Please enter a valid email address.');
        //         }
        //     }
        //     // if( $( '#email_error' ).html() == 'This field is required.' ) {
        //     //     $( '#email_error' ).html('Please enter a valid email address.' );
        //     // }
        //     // if( $( '#email_error' ).html() == 'Please enter a valid email address.' ) {
        //     //     if( $('#email_input').val().match( mailformat ) ) {
        //     //         $( '#email_error' ).html( '' );
        //     //         $( '#email_label' ).removeAttr( 'style' );
        //     //     }
        //     // }
        // } );

        $( '#regPassword7' ).keydown( function (e) {
            var withoutSpace = $( '#regPassword7' ).val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if(e.keyCode == 8){
                // console.log("enter");
                    if( withoutSpaceLength <= 6 && withoutSpaceLength > 0 ) {
                        // console.log($( '#regPassword7' ).val().length);
                        flag = false;
                        $( '#password2_error' ).html( 'Please enter at least 6 characters.' );
                    }else if( withoutSpaceLength >=15){
                        flag = false;
                         $( '#password2_error' ).html( 'Please enter no more than 15 characters.' );
                    }
                    if( withoutSpaceLength == 1 ){
                        $( '#password2_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    if( withoutSpaceLength <= 6 && withoutSpaceLength > 0 ) {
                    flag = false;
                    $( '#password2_error' ).html( 'Please enter at least 6 characters.' );
                }else if( withoutSpaceLength >=15){
                        flag = false;
                         $( '#password2_error' ).html( 'Please enter no more than 15 characters.' );
                }
                if( withoutSpaceLength >= 5 && withoutSpaceLength < 15) {
                    // console.log("check");
                        $( '#password2_error' ).html('');
                        $( '#password2_label' ).removeAttr('style');
                        flag = 1;
                }
            }

        } );

        // $( '#regGender7' ).change( function() {
        //     // if ($( '#regGender7' ).val() == 'M') {
        //     //     console.log("m>>>", $( '#regGender7' ).val());
        //     //     $('#regGender7').css ( {"padding-left":"110px" });
        //     // }
        //     if( $( '#regGender7' ).val() == 'M' || $( '#regGender7' ).val() =='F' ) {
        //         $( '#gender_error' ).html( '' );
        //         $( '#gender_label' ).removeAttr( 'style' );
        //     } else {
        //         $( '#gender_error' ).html( 'This field is required.' );
        //         $( '#gender_label' ).css( 'color', 'red' );
        //     }
        // } );

        if( $( '#username_input' ).val() != '' && $( '#username_input' ).val().length < 5 ) {
            $( '#username_error' ).html( 'Please enter at least 5 characters.' );
            $( '#username_label' ).css( 'color', 'red' );
        }

        if( $( '#username_input' ).val() != '' && $( '#username_input' ).val().length > 25 ) {
            $( '#username_error' ).html( 'Please enter no more than 25 characters.' );
            $( '#username_label' ).css( 'color', 'red' );
        }

        // if( ( $( '#email_input' ).val() != '' ) && !( $( '#email_input' ).val().match( mailformat ) ) ){
        //     $( '#email_error' ).html( 'Please enter a valid email address.' );
        //     $( '#email_label' ).css( 'color', 'red' );
        // }

        if( $( '#regPassword7' ).val() != '' && withoutSpaceLength < 6 ) {
            $( '#password2_error' ).html( 'Please enter at least 6 characters.' );
            $( '#password2_label' ).css( 'color', 'red' );
        }

        if( $('#regPassword7').val() != '' && withoutSpaceLength > 15 ) {
            $( '#password2_error' ).html( 'Please enter no more than 15 characters.' );
            $( '#password2_label' ).css( 'color', 'red' );
        }
        if( ( $('#username_input').val().indexOf(' ') >= 0 ) || ( /^[a-zA-Z0-9- ]*$/.test( $( '#username_input' ).val() ) == false ) ) {
            $( '#username_error' ).html( 'The username may only contain letters and numbers.' );
            $( '#username_label' ).css( 'color', 'red' );
        }
        if( $( '#regPassword7' ).val().indexOf(' ') >= 0 ) {
            var withoutSpace = $( '#regPassword7' ).val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( withoutSpaceLength == 0 ) {
                $( '#password2_label' ).css( 'color', 'red' );
                $( '#password2_error' ).html( 'This field is required.' );
            } else if( withoutSpaceLength > 15 ) {
                $( '#password2_label' ).css( 'color', 'red' );
                $( '#password2_error' ).html( 'Please enter no more than 15 characters.' );
            } else if( withoutSpaceLength < 6 ) {
                $( '#password2_label' ).css( 'color', 'red' );
                $( '#password2_error' ).html( 'Please enter at least 6 characters.' );
            }

        }
        if ( $( '#username_error' ).html() == '' && $( '#password2_error' ).html() == '' && $( '#terms_error' ).html() == '' ) {
            flag = true;
        }
        var getregStepTwoData = {};
        getregStepTwoData[ 'username' ] = $scope.register_username;
        getregStepTwoData[ 'email' ] = '';
        getregStepTwoData[ 'password' ] = $scope.register_password;
        getregStepTwoData[ 'gender' ] = 'Male';
        getregStepTwoData[ 'register_optout' ] = $scope.agreement;
        getregStepTwoData[ 'phonenumber' ] = user_phone_stored;
        getregStepTwoData[ 'responsetype' ] = 'json';
        // console.log( JSON.stringify( getregStepTwoData ) );
        if ( flag == true ) {
            $( '.phpdebugbar-openhandler-overlay' ).show();
            $( '.ui-loader' ).show();
            var responsePromise = $http.post( BASE_URL+"registernext",JSON.stringify( getregStepTwoData ) );
            responsePromise.success( function( data, status, headers, config ) {
                // console.log( JSON.stringify( data ) );
                localStorage.setItem( "rememberme_flag", true );
                $( '.phpdebugbar-openhandler-overlay' ).hide();
                $( '.ui-loader' ).hide();
                if( data.status == 'success' ) {
                    localStorage.setItem( "userDetail", JSON.stringify( data ) );
                    window.plugins.nativepagetransitions.slide( {
                        "href" : "#/home/affter_login"
                    } );
                } else {
                    $( '#register2Status' ).html( data.message );
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                $( '.phpdebugbar-openhandler-overlay' ).hide();
                $( '.ui-loader' ).hide();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
                console.log( JSON.stringify( data ) );
            } );
        }
    };

    // === Nanda ===

    $scope.termsService = function()
    {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : '#/home/terms'
        });
    }
    $scope.privacy_Policy = function()
    {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : '#/home/privacypolicy'
        });
    }
} )

//+++++++++++++++++++++++++++Pin sent Text page controller+++++++++++++++++++++

mainApp.controller( "pinSentController", function( $scope, $http, $timeout, $state ) {
    var flagMenu = 0;
    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
    var height = $( window ).height();
    $( '.wrapper, #sidebar-wrapper' ).css( 'min-height', height );
} )